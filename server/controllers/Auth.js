const Users = require("../models/Users");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const optGenerator = require("otp-generator"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");
const {passwordUpdate} = require("../mail/templates/passwordUpdate");
require("dotenv").config();


// otp send krdo 
exports.sendOTP = async (req,res)=>{

    try
    {
        // fetch email from req body
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
                success: false,
                message: "Please entry email for sign up",
            })
        }

        // check email already exist or not
        const userPresent = await Users.findOne({email});
        if(userPresent){
            return res.status(401).json({
                success: false,
                message: "Email already exist, Please enter another email or login ",
            })
        }

        // otp generate kr lo

        var otp = optGenerator.generate(6,{
            upperCaseAlphabets:false,
            specialChars: false,
            lowerCaseAlphabets: false,
        })

        /// cheak in DB is this already exist or not, because this library wont assure unique OTP
        
        let otpPresent = await OTP.findOne({otp: otp});

        while(otpPresent){
            // generate another and check
            otp = optGenerator.generate(6,{
                upperCaseAlphabets:false,
                specialChars: false,
                lowerCaseAlphabets: false,
            });
            otpPresent = await OTP.findOne({otp: otp});
        }

        // here we have unique OTP
        // crate entry in DB

        // line 62 se phle PREMIDDLEWARE otp model ka chl jayega --> this.email and this.otp
        const otpPayload = { email, otp };
        const result = await OTP.create(otpPayload); // createAt deafult date
      
        res.status(200).json({
            success: true,
            message:"OTP sent successfully",
            otp,
        })

    }catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in OTP Generation"
        })
    }
}

// signup

exports.signUp = async(req,res)=> {

    try{
        // fetch details
        const { firstName, lastName, email, password, confirmPassword, accountType, otp, contactNumber } = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "please fill all details",
            })
        }

        // passwaord matching
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not matched, Please enter correct password",
            })
        }

        // exsisting user
        const exsistingUser = await Users.findOne({email});

        if(exsistingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exist",
            });
        }

        // OTP validate krlo , first fetch otp from DB

        const dbOPT = await OTP.findOne({email}).sort({createdAt:-1}).limit(1); // this will give most rececnt OTP

        if(!dbOPT) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        }
        else if( dbOPT?.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // hash password and store

        let hashPassword = await bcrypt.hash(password, 10);

        // object bana lo , tabhi to object ID store kr paynge
        const profileDetails = await Profile.create({
            gender : null,
            about : null,
            dateOfBirth: null,
            contactNumber: null,
        });

        const user = await Users.create({firstName, lastName, email, contactNumber, accountType, password:hashPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
            profile: profileDetails._id,
        });

        // idealy it also contains empty course, coursePRogress, etc...

        return res.status(200).json({
            success: true,
            message: "User registered successfully ",
            user,
        })

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to signUp ",
        })
    }
}

// login
exports.login = async (req,res)=> {
    try
    {
        // fetch details
        const { email , password} = req.body ;

        console.log(email, password);

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // email checking
        const exsistingUser = await Users.findOne({email}).populate("profile").exec();

        if(!exsistingUser) {
            return res.status(400).json({
                success: false,
                message: "User not registered with this email, Please enter valid email",
            });
        }

        
        const dbPassword = exsistingUser.password;
        // password match 
        const result = await bcrypt.compare(password, dbPassword);
        if(!result) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // all good
        // generate jwt token and send cookie

        const payload = {
            id: exsistingUser._id,
            email: exsistingUser.email,
            accountType : exsistingUser.accountType,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:'10h'});

        exsistingUser.token = token;
        exsistingUser.password = undefined;


        res.cookie("jwt", token, {httpsOnly: true, expiresIn: '48h'}).status(200).json({
            success: true,
            message: "User LoggedIn successfully",
            exsistingUser,
            token,
        });

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error in LogIn ",
        })
    }
}


// change password

exports.changePassword = async (req, res) => {
    try
    {

        const { email, oldPassword, newPassword} = req.body;

        const exsistingUser = await Users.findOne({email});
        if(!exsistingUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email, Password cannot changed",
            });
        }

        // comapre older password is right or wrong

        const result = await bcrypt.compare(oldPassword, exsistingUser.password);
        if(!result) {
            return res.status(400).json({
                success: false,
                message: "Your older password is incorrect.",
            });
        }

        //hash new password and  update password in DB
        let hashPassword = await bcrypt.hash(newPassword, 10);
        exsistingUser.password = hashPassword ;
        
        const updatedUser = await exsistingUser.save();  // existing user is an Object , usko save kr diya

        // send email that password changed
        const body = passwordUpdate(exsistingUser);
        const response = await mailSender(email, "StudyNotion - Password Changed", body);

        return res.status(200).json({
            success: true,
            message: "Password Changed successfully",
            updatedUser,
        })

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error in change Password ",
        })

    }
}



