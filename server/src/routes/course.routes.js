const express = require('express')
const router = express.Router()
const { protect, optionalAuth, requireAdmin, requireStudent } = require('../middleware/auth')
const {
  getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
  enrollInCourse, getMyEnrollments, addLesson, updateLessonProgress,
} = require('../controllers/course.controller')

router.get('/', optionalAuth, getCourses)
router.get('/my-enrollments', protect, requireStudent, getMyEnrollments)
router.get('/:id', optionalAuth, getCourseById)
router.post('/', protect, requireAdmin, createCourse)
router.patch('/:id', protect, requireAdmin, updateCourse)
router.delete('/:id', protect, requireAdmin, deleteCourse)
router.post('/:id/enroll', protect, requireStudent, enrollInCourse)
router.post('/:id/lessons', protect, requireAdmin, addLesson)
router.patch('/lessons/:lessonId/progress', protect, requireStudent, updateLessonProgress)

module.exports = router
