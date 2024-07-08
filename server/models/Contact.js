const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email:{
        type:String,
        trim: true,
        required:true,
    },
    phoneNo: {
        type: Number,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
        required: true,
    }
});


module.exports = mongoose.model("Contact",contactSchema);