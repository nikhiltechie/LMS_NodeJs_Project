const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courseController");
const authentication = require("../authentication/checksignin");

router.get('/', authentication.checkSignIn, courseController.getListCourseView );

router.get('/add', authentication.checkSignIn, courseController.getAddCourseForm);

router.post('/add', authentication.checkSignIn,  courseController.addCourses);

router.get('/update', authentication.checkSignIn,  courseController.getUpdateForm);

router.post('/update', authentication.checkSignIn,  courseController.updateCourse);

router.get('/delete', authentication.checkSignIn,  courseController.deleteCourse);

module.exports = router;