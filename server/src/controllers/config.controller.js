const SystemConfig = require('../models/SystemConfig')
const logActivity = require('../utils/logActivity')

const DEFAULT_CONFIG = {
  key: 'global',
  heroHeadline: 'منصتك الأكاديمية',
  heroSubline: 'تعلّم · اكسب · ابنِ مستقبلك',
  searchQuickTags: [
    { label: 'المكتبة', url: '/library' },
    { label: 'الأكاديمية', url: '/academy' },
    { label: 'المستقلون', url: '/freelance' },
    { label: 'المتجر', url: '/store' },
  ],
  showMotto: true,
  isExamSeason: false,
  isMaintenanceMode: false,
  subscriptionFee: 5,
  adsConfig: { adsActive: true, providerMode: 'LOCAL_BANNERS', zoneHeader: 'local', zoneSidebar: 'local', zoneInFeed: 'local' },
}

exports.getConfig = async (req, res, next) => {
  try {
    let config = await SystemConfig.findOne({ key: 'global' })
    if (!config) config = await SystemConfig.create(DEFAULT_CONFIG)
    res.json({ success: true, data: config })
  } catch (err) { next(err) }
}

exports.updateConfig = async (req, res, next) => {
  try {
    const config = await SystemConfig.findOneAndUpdate(
      { key: 'global' },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    )
    if (req.user) await logActivity({ adminId: req.user._id, action: 'updated system config', targetType: 'config' })
    res.json({ success: true, data: config })
  } catch (err) { next(err) }
}

exports.seedConfig = async (req, res, next) => {
  try {
    const existing = await SystemConfig.findOne({ key: 'global' })
    if (existing) return res.json({ success: true, message: 'Config already seeded.', data: existing })
    const config = await SystemConfig.create(DEFAULT_CONFIG)
    res.status(201).json({ success: true, message: 'Default config seeded.', data: config })
  } catch (err) { next(err) }
}
