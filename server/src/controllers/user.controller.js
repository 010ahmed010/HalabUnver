const User = require('../models/User')
const FreelancerProfile = require('../models/FreelancerProfile')
const Notification = require('../models/Notification')
const { awardXP, calculateLevel } = require('../utils/xp')
const { sendNotification, sendBulkNotification } = require('../utils/sendNotification')
const logActivity = require('../utils/logActivity')

exports.getAllUsers = async (req, res, next) => {
  try {
    const { accountType, status, businessType, search, page = 1, limit = 20 } = req.query
    const filter = {}
    if (accountType) filter.accountType = accountType
    if (status) filter.status = status
    if (businessType) filter.businessType = businessType
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ]

    const total = await User.countDocuments(filter)
    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .select('-password')

    res.json({ success: true, total, page: Number(page), data: users })
  } catch (err) { next(err) }
}

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ success: false, message: 'المستخدم غير موجود.' })
    res.json({ success: true, data: user })
  } catch (err) { next(err) }
}

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, bio, faculty, year, skills, socialLinks, profileVisibility, notificationSettings, avatar } = req.body
    const allowedUpdates = { name, bio, faculty, year, skills, socialLinks, profileVisibility, notificationSettings, avatar }
    Object.keys(allowedUpdates).forEach(k => allowedUpdates[k] === undefined && delete allowedUpdates[k])

    const user = await User.findByIdAndUpdate(req.user._id, allowedUpdates, { new: true, runValidators: true }).select('-password')
    res.json({ success: true, data: user })
  } catch (err) { next(err) }
}

exports.verifyStudent = async (req, res, next) => {
  try {
    const { approved } = req.body
    const user = await User.findById(req.params.id)
    if (!user || user.accountType !== 'student') return res.status(404).json({ success: false, message: 'الطالب غير موجود.' })

    user.isVerified = approved
    user.verificationStatus = approved ? 'approved' : 'rejected'
    await user.save()

    if (approved) {
      await awardXP(user._id, 'verify_identity')
      await sendNotification({
        recipientId: user._id, senderType: 'admin', category: 'general',
        title: 'تم التحقق من هويتك ✅',
        body: 'تهانينا! تم قبول هويتك الجامعية. أصبح حسابك موثّقاً وحصلت على +500 XP.',
      })
    } else {
      await sendNotification({
        recipientId: user._id, senderType: 'admin', category: 'general',
        title: 'طلب التحقق مرفوض ❌',
        body: 'تم رفض صورة بطاقتك الجامعية. يرجى إعادة رفع صورة واضحة.',
        actionLabel: 'رفع الهوية', actionUrl: '/dashboard/settings',
      })
    }

    await logActivity({ adminId: req.user._id, action: approved ? 'verified student' : 'rejected student verification', targetType: 'user', targetId: user._id, targetName: user.name })
    res.json({ success: true, data: user.toPublicJSON() })
  } catch (err) { next(err) }
}

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { status, reason } = req.body
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password')
    if (!user) return res.status(404).json({ success: false, message: 'المستخدم غير موجود.' })

    await sendNotification({
      recipientId: user._id, senderType: 'admin', category: 'general',
      title: `تم تحديث حالة حسابك`,
      body: reason || `حالة حسابك الآن: ${status}`,
    })

    await logActivity({ adminId: req.user._id, action: `set user status to ${status}`, targetType: 'user', targetId: user._id, targetName: user.name })
    res.json({ success: true, data: user })
  } catch (err) { next(err) }
}

exports.manualXpOverride = async (req, res, next) => {
  try {
    const { delta, reason } = req.body
    const user = await User.findById(req.params.id)
    if (!user || user.accountType !== 'student') return res.status(404).json({ success: false, message: 'الطالب غير موجود.' })

    user.xp = Math.max(0, user.xp + delta)
    user.level = calculateLevel(user.xp)
    await user.save()

    await sendNotification({
      recipientId: user._id, senderType: 'admin', category: 'academic',
      title: delta > 0 ? `حصلت على +${delta} XP` : `تم خصم ${Math.abs(delta)} XP`,
      body: reason || 'تعديل يدوي من الإدارة.',
    })

    await logActivity({ adminId: req.user._id, action: `XP override: ${delta > 0 ? '+' : ''}${delta}`, targetType: 'user', targetId: user._id, targetName: user.name, metadata: { reason } })
    res.json({ success: true, xp: user.xp, level: user.level })
  } catch (err) { next(err) }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'المستخدم غير موجود.' })
    await logActivity({ adminId: req.user._id, action: 'deleted user', targetType: 'user', targetId: user._id, targetName: user.name })
    res.json({ success: true, message: 'تم حذف المستخدم.' })
  } catch (err) { next(err) }
}

exports.bulkNotify = async (req, res, next) => {
  try {
    const { segment, title, body } = req.body
    const filter = {}
    if (segment === 'students') filter.accountType = 'student'
    else if (segment === 'verified_students') { filter.accountType = 'student'; filter.isVerified = true }
    else if (segment === 'business') filter.accountType = 'business'
    else if (segment === 'freelancers') { filter.$or = [{ isFreelancer: true }, { businessType: 'freelancer' }] }

    const users = await User.find(filter).select('_id')
    const ids = users.map(u => u._id)
    await sendBulkNotification(ids, { senderType: 'admin', category: 'announcements', title, body })
    res.json({ success: true, sent: ids.length })
  } catch (err) { next(err) }
}

exports.uploadUniversityId = async (req, res, next) => {
  try {
    const { photoUrl } = req.body
    const user = await User.findByIdAndUpdate(req.user._id, {
      universityIdPhoto: photoUrl,
      verificationStatus: 'pending',
    }, { new: true }).select('-password')
    res.json({ success: true, data: user })
  } catch (err) { next(err) }
}
