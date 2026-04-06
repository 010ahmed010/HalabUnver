const express = require('express')
const router = express.Router()
const { protect, requireAdmin } = require('../middleware/auth')
const { getConfig, updateConfig, seedConfig } = require('../controllers/config.controller')

router.get('/', getConfig)
router.patch('/', protect, requireAdmin, updateConfig)
router.post('/seed', protect, requireAdmin, seedConfig)

module.exports = router
