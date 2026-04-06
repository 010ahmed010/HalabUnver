const express = require('express')
const router = express.Router()
const { protect, requireAdmin } = require('../middleware/auth')
const { getNotifications, markRead, markAllRead, archiveNotification, sendToUser } = require('../controllers/notification.controller')

router.get('/', protect, getNotifications)
router.patch('/:id/read', protect, markRead)
router.patch('/read-all', protect, markAllRead)
router.delete('/:id', protect, archiveNotification)
router.post('/send', protect, requireAdmin, sendToUser)

module.exports = router
