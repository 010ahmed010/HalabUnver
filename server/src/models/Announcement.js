const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  tag: {
    type: String,
    enum: ['عام', 'أكاديمية', 'مكتبة', 'متجر', 'مستقلون', 'امتحانات'],
    default: 'عام',
  },
  urgent: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announcementSchema)
