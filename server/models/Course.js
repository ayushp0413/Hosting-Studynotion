const mongoose = require("mongoose");



const courseSchema = new mongoose.Schema({

    
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    whatWillYouLearn : {
        type: String,
    },
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    // since category of my course is of only one type na , to no need of array
    category :
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    tag: {
		type: [String],
		required: true,
	},
    thumbnail: {
        type: String,
    },
    studentsEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required: true,
        }
    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt: {
		type:Date,
		default:Date.now(),
	},
},
{ timestamps: true },
);


module.exports = mongoose.model("Course",courseSchema);