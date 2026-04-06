const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  lastLessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', default: null },
  progressPercent: { type: Number, default: 0 },
  xpEarned: { type: Number, default: 0 },
  completedAt: { type: Date, default: null },
  certificateIssued: { type: Boolean, default: false },
  notes: { type: Map, of: String, default: {} },
  lessonRatings: { type: Map, of: Number, default: {} },
}, { timestamps: true })

enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true })

module.exports = mongoose.model('Enrollment', enrollmentSchema)
