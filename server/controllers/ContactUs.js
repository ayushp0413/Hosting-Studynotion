const Contact = require("../models/Contact");


// create course
exports.contact = async (req, res) => {

    try{

        // fetch details
       const {email , firstname, lastname, phoneNo, message} = req.body;
       // this route is open anyone can access it .
       // no need of userId
     
        if(!email || !firstname || !lastname || !phoneNo || !message ) {
            return res.status(401).json({
                success: false,
                message: "Please fill all details",
            })
        }


      // create entry of new Course
        const newContact = await Contact.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phoneNo: phoneNo,
            message: message
        });

    
        return res.status(200).json({
            success:true,
            message:"Message saved successfully",
            data: newContact,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Contact failed."
        })
    }
}


exports.getAllContactUsMessages = async (req, res) => {
    try{

       const allMessages = await Contact.find({});
    
        return res.status(200).json({
            success:true,
            message:"Message fetched successfully",
            data:newCourse,
        })

    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "failed to fetch messages."
        })
    }
}




