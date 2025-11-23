// src/routes/courses.routes.js

const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

// Prinsip 1: Resource-Oriented URI (/api/courses menggunakan kata benda jamak) 
// Prinsip 2: Proper HTTP Methods (GET, POST, PUT, DELETE) 

router.get('/', coursesController.getAllCourses); 
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.createCourse);
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;