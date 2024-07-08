const  {instance} = require("../config/razorpay");
const Users = require("../models/Users");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");
const {mailSender} = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgess = require("../models/CourseProgess");

exports.capturePayment = async (req, res) => {
    
    try
    {

        const {courses} = req.body;
        const userId = req?.user?.id;

        console.log("nsdlnksfnlndffb: ", courses, userId);
        
        if(!courses || !userId) {
            return res.status(401).json({
                success: false,
                message: "Please provide course(s)"
            })
        }

        let totalAmount = 0;

        for(const courseId of courses) 
        {
            let course;
            try
            {
                course = await Course.findById({_id: courseId});
                if(!course) 
                {
                    return res.status(401).json({success:false, message: "Could not find course"});
                }

                // ky aye course already purchased to nahi --> userId wale student k dwara
                const uid =  new mongoose.Types.ObjectId (userId);
                if(course.studentsEnrolled.includes(uid))
                {
                    return res.status(200).json({success:false, message:"Student already enrolled in this course." })
                }

                totalAmount += course.price;

            }catch(err)
            {
                console.log(err);
                return res.status(500).json({success:false, message:err.message});
            }

        }

        console.log("Initiating order:.........");
        // order initiate Razorpay
        const currency ="INR";
        const options = {
            amount : totalAmount *100,
            currency,
            receipt: Math.random(Date.now()).toString(),
        }

        try
        {   
            const paymentResponse = await instance.orders.create(options);
            res.json({
                success:true,
                message:paymentResponse,
            }) 

        }catch(err)
        {
            return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
        }

    }catch(err)
    {
        return res.status(500).json({
            succes: false,
            message: "Capture payment failed",
        })
    }
}

exports.verifySignature = async(req, res) => {
    try
    {

        console.log("verify : ", req?.body );

        const razorpay_order_id =  req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;

        const courses = req?.body?.courses;
        const userId = req?.user?.id;

        if(!razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature || !courses || !userId) {
                return res.status(200).json({success:false, message:"Payment verifivcation Failed"});
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) 
        {
            // enrolll student
            await enrollStudents(courses, userId, res);
            return res.status(200).json({success:true, message:"Payment Verified"});
        }

    }catch(error)
    {
        return res.status(200).json({success:"false", message:"Payment Failed"});
    }
}

const enrollStudents= async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }
    for(const courseId of courses)
    {
        try
        {
            // course me student ko update kr diya
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push:{studentsEnrolled:userId}},
                {new: true}
            )

            if(!enrolledCourse) {
                return res.status(500).json({success:false,message:"Course not Found"});
            }

            // Craete a courseProgess with progress ZERO
            const courseProgess = await CourseProgess.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],

            })



            // find student and updated ites course field
            const enrolledStudent = await Users.findByIdAndUpdate(
                {_id: userId},
                {$push:{courses: courseId}}
                ,{new:true})

            // updatation done , student ko email send krdo
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )    
        }catch(error)
        {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}


exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req?.user?.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await Users.findById({_id: userId});
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved - StudyNotion`,
             paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}




// for the single item buying 
// // capture Payment : order create
// exports.capturePayment = async (req, res)=> {
    
//     try{

//         const {courseId} = req.body;
//         const userId = req.user.id;
//         if(!courseId) {
//             return res.status(401).json({
//                 success:false,
//                 message:'Please provide valid course ID',
//             })
//         };

//         // ye course valid hai ya nahi : 

//         const course = await Course.findById(courseId);
//         if(!course) {
//             return res.status(401).json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         // user valid hai, course valid hai
//         // but check user already enroll to nahi hai course me

//         // we have course object usme studentEnrolled array me jisme userId store hai

//         const uid = new mongoose.Types.ObjectId.createFromHexString(userId);
//         console.log("User id from payload: ", userId);
//         console.log("User id  after type OBJECTID: ", uid);

//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }

//         // now its all ok 
//         // create order

//         const options = {
//             amount: course.price * 100,
//             currency: "INR",
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: courseId,
//                 userId: userId
//             }
//         }
//         // initiate payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });

//     }catch(err)
//     {
//         res.status(500).json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
// }


// // verify Signature

// exports.verifySignature = async (req, res) => {

//     const webhookSecret = "12345678";
//     const signature = req.header["x-razorpay-signature"];

//     // webhooksecret ko encryt krlo

//     const shasum = crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");


//     if(signature!==digest) {
//         return res.status(400).json({
//             success: false,
//             message: "Payment not authorized."
//         })
//     }

//     console.log("Payment Authorized");
//     // perform actions , alot course and and enty in user schema and course schema

//     const {courseId , userId} = req.body.payload.payment.entity.notes;

//     try
//     {
//         //find course and update studentEnrolled
//         const enrolledCourse = await Course.findByIdAndUpdate({_id: courseId},
//             {$push:{studentsEnrolled: userId}},
//             {new: true}
//         );

//         if(!enrolledCourse) {
//             return res.status(500).json({
//                 success:false,
//                 message:'Course not Found',
//             });
//         }
//         console.log(enrolledCourse);

//         // find student and then update course in it
//         const enrolledStudent = await Users.findByIdAndUpdate({_id: userId}, 
//             {$push: {courses:enrolledCourse._id}},
//             {new: true}
//         );
//         console.log(enrolledStudent);

//         //send confirmation mail to user
//         const email = enrolledStudent.email;
//         let subject = "Congratulations from StudyNotion";
//         let courseName = enrolledCourse.courseName;
//         let name = enrolledStudent.firstName+" "+ enrolledStudent.lastName;
//         let body = courseEnrollmentEmail(courseName,name);
//         const mailResponse = mailSender(email, subject, body);

//         console.log(mailResponse);

//         return res.status(200).json({
//             success:true,
//             message:"Signature verified and Course Added"
//         });

//     }catch(err)
//     {
//         return res.status(500).json({
//             success:false,
//             message:'Unable to verify payment signature',
//         });

//     }



// }

