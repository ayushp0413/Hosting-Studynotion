const express = require("express");
const dbConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config(); 

const app = express();

// middlewares 
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}))


// routing
const course = require("./routes/Course");
const payments = require('./routes/Payments');
const profile = require('./routes/Profile');
const user = require('./routes/User');
const contact = require("./routes/Contact");



app.use("/api/v1/course", course);
app.use("/api/v1/payment", payments);
app.use("/api/v1/profile", profile);
app.use("/api/v1/auth", user);
app.use("/api/v1/reach", contact);


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is start at port no. ${PORT}`);
});


// connections
dbConnect();
cloudinaryConnect();



// default route
app.get("/", (req,res)=>{
    res.send(`<p> This is default page of Study Notion </p>`);
})