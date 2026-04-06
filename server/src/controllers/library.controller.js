const LibraryDocument = require('../models/LibraryDocument')
const Bookmark = require('../models/Bookmark')
const { awardXP } = require('../utils/xp')
const logActivity = require('../utils/logActivity')

exports.getDocuments = async (req, res, next) => {
  try {
    const { type, category, academicYear, term, search, sort = '-createdAt', page = 1, limit = 12 } = req.query
    const filter = { isVisible: true }
    if (type) filter.type = type
    if (category) filter.category = category
    if (academicYear) filter.academicYear = academicYear
    if (term) filter.term = term
    if (search) filter.$text = { $search: search }

    const total = await LibraryDocument.countDocuments(filter)
    const docs = await LibraryDocument.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('contributorId', 'name')

    res.json({ success: true, total, page: Number(page), data: docs })
  } catch (err) { next(err) }
}

exports.getDocumentById = async (req, res, next) => {
  try {
    const doc = await LibraryDocument.findById(req.params.id).populate('contributorId', 'name')
    if (!doc || !doc.isVisible) return res.status(404).json({ success: false, message: 'المستند غير موجود.' })
    res.json({ success: true, data: doc })
  } catch (err) { next(err) }
}

exports.createDocument = async (req, res, next) => {
  try {
    const doc = await LibraryDocument.create({ ...req.body, addedBy: req.user._id })
    await logActivity({ adminId: req.user._id, action: 'added library document', targetType: 'document', targetId: doc._id, targetName: doc.title })
    res.status(201).json({ success: true, data: doc })
  } catch (err) { next(err) }
}

exports.updateDocument = async (req, res, next) => {
  try {
    const doc = await LibraryDocument.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!doc) return res.status(404).json({ success: false, message: 'المستند غير موجود.' })
    res.json({ success: true, data: doc })
  } catch (err) { next(err) }
}

exports.deleteDocument = async (req, res, next) => {
  try {
    const doc = await LibraryDocument.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ success: false, message: 'المستند غير موجود.' })
    await logActivity({ adminId: req.user._id, action: 'deleted library document', targetType: 'document', targetId: doc._id, targetName: doc.title })
    res.json({ success: true, message: 'تم حذف المستند.' })
  } catch (err) { next(err) }
}

exports.downloadDocument = async (req, res, next) => {
  try {
    const doc = await LibraryDocument.findByIdAndUpdate(req.params.id, { $inc: { accessCount: 1 } }, { new: true })
    if (!doc) return res.status(404).json({ success: false, message: 'المستند غير موجود.' })

    let xpResult = null
    if (req.user?.accountType === 'student') {
      xpResult = await awardXP(req.user._id, 'library_download')
    }

    const driveUrl = `https://drive.google.com/file/d/${doc.googleDriveId}/view`
    res.json({ success: true, url: driveUrl, xp: xpResult })
  } catch (err) { next(err) }
}

exports.feedbackDocument = async (req, res, next) => {
  try {
    const { vote } = req.body
    const update = vote === 'up' ? { $inc: { upvotes: 1 } } : { $inc: { downvotes: 1 } }
    const doc = await LibraryDocument.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!doc) return res.status(404).json({ success: false, message: 'المستند غير موجود.' })
    res.json({ success: true, upvotes: doc.upvotes, downvotes: doc.downvotes })
  } catch (err) { next(err) }
}

exports.checkLinks = async (req, res, next) => {
  try {
    const docs = await LibraryDocument.find({ isVisible: true }).select('googleDriveId title')
    res.json({ success: true, message: 'Link check initiated (manual inspection required for Drive links).', count: docs.length, data: docs.map(d => ({ id: d._id, title: d.title, driveId: d.googleDriveId })) })
  } catch (err) { next(err) }
}

exports.getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ studentId: req.user._id })
      .populate({ path: 'resourceId', refPath: 'resourceType' })
    res.json({ success: true, data: bookmarks })
  } catch (err) { next(err) }
}

exports.addBookmark = async (req, res, next) => {
  try {
    const { resourceType, resourceId, collection } = req.body
    const bookmark = await Bookmark.create({ studentId: req.user._id, resourceType, resourceId, collection })
    res.status(201).json({ success: true, data: bookmark })
  } catch (err) { next(err) }
}

exports.removeBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, studentId: req.user._id })
    if (!bookmark) return res.status(404).json({ success: false, message: 'المفضلة غير موجودة.' })
    res.json({ success: true, message: 'تم حذف المفضلة.' })
  } catch (err) { next(err) }
}
