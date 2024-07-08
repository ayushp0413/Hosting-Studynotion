import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import InstructorChat from './InstructorChat';
import { useNavigate } from 'react-router-dom';

function Instructor() {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [courseData,  setCourseData] = useState([]);
    const [instructorData, setInstructorData] = useState([]);


    useEffect(() => {
        const fetchInstructorData = async() => {

            setLoading(true);
            const response = await getInstructorData(token);
            const instructorCourses = await fetchInstructorCourses(token);
            
            console.log("RESPONSE BUDDY : ", response);
            console.log("RESPONSE BUDDY : ", instructorCourses);
            
            if(response) {
                setInstructorData(response);
            }

            if(instructorCourses){
                setCourseData(instructorCourses);
            }
            setLoading(false);
        }
        fetchInstructorData();
    },[])

    const totalStudentEnrolled = instructorData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0);
    const totalAmountGenerated = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);

  return (
    <div className='text-richblack-25 flex flex-col gap-y-4 mt-12 mb-12 ml-8'>
       {
            loading ? (<div className='flex h-screen justify-center items-center'>
                         <div className="spinner"></div>
                </div>) : 
            (   
            <div className='flex flex-col gap-10'>   

                <div className='flex flex-col gap-1'>
                    <h2 className='text-3xl font-bold'>Hi! {user?.firstName} 👋</h2>
                    <p className='text-md text-richblack-300 font-semibold'>Let's start something new</p>
                </div>

                <div className='flex flex-col justify-between lg:flex-row gap-y-2 gap-x-3'>
                    <InstructorChat courses={instructorData} />
                    <div className='bg-richblack-800 flex flex-col gap-6 py-6 rounded-md px-6 min-w-[30%]'>
                        <h1 className='text-richblack-25 text-2xl font-bold '>Statistics</h1>
                        <div>
                            <p className='text-richblack-200 font-bold tracking-wide'>Total Courses</p>
                            <p className='text-3xl text-richblack-200 font-extrabold'>{courseData.length}</p>
                        </div>
                        <div>
                            <p className='text-richblack-200 font-bold tracking-wide'>Total Students</p>
                            <p className='text-3xl text-richblack-200 font-extrabold'>{totalStudentEnrolled}</p>
                        </div>
                        <div>
                            <p className='text-richblack-200 font-bold tracking-wide'>Total Income</p>
                            <p className='text-3xl text-richblack-200 font-extrabold'>₹ {totalAmountGenerated}</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 mt-6 bg-richblack-800 rounded-md px-5 py-5'>
                    <div className='flex justify-between '>
                        <h2 className='text-xl text-richblack-100 font-bold'>Your Courses</h2>
                        <p className='text-yellow-100 cursor-pointer underline ' onClick={() => {navigate("/dashboard/my-courses")}}>View All</p>
                    </div>
                    <div className='flex flex-col gap-x-3 gap-y-2 lg:flex-row justify-between'>
                        { 
                            courseData.slice(0,3).map((course, index)=>(
                                <div key={index}>
                                    <div className=''>
                                        <img src={course?.thumbnail} width={300} />
                                        <div className='flex flex-col gap-1'>
                                            <p className=' text-richblack-100 text-[1rem] mt-2'>{course.courseName}</p>
                                            <div className='flex flex-row gap-2 text-sm text-richblack-300'>
                                                <p>{course?.studentsEnrolled.length} Students</p>
                                                <p> | </p>
                                                <p>Rs. {course?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))     
                        }
                    </div>

                </div>

            </div>
            )

       }
    </div>
  )
}

export default Instructor
