const mongoose = require('mongoose')

const adCampaignSchema = new mongoose.Schema({
  advertiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  targetUrl: { type: String, required: true },
  zone: { type: String, enum: ['header', 'sidebar', 'in_feed'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected', 'expired', 'paused'],
    default: 'pending',
  },
  rejectionReason: { type: String, default: null },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  approvedAt: { type: Date, default: null },
  clientTag: { type: String, default: '' },
}, { timestamps: true })

adCampaignSchema.virtual('ctr').get(function () {
  if (this.impressions === 0) return 0
  return ((this.clicks / this.impressions) * 100).toFixed(2)
})

adCampaignSchema.index({ status: 1, zone: 1 })
adCampaignSchema.index({ endDate: 1 })

module.exports = mongoose.model('AdCampaign', adCampaignSchema)
