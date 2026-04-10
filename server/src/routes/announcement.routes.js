const express = require('express')
const router = express.Router()
const { protect, optionalAuth, requireAdmin } = require('../middleware/auth')
const { getAll, create, update, remove } = require('../controllers/announcement.controller')

router.get('/', optionalAuth, getAll)
router.post('/', protect, requireAdmin, create)
router.patch('/:id', protect, requireAdmin, update)
router.delete('/:id', protect, requireAdmin, remove)

module.exports = router
