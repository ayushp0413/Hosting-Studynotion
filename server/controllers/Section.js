const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

// create section
// fetch section details from req body
// but each section can have sub section ---> wo related kase hai
// sectionName ==== title of subsection
// So Initially create only section ---> only with name and then when subsection is created we will update model of section
// okay section create kr do
// add section to course schema


exports.createSection = async(req,res) => {
    try
    {
        // fetch details
        const {sectionName, courseId} = req.body; // couse create ho chuka hai id aa jayegi
        if(!sectionName || !courseId) {
            return res.status(500).json({
                success: false,
                message: "Please fill all required properties"
            })            
        };


        // create section 
        const newSection = await Section.create({sectionName : sectionName});
        console.log(newSection);


        // update course model
            const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push: {
                    courseContent:newSection._id,
                }
            },
            {new : true}
        ).populate({
			path: 'courseContent',
			populate: {
			  path: 'subSection',
			}
		  })
		  .exec();


        console.log("create section: ", updatedCourseDetails);
        

        return res.status(200).json({
            success: true,
            message:"Section created successfully",
            section: newSection,
            course: updatedCourseDetails,
        });


    }
    catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to create section of course, Please try again"
        })
    }
}

// update section :
// fetch data
// validate
// update name (abhi bs name he hai)
// no need to update course this time--> bcz udr to ID rakhi hai vo to same he hogi


exports.updateSection = async(req, res) => {
    try
    {
        const {sectionName, sectionId, courseId} = req.body;
        if(!sectionName || !sectionId) {
            return res.status(500).json({
                success: false,
                message: "Please fill all required properties"
            })            
        };
    
        console.log("11111");

        // find and update section name
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
            {sectionName: sectionName},
            {new: true}
        );

        console.log("updated section : ",updatedSection);

        const updatedCourse = await Course.findById({_id: courseId})
        .populate({
			path: 'courseContent',
			populate: {
			  path: 'subSection',
			}
		  })
		  .exec();
        console.log("Updated course : ", updatedCourse);




        // no need to upadate course
        return res.status(200).json({
            success: true,
            message:"Section updated successfully",
            updatedSection: updatedSection,
            updatedCourse:updatedCourse,
        });

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to update section of course, Please try again"
        })
    }
}

// delete section

exports.deleteSection = async(req, res) => {
    try
    {
        const {sectionId, courseId} = req.body;   // route/:id
        if(!sectionId) {
            return res.status(500).json({
                success: false,
                message: "Please select the section to delete."
            }) 
        }

        // delete by id

        await Section.findByIdAndDelete({_id: sectionId});

        // delete section from course
        await Course.updateMany(
            {courseContent: sectionId},
            {$pull: {courseContent: sectionId}}
        )
        
        // to senf on Client side
        const updatedCourseAfterDelete = await Course.findById({_id: courseId})
        .populate({
			path: 'courseContent',
			populate: {
			  path: 'subSection',
			}
		  })
		  .exec();
          
        console.log("updated course after section delete: ", updatedCourseAfterDelete);


        return res.status(200).json({
            success: true,
            message:"Section deleted successfully",
            data:updatedCourseAfterDelete
        });
        
    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section of course, Please try again"
        })
    }
}

