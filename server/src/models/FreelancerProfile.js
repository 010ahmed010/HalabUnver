const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, default: '' },
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceContract' },
}, { timestamps: true })

const portfolioItemSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  clientReview: { type: String, default: '' },
})

const freelancerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  title: { type: String, default: '' },
  bio: { type: String, default: '' },
  skills: [String],
  disciplines: [String],
  portfolio: [portfolioItemSchema],
  availability: { type: String, enum: ['available', 'busy'], default: 'available' },
  totalJobs: { type: Number, default: 0 },
  successRate: { type: Number, default: 100 },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  reviews: [reviewSchema],
  isVisible: { type: Boolean, default: true },
  subscriptionStatus: {
    type: String,
    enum: ['inactive', 'pending_payment', 'active', 'expired'],
    default: 'inactive',
  },
  subscriptionExpiry: { type: Date, default: null },
  powerScore: { type: Number, default: 0 },
  leaderboardRank: { type: Number, default: null },
}, { timestamps: true })

freelancerProfileSchema.index({ userId: 1 })
freelancerProfileSchema.index({ powerScore: -1 })
freelancerProfileSchema.index({ rating: -1 })

module.exports = mongoose.model('FreelancerProfile', freelancerProfileSchema)
