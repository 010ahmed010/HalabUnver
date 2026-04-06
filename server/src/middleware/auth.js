const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'غير مصرّح — يرجى تسجيل الدخول.' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ success: false, message: 'المستخدم غير موجود.' })
    }
    if (user.status === 'frozen') {
      return res.status(403).json({ success: false, message: 'حسابك مجمّد. تواصل مع الإدارة.' })
    }
    req.user = user
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'توكن غير صالح أو منتهي الصلاحية.' })
  }
}

const optionalAuth = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) return next()
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (user && user.status !== 'frozen') req.user = user
  } catch {}
  next()
}

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'غير مصرّح.' })
  if (!roles.includes(req.user.accountType)) {
    return res.status(403).json({ success: false, message: 'غير مسموح — صلاحيات غير كافية.' })
  }
  next()
}

const requireAdmin = requireRole('admin')
const requireStudent = requireRole('student')
const requireBusiness = requireRole('business')
const requireStudentOrBusiness = requireRole('student', 'business')

module.exports = { protect, optionalAuth, requireAdmin, requireStudent, requireBusiness, requireStudentOrBusiness }
