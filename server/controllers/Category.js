const { default: mongoose } = require("mongoose");
const { ObjectId }= require("mongodb");
const Category = require("../models/Category");


// create 
exports.createCategory = async (req, res) => {
    try {

        const {name, description} = req.body;
        if(!name) {
            return res.status(400).json({
                success: false,
                message: "Category name required",
            })
        }

        const categoryDetails = await Category.create({name, description});
    
        return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
            categoryDetails,
		});

    }catch(err)
    {
        return res.status(500).json({
			success: false,
			message: err.message,
		});
    }
}

//getAllCAtegory

exports.getAllCategories = async (req, res) => {
	try {
		const allCategories = await Category.find(
			{},
			{ name: true, description: true }
		);
        if(!allCategories) {

            return res.status(404).json({
                success: false,
                message: "No Category Found",
            });
        }
		return res.status(200).json({
			success: true,
			data: allCategories,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


// categoryById 
exports.getCategoryById = async (req, res) => {
	try {

        const {categoryId} = req.body;
        const cid = mongoose.Types.ObjectId.createFromHexString(categoryId);
        if(!cid) {
            return res.status(401).json({
                success: false,
                message: "Category Id required"
            })
        }

		const category = await Category.find({_id: cid});
        if(!category) {
            return res.status(404).json({
                success: false,
                message: `No Category Found with id ${categoryId}`,
            });
        }
		return res.status(200).json({
			success: true,
			data: category,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


// categoryByName 
exports.getCategoryByName = async (req, res) => {
	try {

        const {name} = req.body;
        if(!name) {
            return res.status(401).json({
                success: false,
                message: "Category name required"
            })
        }

		const category = await Category.find({name : name});
    
        if(!category || category.length==0) {
            return res.status(404).json({
                success: false,
                message: `No Category Found with name ${name}`,
            });
        }
        
		return res.status(200).json({
			success: true,
			data: category,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};



// when user search for category : what we server 
// searchedCategoryCourse
// some different Courses
// topCourses

exports.categoryPageDetails = async (req, res) => {

    try{

        const {categoryId} = req.body;
        console.log("Categry ", categoryId);

        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: [
                {path: "instructor"},
                {path: "ratingAndReviews"}],   
          })
          .exec()

        if(!selectedCategory) {
            console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
        }

        // no results for searched category 
        // if (selectedCategory.courses.length === 0) {
		// 	console.log("No courses found for the selected category.");
		// 	return res.status(404).json({
		// 		success: false,
		// 		message: "No courses found for the selected category.",
		// 	});
		// }

        //1.
        const selectedCourses = selectedCategory.courses;

        
		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate({
            path: "courses",
            match: { status: "Published" },
          populate: [
                {path: "instructor"},
                {path: "ratingAndReviews"}],
         
          })
          .exec()

        //2.
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}

        // 3. top selling 

        const allCategories = await Category.find({})
        .populate({
            path: "courses",
            match: { status: "Published" },
          populate: [
                {path: "instructor"},
                {path: "ratingAndReviews"}],
          })
         
          .exec() // returns array

        const allCourses = allCategories.flatMap((category) => category.courses); // flatMap is similar to arr.map function , but each category may contains multiple courses so we used flatMap 

        // but where is this sold property ???? 
        const mostSellingCourses = allCourses.sort( (a, b) => b.sold - a.sold).slice(0,10);
      
		res.status(200).json({
            success: true,
            data: {
                selectedCategory: selectedCategory,
                selectedCourses: selectedCourses,
                differentCourses: differentCourses,
                mostSellingCourses: mostSellingCourses,
            },
		});
        
    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Page category error API ",
        });
    }
}