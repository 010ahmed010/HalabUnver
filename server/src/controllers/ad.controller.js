const AdCampaign = require('../models/AdCampaign')
const SystemConfig = require('../models/SystemConfig')
const logActivity = require('../utils/logActivity')
const { sendNotification } = require('../utils/sendNotification')

exports.createCampaign = async (req, res, next) => {
  try {
    if (req.user.businessType !== 'advertiser' && req.user.accountType !== 'admin') {
      return res.status(403).json({ success: false, message: 'فقط حسابات المعلنين يمكنها إنشاء حملات.' })
    }
    const campaign = await AdCampaign.create({ ...req.body, advertiserId: req.user._id })
    res.status(201).json({ success: true, data: campaign })
  } catch (err) { next(err) }
}

exports.getCampaigns = async (req, res, next) => {
  try {
    const { status, zone, page = 1, limit = 20 } = req.query
    let filter = {}

    if (req.user?.accountType === 'admin') {
      if (status) filter.status = status
      if (zone) filter.zone = zone
    } else if (req.user?.businessType === 'advertiser') {
      filter.advertiserId = req.user._id
    } else {
      const config = await SystemConfig.findOne({ key: 'global' })
      if (!config?.adsConfig?.adsActive) return res.json({ success: true, data: [] })
      filter = { status: 'active', endDate: { $gte: new Date() } }
      if (zone) {
        const zoneKey = `adsConfig.zone${zone.charAt(0).toUpperCase() + zone.slice(1)}`
        if (config?.adsConfig?.[`zone${zone.charAt(0).toUpperCase() + zone.slice(1)}`] === 'disabled') {
          return res.json({ success: true, data: [] })
        }
        filter.zone = zone
      }
    }

    const total = await AdCampaign.countDocuments(filter)
    const campaigns = await AdCampaign.find(filter)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('advertiserId', 'name')

    res.json({ success: true, total, data: campaigns })
  } catch (err) { next(err) }
}

exports.approveCampaign = async (req, res, next) => {
  try {
    const campaign = await AdCampaign.findByIdAndUpdate(req.params.id, {
      status: 'active',
      approvedBy: req.user._id,
      approvedAt: new Date(),
    }, { new: true })
    if (!campaign) return res.status(404).json({ success: false, message: 'الحملة غير موجودة.' })

    await sendNotification({
      recipientId: campaign.advertiserId, senderType: 'admin', category: 'general',
      title: 'تم نشر حملتك الإعلانية ✅',
      body: `حملتك الإعلانية أصبحت نشطة في المنطقة: ${campaign.zone}.`,
    })

    await logActivity({ adminId: req.user._id, action: 'approved ad campaign', targetType: 'ad', targetId: campaign._id, targetName: campaign.clientTag })
    res.json({ success: true, data: campaign })
  } catch (err) { next(err) }
}

exports.rejectCampaign = async (req, res, next) => {
  try {
    const { reason } = req.body
    const campaign = await AdCampaign.findByIdAndUpdate(req.params.id, { status: 'rejected', rejectionReason: reason }, { new: true })
    if (!campaign) return res.status(404).json({ success: false, message: 'الحملة غير موجودة.' })

    await sendNotification({
      recipientId: campaign.advertiserId, senderType: 'admin', category: 'general',
      title: 'تم رفض حملتك الإعلانية ❌',
      body: reason || 'تم رفض حملتك الإعلانية.',
    })

    res.json({ success: true, data: campaign })
  } catch (err) { next(err) }
}

exports.extendCampaign = async (req, res, next) => {
  try {
    const { newEndDate } = req.body
    const campaign = await AdCampaign.findByIdAndUpdate(req.params.id, { endDate: new Date(newEndDate), status: 'active' }, { new: true })
    if (!campaign) return res.status(404).json({ success: false, message: 'الحملة غير موجودة.' })
    res.json({ success: true, data: campaign })
  } catch (err) { next(err) }
}

exports.trackImpression = async (req, res, next) => {
  try {
    await AdCampaign.findByIdAndUpdate(req.params.id, { $inc: { impressions: 1 } })
    res.json({ success: true })
  } catch (err) { next(err) }
}

exports.trackClick = async (req, res, next) => {
  try {
    await AdCampaign.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } })
    res.json({ success: true })
  } catch (err) { next(err) }
}

exports.getAdsConfig = async (req, res, next) => {
  try {
    const config = await SystemConfig.findOne({ key: 'global' }).select('adsConfig')
    res.json({ success: true, data: config?.adsConfig || {} })
  } catch (err) { next(err) }
}

exports.updateAdsConfig = async (req, res, next) => {
  try {
    const config = await SystemConfig.findOneAndUpdate(
      { key: 'global' },
      { adsConfig: req.body },
      { new: true, upsert: true }
    )
    await logActivity({ adminId: req.user._id, action: 'updated ads config', targetType: 'config' })
    res.json({ success: true, data: config.adsConfig })
  } catch (err) { next(err) }
}
