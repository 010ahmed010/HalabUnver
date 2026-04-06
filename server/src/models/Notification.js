const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderType: {
    type: String,
    enum: ['admin', 'store', 'academy', 'freelance', 'system'],
    default: 'system',
  },
  category: {
    type: String,
    enum: ['financial', 'academic', 'announcements', 'contracts', 'general'],
    default: 'general',
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  actionLabel: { type: String, default: null },
  actionUrl: { type: String, default: null },
  isRead: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true })

notificationSchema.index({ recipientId: 1, isRead: 1 })
notificationSchema.index({ recipientId: 1, category: 1 })

module.exports = mongoose.model('Notification', notificationSchema)
