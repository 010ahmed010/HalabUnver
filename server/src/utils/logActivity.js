const ActivityLog = require('../models/ActivityLog')

const logActivity = async ({ adminId, action, targetType = 'user', targetId = null, targetName = '', metadata = {} }) => {
  try {
    await ActivityLog.create({ adminId, action, targetType, targetId, targetName, metadata })
  } catch (err) {
    console.error('[ACTIVITY LOG] Error:', err.message)
  }
}

module.exports = logActivity
