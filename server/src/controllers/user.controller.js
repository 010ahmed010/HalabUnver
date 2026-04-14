const User = require('../models/User')
const FreelancerProfile = require('../models/FreelancerProfile')
const Notification = require('../models/Notification')
const DepositRequest = require('../models/DepositRequest')
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

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'يرجى إدخال كلمة المرور الحالية والجديدة.' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.' })
    }
    const bcrypt = require('bcryptjs')
    const user = await User.findById(req.user._id)
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'كلمة المرور الحالية غير صحيحة.' })
    }
    const hashed = await bcrypt.hash(newPassword, 10)
    user.password = hashed
    await user.save()
    res.json({ success: true, message: 'تم تغيير كلمة المرور بنجاح.' })
  } catch (err) { next(err) }
}

exports.updateVendorContacts = async (req, res, next) => {
  try {
    const { whatsapp, phone, telegram, other } = req.body
    const update = {}
    if (whatsapp !== undefined) update['vendorContacts.whatsapp'] = whatsapp
    if (phone !== undefined) update['vendorContacts.phone'] = phone
    if (telegram !== undefined) update['vendorContacts.telegram'] = telegram
    if (other !== undefined) update['vendorContacts.other'] = other
    const user = await User.findByIdAndUpdate(req.user._id, { $set: update }, { new: true }).select('-password')
    res.json({ success: true, data: user })
  } catch (err) { next(err) }
}

exports.requestDeposit = async (req, res, next) => {
  try {
    const { amount, note } = req.body
    const vendor = req.user

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'يرجى إدخال مبلغ صحيح.' })
    }

    const depositReq = await DepositRequest.create({
      vendorId: vendor._id,
      amount: Number(amount),
      note: note || '',
    })

    const admins = await User.find({ accountType: 'admin' }).select('_id')
    const notifPromises = admins.map(admin =>
      sendNotification({
        recipientId: admin._id,
        senderType: 'system',
        category: 'financial',
        title: `💳 طلب شحن رصيد من ${vendor.name}`,
        body: `يطلب البائع "${vendor.name}" (${vendor.email}) شحن رصيد بمقدار ${Number(amount).toFixed(2)}$${note ? `. ملاحظة: ${note}` : ''}. رصيده الحالي: ${(vendor.vendorCredit || 0).toFixed(2)}$.`,
      })
    )
    await Promise.all(notifPromises)

    res.json({ success: true, message: 'تم إرسال طلب الشحن للإدارة. سيتواصلون معك قريباً.', data: depositReq })
  } catch (err) { next(err) }
}
