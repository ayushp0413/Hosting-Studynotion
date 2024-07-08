const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { imageUploadToCloudinary } = require("../utils/uploadImage");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
	try {
		
		const { sectionId, title, description, courseId } = req.body;
		const video = req.files.videoFile;

		// Check if all necessary fields are provided
		if (!sectionId || !title || !description || !video) {
			return res
				.status(404)
				.json({ success: false, message: "All Fields are Required" });
		}

		// Upload the video file to Cloudinary
		const uploadDetails = await imageUploadToCloudinary(
			video,
			process.env.FOLDER
		);


		

		// Create a new sub-section with the necessary information
		const subSectionDetails = await SubSection.create({
			title: title,
			timeDuration: `${uploadDetails.duration}`,
			description: description,
			videoUrl: uploadDetails.secure_url,
		});

		console.log(subSectionDetails);

		// Update the corresponding section with the newly created sub-section
		const updatedSection = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{ $push: { subSection: subSectionDetails._id } },
			{ new: true }
		).populate("subSection").exec();

		const updatedCourse  = await Course.findById({_id : courseId})
		.populate({
			path: 'courseContent',
			populate: {
			  path: 'subSection',
			}
		  })
		  .exec();
		
		console.log("Updtaed Course in cretae sub section :", updatedCourse);

		return res.status(200).json(
			{ success: true, data: updatedCourse}
		);
	} catch (error) {
		
		console.error("Error creating new sub-section:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};


//  updateSubSection
exports.updateSubSection = async (req, res) => {
	try {

		const { subSectionId, title, description , courseId} = req.body;		
		const video = req?.files?.video;

		var videoLink = "";
		if(!video || video === undefined) {
			const { video } = req?.body;
			videoLink = video;
		}

		console.log(subSectionId, title, description, videoLink, video);


		// Check if all necessary fields are provided
		if (!subSectionId || !title ||  !description || (!video && !videoLink)) {
			return res
				.status(404)
				.json({ success: false, message: "All Fields are Required" });
		}

		console.log(subSectionId, title, description, videoLink);


        const subSectionDetails = await SubSection.findById({_id: subSectionId});

        if(!subSectionDetails) {
            return res.status(400).json({
                success: false,
                message: "Subsection is not found",
            });
        }
		


		// Upload the video file to Cloudinary
		var videoUrl = "";
		var timeDuration = subSectionDetails?.timeDuration;
		if(video)
		{
			const uploadDetails = await imageUploadToCloudinary(video, process.env.FOLDER);
			videoUrl = uploadDetails.secure_url;
			timeDuration = uploadDetails?.duration;
		}
		else
		{
			videoUrl = videoLink;
		}
	
		console.log("Before Sub secrion call")
		// update subsection
		
		const updatedSubSection = await SubSection.findByIdAndUpdate(
			{ _id: subSectionId },
			{ 
                title: title,
                description: description,
                timeDuration: timeDuration,
                videoUrl: videoUrl,
            },
			{ new: true }
		);

		console.log("After Sub secrion call")


		const updatedCourse  = await Course.findById({_id : courseId})
		.populate({
			path: 'courseContent',
			populate: {
			  path: 'subSection',
			}
		  })
		  .exec();

		  console.log("updated course after update sub section :" , updatedCourse);

		// Return the updated  course in the response
		return res.status(200).json({
            success: true, 
            data : updatedCourse
		}
        );
	
    } catch (error) {
		return res.status(500).json({
			success: false,
			message: "Unable to update sub section",
			error: error.message,
		});
	}
};


// deleteSubSection
exports.deleteSubSection = async (req, res) => {
	try {

		const {subSectionId, sectionId, courseId} = req.body;

		// Check if all necessary fields are provided
		if (!subSectionId || !sectionId || !courseId) {
			return res
				.status(404)
				.json({ success: false, message: "Please select sub section for delete" });
		}

		// delete subsection : can this be delete from section also ??? sectionId lenge usme se subsectionId se findByIdAndDelete

	    await SubSection.findByIdAndDelete(
			{ _id: subSectionId },
        );

		// this will delete subsection from sections
		await Section.updateMany(
			{ subSection: subSectionId },
			{ $pull: { subSection: subSectionId } }
		  );

		const courseUpdated = await Course.findById({_id: courseId})
		.populate({
			path: 'courseContent',
			populate: {
			  path: 'subSection',
			}
		  })
		  .exec();


		// Return response
		return res.status(200).json({
            success: true, 
            message: "Sub section deleted successfully",
			data: courseUpdated,
        }
        );
	
    } catch (error) {
		return res.status(500).json({
			success: false,
			message: "Unable to update sub section",
			error: error.message,
		});
	}
};
