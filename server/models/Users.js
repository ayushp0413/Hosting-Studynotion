const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true,
    },
    email :{
        type: String,
        required: true,
        trim: true,
    },
    password : {
        type : String,
        required: true,
    },
    accountType : {
        type: String,
        required:true,
        enum:["Admin","Student","Instructor"],
    },
    active: {
        type: Boolean,
        default: true,
    },
    profile :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Course",
            }
        ],
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    resetPasswordExpiry: {
        type: Date,
    },
    courseProgress :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ],
},
// // Add timestamps for when the document is created and last modified
{ timestamps: true }
);


module.exports = mongoose.model("Users",userSchema);