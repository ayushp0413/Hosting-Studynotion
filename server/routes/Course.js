const express = require("express");
const router = express.Router();


const { createCourse, updateCourse, deleteCourse, publishCourse, getAllCourses, getCourseDetails, getFullCourseDetails, getInstructorCourses } = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");
const { createCategory , getAllCategories, categoryPageDetails, getCategoryById, getCategoryByName } = require("../controllers/Category");
const { createRatingAndReviews, getAllRatingAndReviews, getAverageRatingAndReviews, getRatingAndReviewsByCourseID } = require("../controllers/RatingAndReviews");
const { auth, isAdmin, isStudent, isInstructor} = require("../middlewares/auth");

const { updateCourseProgress } = require("../controllers/CourseProgress")


// course related routers
router.post("/createCourse", auth,isInstructor, createCourse);
router.put("/updateCourse", auth, isInstructor , updateCourse);
router.put("/publishCourse", auth, isInstructor , publishCourse);
router.delete("/deleteCourse", auth, isInstructor , deleteCourse);
router.post("/getFullCourseDetails", auth , getFullCourseDetails); // only for instructor
router.get("/getInstructorCourses", auth, isInstructor , getInstructorCourses); // only for instructor
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.get("/getAllCourses" , getAllCourses);
router.post("/getCourseDetails", getCourseDetails);

// section related routers
router.post("/createSection", auth, isInstructor, createSection); 
router.put("/updateSection",auth, isInstructor, updateSection); 
router.delete("/deleteSection",auth, isInstructor, deleteSection); 

// subsection related routers

router.post("/createSubSection",auth, isInstructor, createSubSection);
router.put("/updateSubSection",auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection",auth, isInstructor, deleteSubSection);

// category related routers

router.post("/createCategory" , createCategory);
router.get("/getCategoryById" , getCategoryById);
router.get("/getCategoryByName" , getCategoryByName);
router.get("/getAllCategories" , getAllCategories);
router.post("/categoryPageDetails" , categoryPageDetails);

// rating and reviews routers

router.post("/createRatingAndReviews" ,auth, isStudent, createRatingAndReviews);
router.get("/getAllRatingAndReviews" , getAllRatingAndReviews);
router.post("/getAverageRatingAndReviews" , getAverageRatingAndReviews);
router.post("/getRatingAndReviewsByCourseID" , getRatingAndReviewsByCourseID);


module.exports = router;