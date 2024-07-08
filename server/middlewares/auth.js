const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async(req,res,next)=>{
    try
    {
        // fecth token from req and authorize it
        const token = req.cookies.jwt 
                      || req.body.token 
                      || req.header("Authorization").replace("Bearer ","");

        console.log("Token of userrr : ", token);
        if(!token)
        {
            res.status(401).json({
                success:false,
                message:"Token Missing",
            });
        }
        // verify this token 
        try
        {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            console.log("User type : ",req.user.accountType);

        }catch(err)
        {
            res.status(500).json({
                success:false,
                message:"Token is invalid brother ",
            })
        }

        next();
     
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal sever error in auth middleware"
        })   
    }
}

exports.isStudent = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Student")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Student."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Student"
        })
    }
}


exports.isInstructor = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Instructor")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Instructor."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Instructor"
        })
    }
}

exports.isAdmin = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Admin")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Admin"
            })
        }
        next();

    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Admin"
        })
    }
}