const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { register, login, getMe, forgotPassword, changePassword } = require('../controllers/auth.controller')
const { protect } = require('../middleware/auth')

router.post('/register', [
  body('name').trim().notEmpty().withMessage('الاسم مطلوب'),
  body('email').isEmail().withMessage('البريد الإلكتروني غير صالح'),
  body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  body('accountType').isIn(['student', 'business']).withMessage('نوع الحساب غير صالح'),
], register)

router.post('/login', [
  body('identifier').trim().notEmpty().withMessage('اسم المستخدم أو البريد الإلكتروني مطلوب'),
  body('password').notEmpty().withMessage('كلمة المرور مطلوبة'),
], login)

router.get('/me', protect, getMe)
router.post('/forgot-password', forgotPassword)
router.patch('/change-password', protect, changePassword)

module.exports = router
