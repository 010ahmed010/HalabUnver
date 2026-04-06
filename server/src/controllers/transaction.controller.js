const Transaction = require('../models/Transaction')
const User = require('../models/User')
const Order = require('../models/Order')
const FreelancerProfile = require('../models/FreelancerProfile')
const ServiceContract = require('../models/ServiceContract')
const { sendNotification } = require('../utils/sendNotification')
const logActivity = require('../utils/logActivity')

exports.submitTransaction = async (req, res, next) => {
  try {
    const { type, purpose, amount, currency, txId, receiptPhoto, linkedOrderId, linkedContractId } = req.body
    const tx = await Transaction.create({
      userId: req.user._id,
      type, purpose, amount, currency, txId, receiptPhoto, linkedOrderId, linkedContractId,
    })

    if (linkedOrderId) {
      await Order.findByIdAndUpdate(linkedOrderId, { status: 'receipt_uploaded', transactionId: tx._id })
    }

    res.status(201).json({ success: true, data: tx })
  } catch (err) { next(err) }
}

exports.getTransactions = async (req, res, next) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query
    const filter = {}

    if (req.user.accountType !== 'admin') {
      filter.userId = req.user._id
    } else {
      if (status) filter.status = status
      if (type) filter.type = type
    }

    if (req.user.accountType !== 'admin' && status) filter.status = status

    const total = await Transaction.countDocuments(filter)
    const txs = await Transaction.find(filter)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('userId', 'name email')
      .populate('linkedOrderId', 'orderId')
      .populate('linkedContractId', 'title')

    res.json({ success: true, total, data: txs })
  } catch (err) { next(err) }
}

exports.confirmTransaction = async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id)
    if (!tx) return res.status(404).json({ success: false, message: 'المعاملة غير موجودة.' })
    if (tx.status !== 'pending') return res.status(400).json({ success: false, message: 'تم معالجة هذه المعاملة مسبقاً.' })

    tx.status = 'confirmed'
    tx.confirmedAt = new Date()
    tx.confirmedBy = req.user._id
    await tx.save()

    if (tx.type === 'store_order' && tx.linkedOrderId) {
      await Order.findByIdAndUpdate(tx.linkedOrderId, { status: 'paid' })
      await sendNotification({
        recipientId: tx.userId, senderType: 'store', category: 'financial',
        title: 'تم تأكيد دفعتك ✅',
        body: 'تم التحقق من إيصال الدفع. طلبك قيد التجهيز.',
        actionUrl: '/dashboard/orders',
      })
    }

    if (tx.type === 'freelance_subscription') {
      const expiryDate = new Date()
      expiryDate.setMonth(expiryDate.getMonth() + 1)
      await FreelancerProfile.findOneAndUpdate({ userId: tx.userId }, {
        subscriptionStatus: 'active',
        subscriptionExpiry: expiryDate,
      })
      await User.findByIdAndUpdate(tx.userId, { isFreelancer: true })
      await sendNotification({
        recipientId: tx.userId, senderType: 'admin', category: 'financial',
        title: 'مرحباً بك في سوق المستقلين! 🎉',
        body: 'تم تفعيل اشتراكك كمستقل بنجاح. يمكنك الآن نشر خدماتك والمشاركة في السوق.',
      })
    }

    if (tx.type === 'freelance_escrow' && tx.linkedContractId) {
      await ServiceContract.findByIdAndUpdate(tx.linkedContractId, {
        status: 'in_escrow',
        escrowTransactionId: tx._id,
      })
    }

    await logActivity({ adminId: req.user._id, action: `confirmed transaction (${tx.type})`, targetType: 'transaction', targetId: tx._id, targetName: tx.txId })
    res.json({ success: true, data: tx })
  } catch (err) { next(err) }
}

exports.rejectTransaction = async (req, res, next) => {
  try {
    const { reason } = req.body
    const tx = await Transaction.findByIdAndUpdate(req.params.id, {
      status: 'rejected', rejectionReason: reason,
    }, { new: true })
    if (!tx) return res.status(404).json({ success: false, message: 'المعاملة غير موجودة.' })

    await sendNotification({
      recipientId: tx.userId, senderType: 'admin', category: 'financial',
      title: 'خطأ في إيصال الدفع ❌',
      body: reason || 'تم إبلاغك بوجود مشكلة في إيصال الدفع. يرجى إعادة المحاولة.',
    })

    await logActivity({ adminId: req.user._id, action: `rejected transaction`, targetType: 'transaction', targetId: tx._id, targetName: tx.txId })
    res.json({ success: true, data: tx })
  } catch (err) { next(err) }
}
