const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  orderId: { type: String, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'SYP' },
  status: {
    type: String,
    enum: ['pending', 'receipt_uploaded', 'paid', 'ready_for_pickup', 'received', 'cancelled', 'disputed'],
    default: 'pending',
  },
  pickupCode: { type: String, default: null },
  pickupLocation: { type: String, default: '' },
  brokerName: { type: String, default: null },
  receiptPhoto: { type: String, default: null },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', default: null },
  cancellationReason: { type: String, default: null },
  receivedAt: { type: Date, default: null },
  disputeReason: { type: String, default: null },
}, { timestamps: true })

orderSchema.pre('save', function (next) {
  if (!this.orderId) {
    this.orderId = `HS-${Date.now().toString(36).toUpperCase()}`
  }
  if (!this.pickupCode) {
    this.pickupCode = Math.floor(1000 + Math.random() * 9000).toString()
  }
  next()
})

orderSchema.index({ customerId: 1, status: 1 })
orderSchema.index({ vendorId: 1 })

module.exports = mongoose.model('Order', orderSchema)
