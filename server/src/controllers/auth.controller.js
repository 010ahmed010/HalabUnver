const User = require('../models/User')
const SystemConfig = require('../models/SystemConfig')
const generateToken = require('../utils/generateToken')
const { awardXP } = require('../utils/xp')
const { sendNotification } = require('../utils/sendNotification')
const { validationResult } = require('express-validator')

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg })

    const { name, email, password, accountType, businessType, faculty, year } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ success: false, message: 'البريد الإلكتروني مستخدم مسبقاً.' })

    if (accountType === 'admin') {
      return res.status(403).json({ success: false, message: 'لا يمكن إنشاء حسابات مشرف عبر التسجيل العام.' })
    }

    const userData = {
      name, email, password, accountType,
      businessType: accountType === 'business' ? businessType : null,
      faculty: accountType === 'student' ? faculty : null,
      year: accountType === 'student' ? year : null,
      status: accountType === 'business' ? 'pending' : 'active',
    }

    const user = await User.create(userData)
    await awardXP(user._id, 'register')

    if (accountType === 'business') {
      await sendNotification({
        recipientId: user._id,
        senderType: 'admin',
        category: 'general',
        title: 'تم استلام طلبك',
        body: 'سيتم مراجعة حسابك من قِبل الإدارة قبل التفعيل. سنُعلمك فور الموافقة.',
      })
    }

    const token = generateToken(user._id)
    res.status(201).json({ success: true, token, user: user.toPublicJSON() })
  } catch (err) { next(err) }
}

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg })

    const { identifier, password } = req.body
    const isEmail = identifier.includes('@')
    const query = isEmail ? { email: identifier.toLowerCase() } : { username: identifier.toLowerCase() }
    const user = await User.findOne(query).select('+password')
    if (!user) return res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة.' })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة.' })

    if (user.status === 'frozen') return res.status(403).json({ success: false, message: 'حسابك مجمّد. تواصل مع الإدارة.' })
    if (user.status === 'rejected') return res.status(403).json({ success: false, message: 'تم رفض حسابك. تواصل مع الإدارة.' })

    const token = generateToken(user._id)
    const publicUser = user.toObject()
    delete publicUser.password
    res.json({ success: true, token, user: publicUser })
  } catch (err) { next(err) }
}

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user.toPublicJSON() })
}

exports.forgotPassword = async (req, res) => {
  res.json({ success: true, message: 'إذا كان البريد مسجلاً، ستصلك تعليمات استعادة كلمة المرور.' })
}

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id).select('+password')
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) return res.status(400).json({ success: false, message: 'كلمة المرور الحالية غير صحيحة.' })
    user.password = newPassword
    await user.save()
    res.json({ success: true, message: 'تم تحديث كلمة المرور.' })
  } catch (err) { next(err) }
}
