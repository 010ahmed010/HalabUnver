const Notification = require('../models/Notification')

exports.getNotifications = async (req, res, next) => {
  try {
    const { category, isRead, page = 1, limit = 20 } = req.query
    const filter = { recipientId: req.user._id, isArchived: false }
    if (category) filter.category = category
    if (isRead !== undefined) filter.isRead = isRead === 'true'

    const total = await Notification.countDocuments(filter)
    const unreadCount = await Notification.countDocuments({ recipientId: req.user._id, isRead: false, isArchived: false })
    const notifications = await Notification.find(filter)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ success: true, total, unreadCount, data: notifications })
  } catch (err) { next(err) }
}

exports.markRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipientId: req.user._id },
      { isRead: true },
      { new: true }
    )
    if (!notification) return res.status(404).json({ success: false, message: 'الإشعار غير موجود.' })
    res.json({ success: true, data: notification })
  } catch (err) { next(err) }
}

exports.markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ recipientId: req.user._id, isRead: false }, { isRead: true })
    res.json({ success: true, message: 'تم تحديد جميع الإشعارات كمقروءة.' })
  } catch (err) { next(err) }
}

exports.archiveNotification = async (req, res, next) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, recipientId: req.user._id }, { isArchived: true })
    res.json({ success: true, message: 'تم أرشفة الإشعار.' })
  } catch (err) { next(err) }
}

exports.sendToUser = async (req, res, next) => {
  try {
    const { recipientId, senderType, category, title, body, actionLabel, actionUrl } = req.body
    const notification = await Notification.create({ recipientId, senderType: senderType || 'admin', category: category || 'general', title, body, actionLabel, actionUrl })
    res.status(201).json({ success: true, data: notification })
  } catch (err) { next(err) }
}
