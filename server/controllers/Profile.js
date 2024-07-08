const Profile = require("../models/Profile");
const User = require("../models/Users");
const { imageUploadToCloudinary } = require("../utils/uploadImage");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Course = require("../models/Course");
const CourseProgess = require("../models/CourseProgess");


// since we created dummy Profile at time of SignUp --> No need for cretaeProfile controller
// also we have playload ---> req.user.id can be fetched

exports.updateProfile = async (req, res) => {
    try{

        // fetch personal data
        const {dateOfBirth, about, gender, contactNumber} = req.body.formData;
        console.log("In update profile controller : ", gender, dateOfBirth, contactNumber, about);


        const userId = req.user.id; 
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "User invalid, Please try again"
            })
        };




        // find user --> usme profileID mil jaygi or update kr do
        const userDetails = await User.findById({_id: userId});
        console.log("User details at update profile ",userDetails);

        const profileID = userDetails.profile; // udr ID he store hai
        console.log("Profile Id : ",profileID);
        
        //find object of profile with it update and then save in DB or directly findByIDandUPdate

        // find Object 
        const profileObject = await Profile.findByIdAndUpdate(
            {_id: profileID},
            {
                gender: gender,
                dateOfBirth: dateOfBirth,
                about: about,
                contactNumber: contactNumber,
            },
            {new: true}        
        );

        console.log("Final : ", profileObject)


        return res.status(200).json({
            success: true,
            message:"Profile Updated successfully",
            profile: profileObject,
            userDetails,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to update profile. Please try again."
        })
    }
}

exports.getUserDetails = async (req, res)=> {
    try{
        // fetch id
        const userId = req.user.id;
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found for delete"
            })
        };

        const userDetails = await User.findById(userId).populate("profile").exec();
        console.log("User Details ", userDetails);

        return res.status(200).json({
            success: true,
            message: "User info fectched sucessfully",
            userDetails,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch profile. Please try again."
        })
    }
}

// update profile Picture

exports.updateProfilePicture = async (req, res) => {
    try{

        console.log("Display picture: ", req?.files);
        
        const profilePicture = req.files?.displayPicture;
        console.log("Profile picture from contaroller : ", profilePicture);

        if(!profilePicture) {
            return res.status(401).json({
                success: false,
                message: "Please provide profile picture"
            }) 
        };



        const userId = req.user.id; 
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "User invalid, Please try again"
            })
        };

        // upload to cloudinary
        const profilePictureUrl = await imageUploadToCloudinary(profilePicture, process.env.FOLDER);
        // find user --> usme profileID mil jaygi or update kr do
        console.log("Upload to cloud");

        const userDetails = await User.findByIdAndUpdate({_id: userId}, {image: profilePictureUrl.secure_url} ,{new : true});
        console.log("User details at update profile ",userDetails);

        return res.status(200).json({
            success: true,
            message:"Profile Picture Updated successfully",
            userDetails,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to update profile picture . Please try again."
        })
    }
}


// delete account

exports.deleteProfile = async (req, res) => {
    try{
        // fetch id
        const userId = req.user.id;
        // validate
        const userDetails = await User.findById(userId);
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found for delete"
            })
        };
        
        // profile delete krdo : fetch profile id and then delete
        const profileId = userDetails.profile;
        await Profile.findByIdAndDelete({_id: profileId});

        // unenroll this user from course 
        // if this is a student ---> studentEnroll me se hataoo [testing]
        // if this is a instructor ----> do nothing {NO DONT DELETE} [testing]
        
        // let updateEnroll=[];

        // userDetails.courses.forEach( (course)=> {
        //     updateEnroll = course.studentsEnrolled.filter((uid)=>{
        //         uid!=userId;
        //     })
        // })


        // user delete kr do 
        await User.findByIdAndDelete({_id: userId});

        return res.status(200).json({
            success:true,
            message:"Your Account deleted"
        })

    }catch(err)
    {
        return re.status(500).json({
            success: false,
            message: "Unable to update profile. Please try again."
        })
    }
}



// getEnrolled courses

// CODE FOR PROGRESS COUNT 
exports.getEnrolledCourses = async (req, res) => {
   
    try {
        const userId = req.user.id;

        let userDetails = await User.findById({
            _id: userId,
        })
        .populate({
            path: "courses",
            populate:{
                path:"courseContent",
                populate:'subSection'
            }
            
        }
    )
    .exec();


       // for progress Counter 
       userDetails = userDetails.toObject();
       var SubsectionLength = 0;
 
      
       for (var i = 0; i < userDetails?.courses?.length; i++)   // loop the courses 
       {

         let totalDurationInSeconds = 0;
         SubsectionLength = 0;
 
         for (var j = 0; j < userDetails.courses[i].courseContent.length; j++)  // loop on sections
         {
           totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
           
           userDetails.courses[i].totalDuration =  convertSecondsToDuration(totalDurationInSeconds); // dont have field in schema
           SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
         }
         

         let courseProgressCount = await CourseProgess.findOne({
              courseId: userDetails?.courses[i]?._id,
              userId: userId,
         })    
         
         console.log("RAM", courseProgressCount);

         if(!courseProgressCount) {

            return res.status(500).json({
                success: false,
                message: "Course Progress not found"
            })
         }
 
         console.log("length iof completed videos : ", courseProgressCount?.completedVideos.length);
         courseProgressCount = courseProgressCount?.completedVideos.length;
         
         if (SubsectionLength === 0) userDetails.courses[i].progressPercentage = 100; // dont have field
         else {
           // To make it up to 2 decimal point
           const multiplier = 100;
           userDetails.courses[i].progressPercentage =
             Math.round(
               (courseProgressCount / SubsectionLength) * 100 * multiplier
             ) / multiplier;
         }
       }

        
        if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};




// instructor profile dashborad realted data
exports.getInstructorData = async(req, res) => {

    try
    {
        const userId = req.user.id;
        const courseDetails = await Course.find({instructor: userId});

        // create object for each course with necessary data

        const courseData = courseDetails.map((course) => {

            const totalStudentEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = course.price * totalStudentEnrolled;


            const courseDataWithStats = {
                _id : course.id,
                courseName: course?.courseName,
                courseDescription: course?.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats
        })

        res.status(200).json({
            success: true,
            courses: courseData,
        })


    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server erroe in instructor data ",
        })
    }

}