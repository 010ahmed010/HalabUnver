const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true, trim: true },
  youtubeUrl: { type: String, required: true },
  duration: { type: Number, default: 0 },
  order: { type: Number, required: true },
  isLocked: { type: Boolean, default: false },
  isPreview: { type: Boolean, default: false },
  resources: [{
    name: { type: String },
    url: { type: String },
    type: { type: String, enum: ['pdf', 'code', 'link'], default: 'link' },
  }],
  xpReward: { type: Number, default: 50 },
}, { timestamps: true })

lessonSchema.index({ courseId: 1, order: 1 })

module.exports = mongoose.model('Lesson', lessonSchema)
