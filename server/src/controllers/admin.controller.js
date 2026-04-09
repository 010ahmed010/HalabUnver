const User = require('../models/User')
const Order = require('../models/Order')
const Transaction = require('../models/Transaction')
const ServiceContract = require('../models/ServiceContract')
const AdCampaign = require('../models/AdCampaign')
const ActivityLog = require('../models/ActivityLog')
const Course = require('../models/Course')
const LibraryDocument = require('../models/LibraryDocument')
const Product = require('../models/Product')
const { sendNotification } = require('../utils/sendNotification')
const logActivity = require('../utils/logActivity')

exports.getStats = async (req, res, next) => {
  try {
    const [
      totalUsers, activeStudents, activeBusinesses,
      pendingVerifications, pendingBusinessApprovals,
      totalOrders, pendingTransactions,
      totalCourses, totalDocuments,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ accountType: 'student', status: 'active' }),
      User.countDocuments({ accountType: 'business', status: 'active' }),
      User.countDocuments({ accountType: 'student', verificationStatus: 'pending' }),
      User.countDocuments({ accountType: 'business', status: 'pending' }),
      Order.countDocuments(),
      Transaction.countDocuments({ status: 'pending' }),
      Course.countDocuments({ isVisible: true }),
      LibraryDocument.countDocuments({ isVisible: true }),
    ])

    res.json({
      success: true,
      data: {
        totalUsers,
        activeStudents,
        activeBusinesses,
        pendingVerifications,
        pendingBusinessApprovals,
        totalOrders,
        pendingTransactions,
        totalCourses,
        totalDocuments,
      },
    })
  } catch (err) { next(err) }
}

exports.getActivityLog = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query
    const logs = await ActivityLog.find()
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('adminId', 'name')
    const total = await ActivityLog.countDocuments()
    res.json({ success: true, total, data: logs })
  } catch (err) { next(err) }
}

exports.getRevenueStats = async (req, res, next) => {
  try {
    const [storeRevenue, freelanceSubRevenue, adRevenue, escrowTotal, pendingEscrow] = await Promise.all([
      Transaction.aggregate([
        { $match: { type: 'store_order', status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Transaction.aggregate([
        { $match: { type: 'freelance_subscription', status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      AdCampaign.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, campaigns: { $sum: 1 } } },
      ]),
      ServiceContract.aggregate([
        { $match: { status: { $in: ['in_escrow', 'in_progress', 'under_review'] } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      ServiceContract.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ])

    res.json({
      success: true,
      data: {
        storeRevenue: storeRevenue[0]?.total || 0,
        freelanceSubRevenue: freelanceSubRevenue[0]?.total || 0,
        activeAdCampaigns: adRevenue[0]?.campaigns || 0,
        escrowHolding: escrowTotal[0]?.total || 0,
        escrowReleased: pendingEscrow[0]?.total || 0,
      },
    })
  } catch (err) { next(err) }
}

exports.updateBusinessPermissions = async (req, res, next) => {
  try {
    const { canSellProducts, canRunAds, canOfferFreelance, canUploadCourses, canUploadLibraryDocs } = req.body
    const user = await User.findById(req.params.id)
    if (!user || user.accountType !== 'business') {
      return res.status(404).json({ success: false, message: 'حساب أعمال غير موجود.' })
    }

    const perms = {}
    if (canSellProducts !== undefined) perms['businessPermissions.canSellProducts'] = canSellProducts
    if (canRunAds !== undefined) perms['businessPermissions.canRunAds'] = canRunAds
    if (canOfferFreelance !== undefined) perms['businessPermissions.canOfferFreelance'] = canOfferFreelance
    if (canUploadCourses !== undefined) perms['businessPermissions.canUploadCourses'] = canUploadCourses
    if (canUploadLibraryDocs !== undefined) perms['businessPermissions.canUploadLibraryDocs'] = canUploadLibraryDocs

    const updated = await User.findByIdAndUpdate(req.params.id, { $set: perms }, { new: true }).select('-password')

    await sendNotification({
      recipientId: user._id,
      senderType: 'admin',
      category: 'general',
      title: 'تم تحديث صلاحيات حسابك',
      body: 'قام المشرف بتحديث الخدمات المتاحة لحسابك. راجع لوحة التحكم لمعرفة التفاصيل.',
    })

    await logActivity({
      adminId: req.user._id,
      action: 'updated business permissions',
      targetType: 'user',
      targetId: user._id,
      targetName: user.name,
      metadata: perms,
    })

    res.json({ success: true, data: updated })
  } catch (err) { next(err) }
}

exports.approveBusiness = async (req, res, next) => {
  try {
    const { approved, reason } = req.body
    const user = await User.findById(req.params.id)
    if (!user || user.accountType !== 'business') {
      return res.status(404).json({ success: false, message: 'حساب أعمال غير موجود.' })
    }

    user.status = approved ? 'active' : 'rejected'
    await user.save()

    await sendNotification({
      recipientId: user._id,
      senderType: 'admin',
      category: 'general',
      title: approved ? 'تم تفعيل حسابك ✅' : 'تم رفض حسابك ❌',
      body: approved
        ? 'تهانينا! تم قبول حسابك التجاري. يمكنك الآن الوصول إلى لوحة التحكم وانتظار تفعيل الخدمات.'
        : (reason || 'تم رفض طلبك. تواصل مع الإدارة لمعرفة السبب.'),
    })

    await logActivity({
      adminId: req.user._id,
      action: approved ? 'approved business account' : 'rejected business account',
      targetType: 'user',
      targetId: user._id,
      targetName: user.name,
    })

    res.json({ success: true, data: user.toPublicJSON() })
  } catch (err) { next(err) }
}

exports.getPendingBusinesses = async (req, res, next) => {
  try {
    const users = await User.find({ accountType: 'business', status: 'pending' })
      .sort('-createdAt')
      .select('-password')
    res.json({ success: true, total: users.length, data: users })
  } catch (err) { next(err) }
}

exports.getPendingProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ approvalStatus: 'pending' })
      .sort('-createdAt')
      .populate('vendorId', 'name email')
    res.json({ success: true, total: products.length, data: products })
  } catch (err) { next(err) }
}

exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status) filter.status = status

    const total = await Order.countDocuments(filter)
    const orders = await Order.find(filter)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('customerId', 'name email')
      .populate('productId', 'name price')
      .populate('vendorId', 'name')

    res.json({ success: true, total, page: Number(page), data: orders })
  } catch (err) { next(err) }
}
