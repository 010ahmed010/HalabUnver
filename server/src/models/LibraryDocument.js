const mongoose = require('mongoose')

const libraryDocumentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, default: 'غير محدد' },
  description: { type: String, default: '' },
  type: {
    type: String,
    enum: ['كتاب', 'ملخص', 'بحث', 'نموذج امتحان'],
    required: true,
  },
  category: {
    type: String,
    enum: ['هندسة', 'طب', 'حقوق', 'فنون', 'تقنية', 'أخرى'],
    required: true,
  },
  year: { type: Number, default: null },
  academicYear: {
    type: String,
    enum: ['1', '2', '3', '4', '5', 'دراسات عليا'],
    default: null,
  },
  term: { type: String, enum: ['الأول', 'الثاني', null], default: null },
  googleDriveId: { type: String, required: true },
  thumbnailUrl: { type: String, default: null },
  fileFormat: { type: String, enum: ['PDF', 'MD', 'DOCX'], default: 'PDF' },
  pageCount: { type: Number, default: null },
  accessCount: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  isStudentContributed: { type: Boolean, default: false },
  contributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isLinkBroken: { type: Boolean, default: false },
}, { timestamps: true })

libraryDocumentSchema.index({ category: 1, type: 1, isVisible: 1 })
libraryDocumentSchema.index({ title: 'text', author: 'text', description: 'text' })

module.exports = mongoose.model('LibraryDocument', libraryDocumentSchema)
