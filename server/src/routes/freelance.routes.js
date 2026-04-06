const express = require('express')
const router = express.Router()
const { protect, optionalAuth, requireStudent, requireStudentOrBusiness } = require('../middleware/auth')
const {
  getProfiles, getProfileById, createOrUpdateProfile, getLeaderboard,
  getServices, getServiceById, createService, updateService, deleteService,
  startOnboarding, getContracts, createContract, updateContract, addReview,
} = require('../controllers/freelance.controller')

router.get('/profiles', optionalAuth, getProfiles)
router.get('/profiles/:id', optionalAuth, getProfileById)
router.put('/profiles/me', protect, createOrUpdateProfile)
router.get('/leaderboard', optionalAuth, getLeaderboard)
router.get('/services', optionalAuth, getServices)
router.get('/services/:id', optionalAuth, getServiceById)
router.post('/services', protect, createService)
router.patch('/services/:id', protect, updateService)
router.delete('/services/:id', protect, deleteService)
router.post('/services/:id/review', protect, addReview)
router.post('/onboard', protect, requireStudent, startOnboarding)
router.get('/contracts', protect, getContracts)
router.post('/contracts', protect, requireStudentOrBusiness, createContract)
router.patch('/contracts/:id', protect, updateContract)

module.exports = router
