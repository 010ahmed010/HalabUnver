const express = require('express')
const router = express.Router()
const { protect, optionalAuth, requireAdmin, requireStudent } = require('../middleware/auth')
const {
  getDocuments, getDocumentById, createDocument, updateDocument, deleteDocument,
  downloadDocument, feedbackDocument, checkLinks,
  getBookmarks, addBookmark, removeBookmark,
} = require('../controllers/library.controller')

router.get('/', optionalAuth, getDocuments)
router.get('/bookmarks', protect, requireStudent, getBookmarks)
router.post('/bookmarks', protect, requireStudent, addBookmark)
router.delete('/bookmarks/:id', protect, requireStudent, removeBookmark)
router.post('/check-links', protect, requireAdmin, checkLinks)
router.get('/:id', optionalAuth, getDocumentById)
router.post('/', protect, requireAdmin, createDocument)
router.patch('/:id', protect, requireAdmin, updateDocument)
router.delete('/:id', protect, requireAdmin, deleteDocument)
router.post('/:id/download', optionalAuth, downloadDocument)
router.post('/:id/feedback', feedbackDocument)

module.exports = router
