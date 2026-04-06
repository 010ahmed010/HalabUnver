const express = require('express')
const router = express.Router()
const { protect, requireAdmin } = require('../middleware/auth')
const { getStats, getActivityLog, getRevenueStats } = require('../controllers/admin.controller')

router.use(protect, requireAdmin)

router.get('/stats', getStats)
router.get('/activity-log', getActivityLog)
router.get('/revenue', getRevenueStats)

module.exports = router
