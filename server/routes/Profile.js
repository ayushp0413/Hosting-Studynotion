const express = require("express");
const { updateProfile, deleteProfile, getUserDetails , updateProfilePicture, getEnrolledCourses, getInstructorData} = require("../controllers/Profile");
const { auth, isStudent, isInstructor } = require("../middlewares/auth");
const router = express.Router();

// router

router.put("/updateProfile", auth, updateProfile);
router.put("/updateProfilePicture", auth, updateProfilePicture)
router.delete("/deleteProfile", auth, deleteProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses);
router.get("/getInstructorData", auth, isInstructor, getInstructorData);


module.exports = router;