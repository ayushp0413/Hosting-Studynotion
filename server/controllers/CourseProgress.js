const CourseProgess = require("../models/CourseProgess");
const SubSection = require("../models/SubSection");


// initial course progess at time of coursse buying in ZERO
exports.updateCourseProgress = async(req, res) => {

    try
    {
        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        // check subSection is valid or not
        const subSection = await SubSection.findById({_id : subSectionId})
        if(!subSection) {
            return res.status(404).json({error:"Invalid SubSection"});
        }

        // check for older entry ---- we insert empty courseprogess at buying the course
        let courseProgess = await CourseProgess.findOne({
            courseId: courseId,
            userId: userId,
        });

        if(!courseProgess){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            });
        }
        else
        {

            //re-visiting the video -- that was already marked
            if(courseProgess?.completedVideos.includes(subSectionId)){
                return res.status(200).json({
                    error:"Lecture already Viewed/Completed",
                });
            }

            // push th subsectioon

            courseProgess.completedVideos.push(subSectionId);
            console.log("Subsection pushed ");

        }

        // save to Db
        updatedCourseProgress = await courseProgess.save(); 

        console.log("Course Progress Save call Done , updated --->", updatedCourseProgress);
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })


    }catch(error)
    {
        console.error(error);
        return res.status(400).json({error:"Internal server Error in update Course progress"});
    }


}