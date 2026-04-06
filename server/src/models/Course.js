const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  instructor: {
    name: { type: String, required: true },
    avatar: { type: String, default: null },
    rating: { type: Number, default: 0 },
  },
  thumbnail: { type: String, default: null },
  branch: {
    type: String,
    enum: ['برمجة', 'شبكات', 'أمن سيبراني', 'ذكاء اصطناعي', 'هندسة عمارة', 'طب', 'قانون', 'أخرى'],
    required: true,
  },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  isUniversity: { type: Boolean, default: false },
  language: { type: String, default: 'ar' },
  level: { type: String, enum: ['مبتدئ', 'متوسط', 'متقدم'], default: 'مبتدئ' },
  totalDuration: { type: Number, default: 0 },
  enrolledCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  roadmapUrl: { type: String, default: null },
  tags: [String],
}, { timestamps: true })

courseSchema.index({ branch: 1, isVisible: 1 })
courseSchema.index({ isFree: 1 })

module.exports = mongoose.model('Course', courseSchema)
