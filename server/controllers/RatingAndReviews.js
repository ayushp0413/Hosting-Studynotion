const RatingAndReviews = require("../models/RatingAndReviews");
const Users = require("../models/Users");
const Course = require("../models/Course");
const { populate } = require("dotenv");
const { default: mongoose } = require("mongoose");


// create reating
exports.createRatingAndReviews = async (req, res) => {

  
    try{

        const {rating, review, courseId} = req.body;
        const userId = req.user.id;
    
        if(!rating || !courseId || !review) {
            return res.status(400).json({
                success: false,
                message:"Please give Rating and reviews",
            })
        };
   
        const course = await Course.findById({_id: courseId});
        console.log(course);

        if(!course) {
            return res.status(403).json({
                success: false,
                message:"Course not found for rating",
            })
        }

        // check user is enrollerd or not
        if(!(course.studentsEnrolled.includes(userId))) {
            return res.status(401).json({
                success: false,
                message:"User is not enrolled in the course, cannot give rating and reviews",
            })
        }

        /// another way of applying search filters :: Find couse whose id is given and also studentEnrollerd must have a userId 
        // $eq = equal , $elemMatch == element match to ..
        // const course = await Course.findOne({courseId, studentsEnrolled: {$elemMatch: {$eq:userId}}});

        
        // already to rating nahi diya hai ? (application specific validation hai)
        const alreadyReviewed = await RatingAndReviews.findOne({user: userId , course: courseId});
        if(alreadyReviewed) {
            return res.status(200).json({
                success:true,
                message:"User already feed rating and reviews"
            })
        }
        // create RaR 
        const ratingAndReview = await RatingAndReviews.create(
            {
                user: userId,
                rating: rating,
                reviews: review,
                course: courseId,
            }
        );

        // upadate course schema : insert rating and review in it
        
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId},
            {$push:{ratingAndReviews: ratingAndReview._id}},
            {new: true}
        );


        return res.status(200).json({
            success: true,
            message: "Rating and Reviews created successfully",
            ratingAndReview,
            rating,review,
            course: updatedCourseDetails,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message:"Unable to create Rating and reviews....",
            err,
        })
    }
}

// getAllRating total : used to show case on home footer page
exports.getAllRatingAndReviews = async (req, res) => {

    try{

        const allReviews =  await RatingAndReviews.find({})
                            .sort({rating: "desc"})
                            .populate({
                                    path:"user",
                                    select:"firstName lastName email image",
                                })
                            .populate({
                                path:"course",
                                select: "courseName",
                            }).exec();


        
        return res.status(200).json({
            success: true,
            message: "Rating and Reviews by course id fetched successfully",
            data:allReviews,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message:"Unable to fetch Rating and reviews for this course",
            err,
        })
    }
}

// getAverageRating for courseId
exports.getAverageRatingAndReviews = async (req, res) => {

    try{

        const {courseId} = req.body;
       
        if(!courseId) {
            return res.status(400).json({
                success: false,
                message:"Please give course id",
            })
        };


        // read more about aggregate method : this will return array
        const result = await RatingAndReviews.aggregate(
            [
                {
                    $match: {
                        course: mongoose.Types.ObjectId.createFromHexString(courseId),
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating"},
                    },
                }
            ]
        );

        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
       
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message:"Unable to fetch Rating and reviews for this course",
            err,
        })
    }
}

// getAllRating related to course Id
exports.getRatingAndReviewsByCourseID = async (req, res) => {

    try{

        const {courseId} = req.body;
       
        if(!courseId) {
            return res.status(400).json({
                success: false,
                message:"Please give course id",
            })
        };

        const course = await Course.findById({_id:courseId}).populate({
                                                    path:"ratingAndReviews",
                                                    populate:{path:"user",path:"course"}
                                                }).exec();
        if(!course) {
            return res.status(403).json({
                success: false,
                message:"Course not found for rating",
            })
        }

        // BUG check karna line 113
        const ratingAndReviews = course.ratingAndReviews; // this is an ID


        return res.status(200).json({
            success: true,
            message: "Rating and Reviews by course id fetched successfully",
            ratingAndReviews,
            courseName: course.courseName
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message:"Unable to fetch Rating and reviews for this course",
            err,
        })
    }
}