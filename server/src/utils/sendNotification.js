const Notification = require('../models/Notification')

const sendNotification = async ({ recipientId, senderType = 'system', category = 'general', title, body, actionLabel = null, actionUrl = null, metadata = {} }) => {
  try {
    const notification = await Notification.create({
      recipientId,
      senderType,
      category,
      title,
      body,
      actionLabel,
      actionUrl,
      metadata,
    })
    return notification
  } catch (err) {
    console.error('[NOTIFY] Failed to send notification:', err.message)
    return null
  }
}

const sendBulkNotification = async (recipientIds, payload) => {
  const docs = recipientIds.map(id => ({ recipientId: id, ...payload }))
  try {
    await Notification.insertMany(docs, { ordered: false })
  } catch (err) {
    console.error('[NOTIFY] Bulk notification error:', err.message)
  }
}

module.exports = { sendNotification, sendBulkNotification }
