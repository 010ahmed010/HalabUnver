const mongoose = require('mongoose')

const milestoneSchema = new mongoose.Schema({
  title: String,
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
})

const serviceContractSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'FreelancerService', default: null },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'SYP' },
  status: {
    type: String,
    enum: ['awaiting_payment', 'in_escrow', 'in_progress', 'under_review', 'completed', 'disputed', 'cancelled'],
    default: 'awaiting_payment',
  },
  deadline: { type: Date, default: null },
  milestones: [milestoneSchema],
  submittedFiles: [{ name: String, url: String, submittedAt: Date }],
  escrowTransactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', default: null },
  escrowReleasedAt: { type: Date, default: null },
  clientApproved: { type: Boolean, default: false },
  adminApproved: { type: Boolean, default: false },
  disputeReason: { type: String, default: null },
  commissionRate: { type: Number, default: 0.05 },
  isBid: { type: Boolean, default: false },
  bidAmount: { type: Number, default: null },
  bidAcceptedAt: { type: Date, default: null },
}, { timestamps: true })

serviceContractSchema.index({ clientId: 1, status: 1 })
serviceContractSchema.index({ freelancerId: 1, status: 1 })

module.exports = mongoose.model('ServiceContract', serviceContractSchema)
