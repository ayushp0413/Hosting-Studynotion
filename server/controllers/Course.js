const Users = require("../models/Users");
const Course = require("../models/Course");
const CourseProgess = require("../models/CourseProgess");
const { imageUploadToCloudinary }  = require("../utils/uploadImage");
const Category = require("../models/Category");
const { populate } = require("dotenv");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { convertSecondsToDuration } = require("../utils/secToDuration");


// create course
exports.createCourse = async (req, res) => {
    try{

        // fetch details
        const {courseName, courseDescription , price, whatWillYouLearn, category, tags, status, instructions} = req.body;
        const thumbnail = req.files.thumbnail;

        // validate
        if(!courseDescription || !courseName || !price || !whatWillYouLearn  ||  !category || !tags || !thumbnail) {
            return res.status(401).json({
                success: false,
                message: "Please fill all details",
            })
        }
    
        if(!status || status === undefined) {
            status = "Draft";
        }

        // category validate
        const categoryDetails =  await Category.findById({_id: category});
        if(!categoryDetails) {
            return res.status(401).json({
                success: false,
                message: "Invalid Category",
            })
        }

        // fetch instructor details --> to store in Db
        // 100% user is Instructor bcz middlwware aaya hoga 
        // or udr payload me user.id me hai

        const userId = req.user.id; // isko he add krdo schema me

        const instructorDetails = await Users.findById({_id: userId});
      
        if(!instructorDetails || instructorDetails.accountType!="Instructor") {
            return res.status(401).json({
                success: false,
                message:"Instructor details not found"
            })
        }


        // all goood
        // upload image to cloudinary
        
        const thumbnailDetails = await imageUploadToCloudinary(thumbnail, process.env.FOLDER);
        
        // create entry of new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            thumbnail: thumbnailDetails.secure_url,
            whatWillYouLearn: whatWillYouLearn,
            instructor: instructorDetails._id,
            tag: tags,
            category: categoryDetails._id,
            status: status,
            instructions:instructions,
        });

        
        // add course to user scchema of instructor

        await Users.findByIdAndUpdate({_id: instructorDetails._id},
            {
                $push: {  // kyoki array hai
                    courses: newCourse._id,
                }
            },
            {new : true}
        );

        // update Category 
        await Category.findByIdAndUpdate({_id: categoryDetails._id},
            {
                $push : {
                    courses: newCourse._id,
                }
            },
            { new : true, }
        );

        return res.status(200).json({
            success:true,
            message:"Course Created successfully",
            data:newCourse,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Course Creation failed."
        })
    }
}

// update the course status only
exports.publishCourse = async(req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body;

    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // Update only the fields that are present in the request body ---> only status was updated
    course.status = updates?.status;
    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "profile",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

     

    res.json({
      success: true,
      message: "Course updated(Published) successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
  
}

// update course
exports.updateCourse = async (req, res) => {
    try{

        // fetch details   
        const {courseName, courseDescription , price, whatWillYouLearn, tag, category, status, instructions, courseId} = req.body;
        const thumbnail = req?.files?.thumbnail;

        if(!thumbnail || thumbnail === undefined){
            const { thumbnail } = req.body;
            var thumbnailLink = thumbnail;
        }

    
        // validate
        if(!courseDescription || !courseName || !price || !whatWillYouLearn || !tag || !category || !courseId) {
            return res.status(401).json({
                success: false,
                message: "Please fill all details",
            })
        }

        if(!thumbnail && !thumbnailLink) {
            return res.status(401).json({
                success: false,
                message: "Please provide thumbnail for course",
            })
        }

       
        // category validate
        const categoryDetails =  await Category.findById({_id: category});
        if(!categoryDetails) {
            return res.status(401).json({
                success: false,
                message: "Invalid Category",
            })
        }
     
        
        const courseDetails = await Course.findById({_id : courseId});
        if(!courseDetails) {
            return res.status(401).json({
                success: false,
                message: "Invalid Course",
            })
        }
  
        
        // fetch instructor details --> to store in Db
        // 100% user is Instructor bcz middlwware aaya hoga 
        // or udr payload me user.id me hai

        const userId = req.user.id; // isko he add krdo schema me

        const instructorDetails = await Users.findById({_id: userId});
        
        if(!instructorDetails || instructorDetails.accountType!="Instructor") {
            return res.status(401).json({
                success: false,
                message:"Instructor details not found"
            })
        }

        // all goood
        // upload image to cloudinary
        var thumbnailUrl = "";
        if(thumbnail) // update thumbnail hua hai
        {
            const thumbnailDetails = await imageUploadToCloudinary(thumbnail, process.env.FOLDER);
            thumbnailUrl = thumbnailDetails.secure_url;
        }
        else
        {
            thumbnailUrl = thumbnailLink;
        } 

           // create entry of new Course

            courseDetails.courseName = courseName;
            courseDetails.courseDescription = courseDescription;
            courseDetails.price = price;
            courseDetails.thumbnail = thumbnailUrl;
            courseDetails.whatWillYouLearn = whatWillYouLearn;
            courseDetails.instructor = instructorDetails._id;
            courseDetails.tag = tag;
            courseDetails.category =  categoryDetails._id;
            courseDetails.status =  status;
            courseDetails.instructions = instructions;

            await courseDetails.save();

        return res.status(200).json({
            success:true,
            message:"Course Updated successfully",
            data: courseDetails,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Course Updation failed."
        })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled;

      for (const studentId of studentsEnrolled) {
        await Users.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent;
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId);
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }


// getAll courses
exports.getAllCourses = async (req, res) => {

    try{

        const courses = await Course.find({}, {
            courseName:true, courseDescription:true, 
            instructor:true, price:true,
            ratingAndReviews: true, studentsEnrolled: true, thumbnail: true
        })
        .populate("instructor")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Data fetchced successfully",
            courses,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to get all courses",
            error: err,
        })
    }
}

// getCourseDetails : By ID full populated
exports.getCourseDetails = async (req, res) => {

    try{

        const {courseId} = req.body;
        const course = await Course.findOne({_id: courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate: {
                                                 path:"profile",                                                                                                  
                                                },
                                            },
                                        )
                                        .populate(
                                          {
                                              path:"instructor",
                                              populate: {
                                               path:"courses", 
                                               populate: "instructor",                                                                                              
                                              },
                                          },
                                      )
                                        .populate("category")
                                        .populate("ratingAndReviews")
                                        .populate(
                                            {
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                    select: "-videoUrl",
                                                }
                                            }
                                        ).exec();


        if (!course) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0;
        course.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })

        // conersion
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);


        return res.status(200).json({
            success: true,
            message: "Data fetchced successfully",
            data: {
              course,
              totalDuration,
            },
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to fetch course details",
            error: err,
        })
    }
}


// fully populated
exports.getFullCourseDetails = async (req, res) => {
    try {

      const {courseId} = req?.body;
      const userId = req.user.id;

      const courseDetails = await Course.findOne({
        _id: courseId,
      }).populate({
          path: "instructor",
          populate: {
            path: "profile",
          },
        })
        .populate({
          path: "instructor",
          populate: {
            path: "courses",
            populate:"instructor",
            
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();

        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
        
      let courseProgressCount = await CourseProgess.findOne({
        courseId: courseId,
        userId: userId,

      })
  
    
      // calculating total duration
      let totalDurationInSeconds = 0;
      courseDetails?.courseContent.forEach((section) => {
        section.subSection.forEach((subsec) => {
          const timeDurationInSeconds = parseInt(subsec.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })


      const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
  
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id;
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      })
      .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          }
      })
      .exec()
      
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }