import React, { useDebugValue, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { VscAdd } from "react-icons/vsc"
import CourseTable from './InstructorCourses/CourseTable';
import { resetCourseState } from '../../../slices/courseSlice';

function  MyCourses() {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    const getInstructorCourses = async() => {
        setLoading(true);
        try
        {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }catch(err)
        {
            console.error("error:", err.message);
            toast.error(err.message);
        }
        setLoading(false);
    }

    const handleAddButton = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/add-course");
    }

    useEffect(() => {
        getInstructorCourses();
    },[])


  return (
    <div>   
        {
            loading ? (<div className='flex h-screen justify-center items-center'>
                         <div className="spinner"></div>
                 </div>) 
            : 
            (  
            <div className='mt-12 mb-14 ml-8 flex items-center justify-between'>
            <h1 className="text-3xl font-medium text-richblack-25">My Courses</h1>
            
            <IconBtn text="Add Course"
                onclick={() => handleAddButton()}
            >
                <VscAdd />
            </IconBtn>
            </div>)
        }

      

        {
            courses && <CourseTable courses={courses} setCourses={setCourses} />
        }

    </div>

  )
}

export default MyCourses
