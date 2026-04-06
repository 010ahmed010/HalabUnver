const express = require('express')
const router = express.Router()
const { protect, requireAdmin } = require('../middleware/auth')
const {
  getAllUsers, getUserById, updateProfile, verifyStudent,
  updateUserStatus, manualXpOverride, deleteUser, bulkNotify, uploadUniversityId,
} = require('../controllers/user.controller')

router.get('/', protect, requireAdmin, getAllUsers)
router.get('/:id', protect, getUserById)
router.patch('/me/profile', protect, updateProfile)
router.post('/me/university-id', protect, uploadUniversityId)
router.patch('/:id/verify', protect, requireAdmin, verifyStudent)
router.patch('/:id/status', protect, requireAdmin, updateUserStatus)
router.patch('/:id/xp', protect, requireAdmin, manualXpOverride)
router.delete('/:id', protect, requireAdmin, deleteUser)
router.post('/bulk-notify', protect, requireAdmin, bulkNotify)

module.exports = router
