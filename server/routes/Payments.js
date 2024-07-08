const express = require("express")
const router = express.Router();

// router
const {capturePayment , verifySignature, sendPaymentSuccessEmail} = require("../controllers/Payments");
const { auth, isStudent , isAdmin, isInstructor  } = require("../middlewares/auth");

router.post("/capturePayment" ,auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifySignature);
router.post("/sendPaymentSuccessfullEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router ;