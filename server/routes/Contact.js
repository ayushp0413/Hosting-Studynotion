const express = require("express");
const router = express.Router();


const {contact, getAllContactUsMessages} = require("../controllers/ContactUs");


router.post("/contact", contact);
router.get("/getAllMessages", getAllContactUsMessages);


module.exports = router 
