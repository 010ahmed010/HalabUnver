const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User')
const { sendNotification } = require('../utils/sendNotification')
const { awardXP } = require('../utils/xp')
const logActivity = require('../utils/logActivity')

exports.getProducts = async (req, res, next) => {
  try {
    const { category, source, search, minPrice, maxPrice, sort = '-createdAt', page = 1, limit = 12, own } = req.query
    let filter = {}
    if (own === 'true' && req.user) {
      filter.vendorId = req.user._id
    } else {
      filter.isVisible = true
      filter.approvalStatus = 'approved'
      if (category) filter.category = category
      if (source) filter.source = source
      if (minPrice || maxPrice) filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
      if (search) filter.$text = { $search: search }
    }

    const total = await Product.countDocuments(filter)
    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('vendorId', 'name')

    res.json({ success: true, total, page: Number(page), data: products })
  } catch (err) { next(err) }
}

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendorId', 'name')
    if (!product) return res.status(404).json({ success: false, message: 'المنتج غير موجود.' })
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isVisible: true,
      approvalStatus: 'approved',
    }).limit(4)
    res.json({ success: true, data: { product, related } })
  } catch (err) { next(err) }
}

exports.createProduct = async (req, res, next) => {
  try {
    const isAdmin = req.user.accountType === 'admin'
    const isVendor = req.user.businessType === 'vendor'
    if (!isAdmin && !isVendor) return res.status(403).json({ success: false, message: 'غير مسموح.' })

    const productData = { ...req.body }
    if (isVendor) {
      productData.source = 'vendor'
      productData.vendorId = req.user._id
      productData.approvalStatus = 'pending'
      productData.isVisible = false
    }

    const product = await Product.create(productData)
    if (isAdmin) await logActivity({ adminId: req.user._id, action: 'created product', targetType: 'product', targetId: product._id, targetName: product.name })
    res.status(201).json({ success: true, data: product })
  } catch (err) { next(err) }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: 'المنتج غير موجود.' })

    const isAdmin = req.user.accountType === 'admin'
    const isOwner = product.vendorId && product.vendorId.equals(req.user._id)
    if (!isAdmin && !isOwner) return res.status(403).json({ success: false, message: 'غير مسموح.' })

    Object.assign(product, req.body)
    await product.save()
    res.json({ success: true, data: product })
  } catch (err) { next(err) }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: 'المنتج غير موجود.' })
    await logActivity({ adminId: req.user._id, action: 'deleted product', targetType: 'product', targetId: product._id, targetName: product.name })
    res.json({ success: true, message: 'تم حذف المنتج.' })
  } catch (err) { next(err) }
}

exports.approveProduct = async (req, res, next) => {
  try {
    const { approved, reason } = req.body
    const product = await Product.findByIdAndUpdate(req.params.id, {
      approvalStatus: approved ? 'approved' : 'rejected',
      isVisible: approved,
      rejectionReason: approved ? null : reason,
    }, { new: true })
    if (!product) return res.status(404).json({ success: false, message: 'المنتج غير موجود.' })

    if (product.vendorId) {
      await sendNotification({
        recipientId: product.vendorId, senderType: 'admin', category: 'general',
        title: approved ? `تم نشر منتجك ✅` : `تم رفض منتجك ❌`,
        body: approved ? `منتج "${product.name}" أصبح مرئياً في المتجر.` : `منتج "${product.name}" مرفوض. السبب: ${reason || 'لم يُحدد.'}`,
      })
    }

    await logActivity({ adminId: req.user._id, action: approved ? 'approved product' : 'rejected product', targetType: 'product', targetId: product._id, targetName: product.name })
    res.json({ success: true, data: product })
  } catch (err) { next(err) }
}

exports.toggleVisibility = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: 'المنتج غير موجود.' })
    product.isVisible = !product.isVisible
    await product.save()
    res.json({ success: true, isVisible: product.isVisible })
  } catch (err) { next(err) }
}

exports.placeOrder = async (req, res, next) => {
  try {
    const { productId, amount } = req.body
    const product = await Product.findById(productId)
    if (!product || !product.isVisible) return res.status(404).json({ success: false, message: 'المنتج غير موجود.' })
    if (product.stock - product.reservedCount <= 0) return res.status(400).json({ success: false, message: 'المنتج نفد من المخزون.' })

    product.reservedCount += 1
    await product.save()

    const firstOrder = await Order.countDocuments({ customerId: req.user._id }) === 0

    const order = await Order.create({
      customerId: req.user._id,
      productId,
      vendorId: product.vendorId || null,
      amount,
      pickupLocation: product.pickupLocation,
    })

    if (firstOrder) await awardXP(req.user._id, 'first_order')

    if (product.vendorId) {
      await sendNotification({
        recipientId: product.vendorId, senderType: 'store', category: 'financial',
        title: 'طلب جديد 🛒',
        body: `وصل طلب جديد على منتجك "${product.name}". رقم الطلب: ${order.orderId}`,
      })
    }

    res.status(201).json({ success: true, data: order })
  } catch (err) { next(err) }
}

exports.getOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = {}
    if (req.user.accountType === 'admin') {
      if (status) filter.status = status
    } else if (req.user.businessType === 'vendor') {
      filter.vendorId = req.user._id
      if (status) filter.status = status
    } else {
      filter.customerId = req.user._id
      if (status) filter.status = status
    }

    const total = await Order.countDocuments(filter)
    const orders = await Order.find(filter)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('productId', 'name images productCode')
      .populate('customerId', 'name email')

    res.json({ success: true, total, data: orders })
  } catch (err) { next(err) }
}

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('productId')
    if (!order) return res.status(404).json({ success: false, message: 'الطلب غير موجود.' })

    if (status === 'ready_for_pickup') {
      await sendNotification({
        recipientId: order.customerId, senderType: 'store', category: 'general',
        title: 'طلبك جاهز للاستلام 🚀',
        body: `طلبك "${order.productId?.name}" جاهز في: ${order.pickupLocation}. رمز الاستلام: ${order.pickupCode}`,
        actionUrl: '/dashboard/orders',
      })
    }

    await logActivity({ adminId: req.user._id, action: `order status → ${status}`, targetType: 'order', targetId: order._id, targetName: order.orderId })
    res.json({ success: true, data: order })
  } catch (err) { next(err) }
}

exports.confirmPickup = async (req, res, next) => {
  try {
    const { code } = req.body
    const order = await Order.findById(req.params.id).populate('productId')
    if (!order) return res.status(404).json({ success: false, message: 'الطلب غير موجود.' })
    if (order.pickupCode !== code) return res.status(400).json({ success: false, message: 'رمز الاستلام غير صحيح.' })

    order.status = 'received'
    order.receivedAt = new Date()
    await order.save()

    await Product.findByIdAndUpdate(order.productId._id, {
      $inc: { stock: -1, reservedCount: -1, totalSales: 1 },
    })

    await sendNotification({
      recipientId: order.customerId, senderType: 'store', category: 'general',
      title: 'تم استلام طلبك ✅',
      body: `تم تأكيد استلام "${order.productId?.name}". شكراً لتسوّقك معنا!`,
    })

    await logActivity({ adminId: req.user._id, action: 'confirmed pickup', targetType: 'order', targetId: order._id, targetName: order.orderId })
    res.json({ success: true, data: order })
  } catch (err) { next(err) }
}

exports.cancelOrder = async (req, res, next) => {
  try {
    const { reason } = req.body
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ success: false, message: 'الطلب غير موجود.' })
    if (['received', 'cancelled'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'لا يمكن إلغاء هذا الطلب.' })
    }

    order.status = 'cancelled'
    order.cancellationReason = reason
    await order.save()

    await Product.findByIdAndUpdate(order.productId, { $inc: { reservedCount: -1 } })
    await User.findByIdAndUpdate(order.customerId, { $inc: { virtualWalletBalance: order.amount } })

    await sendNotification({
      recipientId: order.customerId, senderType: 'store', category: 'financial',
      title: 'تم إلغاء طلبك',
      body: `تم إلغاء طلبك. تم إضافة ${order.amount} إلى محفظتك الرقمية.`,
    })

    await logActivity({ adminId: req.user._id, action: 'cancelled order', targetType: 'order', targetId: order._id, targetName: order.orderId })
    res.json({ success: true, data: order })
  } catch (err) { next(err) }
}
