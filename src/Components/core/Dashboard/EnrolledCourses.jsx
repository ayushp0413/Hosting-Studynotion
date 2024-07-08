import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import IconBtn from '../../common/IconBtn';
import { Navigate, useNavigate } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar"


function EnrolledCourses() {

    const {token}  = useSelector((state) => state.auth);
    const [enrolledCourses , setEnrolledCourses] = useState(null); 
    const navigate = useNavigate();



    const getCourses = async() => {
        try
        {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response); 
            
        }catch(err)
        {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }
    
    useEffect(()=> {
        getCourses();  
    },[])
    
    console.log("enrolled courses : ", enrolledCourses);

    return (
    <div className='text-richblack-25 flex flex-col gap-y-4 mt-12 mb-12 ml-8'>

        <div className='text-3xl text-richblack-100'>Enrolled Courses</div>
        {
            !enrolledCourses ? (
                <div className='flex h-screen justify-center items-center'>
                    <div className="spinner"></div>
                </div>
            )
            : !enrolledCourses.length ? (
                <div className='flex flex-col justify-center items-center'>
                    <p className=' grid h-[10vh] w-full place-content-center text-richblack-5'>You have not enrolled in any course yet!!</p>
                    <IconBtn text="Buy Course"  onclick={()=>navigate("/category/web-devlopment")} />
                </div>
            )
            : (
                <div className='my-8 text-richblack-5'>
                    <div className='flex rounded-t-lg bg-richblack-500'>
                        <p className='w-[45%] px-5 py-3'>Course Name</p>
                        <p className='w-1/4 px-2 py-3'>Durations</p>
                        <p className='flex-1 px-2 py-3'>Progress</p>
                    </div>
                    {/* Cards shure hote h ab */}
                    {
                        enrolledCourses.map((course,index)=> (
                            <div 
                            className='flex items-center border border-richblack-700'
                            key={index}>
                                <div 
                                    className="flex flex-col sm:flex-row w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                    onClick={() => {
                                    navigate(
                                        `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                    }}
                                >
                                    <img  src={course.thumbnail}
                                        alt="course_img"
                                        className="h-20 w-20 rounded-lg object-contain"
                                    />
                                    <div className="flex max-w-xs flex-col gap-2">
                                        <p className="font-semibold">{course.courseName}</p>
                                        <p className="text-xs text-richblack-300">
                                            {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-1/4 px-2 py-3">
                                    {course?.totalDuration || "2:20min"}
                                </div>

                                <div className='flex w-1/5 flex-col gap-2 px-2 py-3'>
                                    <p>Progress: {course?.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course?.progressPercentage }
                                        height='8px'
                                        isLabelVisible={false}
                                        />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
      
    </div>
  )
}








export default EnrolledCourses
