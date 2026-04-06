const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceType: { type: String, enum: ['document', 'course'], required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  collection: { type: String, default: 'عام' },
}, { timestamps: true })

bookmarkSchema.index({ studentId: 1, resourceType: 1 })
bookmarkSchema.index({ studentId: 1, resourceId: 1 }, { unique: true })

module.exports = mongoose.model('Bookmark', bookmarkSchema)
