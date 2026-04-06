const express = require('express')
const router = express.Router()
const { protect, optionalAuth, requireAdmin } = require('../middleware/auth')
const {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct,
  approveProduct, toggleVisibility, placeOrder, getOrders,
  updateOrderStatus, confirmPickup, cancelOrder,
} = require('../controllers/store.controller')

router.get('/products', optionalAuth, getProducts)
router.get('/products/:id', optionalAuth, getProductById)
router.post('/products', protect, createProduct)
router.patch('/products/:id', protect, updateProduct)
router.delete('/products/:id', protect, requireAdmin, deleteProduct)
router.patch('/products/:id/approve', protect, requireAdmin, approveProduct)
router.patch('/products/:id/visibility', protect, requireAdmin, toggleVisibility)

router.get('/orders', protect, getOrders)
router.post('/orders', protect, placeOrder)
router.patch('/orders/:id/status', protect, requireAdmin, updateOrderStatus)
router.patch('/orders/:id/pickup', protect, requireAdmin, confirmPickup)
router.post('/orders/:id/cancel', protect, requireAdmin, cancelOrder)

module.exports = router
