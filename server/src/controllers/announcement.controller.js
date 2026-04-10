const Announcement = require('../models/Announcement')

const TAG_COLORS = {
  'عام': '#94A3B8',
  'أكاديمية': '#6366F1',
  'مكتبة': '#14B8A6',
  'متجر': '#F43F5E',
  'مستقلون': '#F59E0B',
  'امتحانات': '#8B5CF6',
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-SY', { day: 'numeric', month: 'long' })
}

exports.getAll = async (req, res, next) => {
  try {
    const filter = {}
    if (!req.user || req.user.accountType !== 'admin') {
      filter.isPublished = true
    }
    const limit = parseInt(req.query.limit) || 50
    const items = await Announcement.find(filter).sort({ createdAt: -1 }).limit(limit)
    const result = items.map(a => ({
      _id: a._id,
      title: a.title,
      tag: a.tag,
      color: TAG_COLORS[a.tag] || '#94A3B8',
      urgent: a.urgent,
      isPublished: a.isPublished,
      date: formatDate(a.createdAt),
      createdAt: a.createdAt,
    }))
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const { title, tag, urgent, isPublished } = req.body
    if (!title) return res.status(400).json({ success: false, message: 'العنوان مطلوب' })
    const item = await Announcement.create({ title, tag, urgent, isPublished })
    res.status(201).json({ success: true, data: { ...item.toObject(), color: TAG_COLORS[item.tag] || '#94A3B8', date: formatDate(item.createdAt) } })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const { title, tag, urgent, isPublished } = req.body
    const item = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, tag, urgent, isPublished },
      { new: true, runValidators: true }
    )
    if (!item) return res.status(404).json({ success: false, message: 'الإعلان غير موجود' })
    res.json({ success: true, data: { ...item.toObject(), color: TAG_COLORS[item.tag] || '#94A3B8', date: formatDate(item.createdAt) } })
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'تم حذف الإعلان' })
  } catch (err) { next(err) }
}
