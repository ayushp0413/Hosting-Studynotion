const express = require("express")
const router = express.Router();

// router
const {auth} = require("../middlewares/auth");
const { login , signUp , sendOTP , changePassword} = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

// authentication routes

router.post("/login",login );
router.post("/signUp", signUp);
router.post("/sendOtp", sendOTP);
router.put("/changePassword", auth, changePassword);

// reset 

console.log(resetPasswordToken);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);

module.exports = router;