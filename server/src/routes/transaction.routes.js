const express = require('express')
const router = express.Router()
const { protect, requireAdmin } = require('../middleware/auth')
const { submitTransaction, getTransactions, confirmTransaction, rejectTransaction } = require('../controllers/transaction.controller')

router.post('/', protect, submitTransaction)
router.get('/', protect, getTransactions)
router.patch('/:id/confirm', protect, requireAdmin, confirmTransaction)
router.patch('/:id/reject', protect, requireAdmin, rejectTransaction)

module.exports = router
