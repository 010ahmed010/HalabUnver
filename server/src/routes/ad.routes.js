const express = require('express')
const router = express.Router()
const { protect, optionalAuth, requireAdmin } = require('../middleware/auth')
const {
  createCampaign, getCampaigns, approveCampaign, rejectCampaign,
  extendCampaign, trackImpression, trackClick, getAdsConfig, updateAdsConfig,
} = require('../controllers/ad.controller')

router.get('/config', getAdsConfig)
router.patch('/config', protect, requireAdmin, updateAdsConfig)
router.post('/', protect, createCampaign)
router.get('/', optionalAuth, getCampaigns)
router.patch('/:id/approve', protect, requireAdmin, approveCampaign)
router.patch('/:id/reject', protect, requireAdmin, rejectCampaign)
router.patch('/:id/extend', protect, requireAdmin, extendCampaign)
router.post('/:id/impression', trackImpression)
router.post('/:id/click', trackClick)

module.exports = router
