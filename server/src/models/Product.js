const mongoose = require('mongoose')

const specSchema = new mongoose.Schema({ key: String, value: String }, { _id: false })

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  productCode: { type: String, unique: true },
  category: {
    type: String,
    enum: ['إلكترونيات', 'أدوات هندسية', 'قرطاسية', 'ملابس المنصة', 'أخرى'],
    required: true,
  },
  price: { type: Number, required: true },
  studentPrice: { type: Number, default: null },
  discount: { type: Number, default: 0 },
  images: [String],
  stock: { type: Number, default: 0 },
  reservedCount: { type: Number, default: 0 },
  source: { type: String, enum: ['platform', 'vendor'], default: 'platform' },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  specs: [specSchema],
  staffNote: { type: String, default: '' },
  datasheetUrl: { type: String, default: null },
  pickupLocation: { type: String, default: '' },
  deliveryTimeline: { type: String, default: 'فوري' },
  warrantyNote: { type: String, default: '' },
  isVisible: { type: Boolean, default: false },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: function () {
      return this.source === 'platform' ? 'approved' : 'pending'
    },
  },
  rejectionReason: { type: String, default: null },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true })

productSchema.index({ category: 1, isVisible: 1, approvalStatus: 1 })
productSchema.index({ source: 1 })
productSchema.index({ name: 'text', description: 'text' })

productSchema.pre('save', function (next) {
  if (!this.productCode) {
    this.productCode = `HS-${Date.now().toString(36).toUpperCase()}`
  }
  next()
})

module.exports = mongoose.model('Product', productSchema)
