const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.message)

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ success: false, message: messages.join('. ') })
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ success: false, message: `${field} مستخدم مسبقاً.` })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'معرّف غير صالح.' })
  }

  const status = err.statusCode || 500
  const message = err.message || 'خطأ في الخادم — حاول مجدداً.'
  res.status(status).json({ success: false, message })
}

module.exports = errorHandler
