const mongoose = require('mongoose')

const freelancerServiceSchema = new mongoose.Schema({
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'برمجة وتطوير', 'هندسة وعمارة', 'تصميم', 'كتابة وترجمة',
      'ذكاء اصطناعي', 'تسويق رقمي', 'بيانات', 'صوتيات',
      'فيديو وأنيميشن', 'أعمال', 'تعليم عن بعد', 'أسلوب حياة',
    ],
    required: true,
  },
  level: { type: String, enum: ['مبتدئ', 'محترف', 'نخبة'], default: 'مبتدئ' },
  price: { type: Number, required: true },
  deliveryDays: { type: Number, required: true },
  revisions: { type: Number, default: 1 },
  includesSourceCode: { type: Boolean, default: false },
  thumbnail: { type: String, default: null },
  tags: [String],
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  ordersInQueue: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  isPromoted: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true })

freelancerServiceSchema.index({ freelancerId: 1 })
freelancerServiceSchema.index({ category: 1, isVisible: 1 })
freelancerServiceSchema.index({ rating: -1 })
freelancerServiceSchema.index({ price: 1 })

module.exports = mongoose.model('FreelancerService', freelancerServiceSchema)
