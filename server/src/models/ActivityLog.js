const mongoose = require('mongoose')

const activityLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  targetType: { type: String, enum: ['user', 'order', 'product', 'transaction', 'ad', 'course', 'document', 'contract', 'config'], default: 'user' },
  targetId: { type: mongoose.Schema.Types.ObjectId, default: null },
  targetName: { type: String, default: '' },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true })

activityLogSchema.index({ adminId: 1, createdAt: -1 })
activityLogSchema.index({ createdAt: -1 })

module.exports = mongoose.model('ActivityLog', activityLogSchema)
