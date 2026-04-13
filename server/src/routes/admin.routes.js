const express = require('express')
const router = express.Router()
const { protect, requireAdmin } = require('../middleware/auth')
const {
  getStats, getActivityLog, getRevenueStats,
  updateBusinessPermissions, approveBusiness, getPendingBusinesses,
  getPendingProducts, getAllOrders, updateVendorCredit,
  getDepositRequests, approveDepositRequest,
} = require('../controllers/admin.controller')

router.use(protect, requireAdmin)

router.get('/stats', getStats)
router.get('/activity-log', getActivityLog)
router.get('/revenue', getRevenueStats)
router.get('/pending-businesses', getPendingBusinesses)
router.get('/pending-products', getPendingProducts)
router.get('/orders', getAllOrders)
router.get('/deposit-requests', getDepositRequests)
router.patch('/users/:id/permissions', updateBusinessPermissions)
router.patch('/users/:id/approve-business', approveBusiness)
router.patch('/users/:id/credit', updateVendorCredit)
router.patch('/deposit-requests/:id/review', approveDepositRequest)

module.exports = router
