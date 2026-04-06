const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['store_order', 'freelance_subscription', 'freelance_escrow', 'academy_enrollment', 'refund'],
    required: true,
  },
  purpose: { type: String, default: '' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'SYP' },
  txId: { type: String, required: true, trim: true },
  receiptPhoto: { type: String, default: null },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending',
  },
  rejectionReason: { type: String, default: null },
  confirmedAt: { type: Date, default: null },
  confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  linkedOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
  linkedContractId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceContract', default: null },
}, { timestamps: true })

transactionSchema.index({ userId: 1, status: 1 })
transactionSchema.index({ status: 1, type: 1 })

module.exports = mongoose.model('Transaction', transactionSchema)
