import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setCourse, setStep } from '../../../../../slices/courseSlice';
import { BsBackpack } from 'react-icons/bs';
import { BiArrowBack, BiSave, BiSolidSave } from 'react-icons/bi';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { editCourseDetails, publishCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

function PublishCourse() {

    const {token} = useSelector((state)=> state.auth);
    const {course} = useSelector((state)=> state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, setValue, getValues, formState:{errors} } = useForm();

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        }
        
    },[]);

    const goBack = () =>{
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async() => {

        if((course?.status === COURSE_STATUS.PUBLISHED) && getValues("public") === true
            || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false))
        {
            // course updated hai ya check box tick nahi hua hai
            goToCourses();
            return;
        }

        // api call to update the course status only
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);
        
        setLoading(true);
        const result = await publishCourseDetails(formData, token);
        // dispatch(setCourse(result)); // no need to set course , DB me hai vo 
        if(result) {
            setLoading(false);
            goToCourses();
        }

    }

    const onSubmit = async(data) => {
        console.log("data:" , data);
        handleCoursePublish();
    }

  return (
    <div>
        <div className='text-md bg-richblack-800 px-6 py-5 mt-12 border border-richblack-600 rounded-md flex flex-col gap-8'>
            <div className='text-2xl text-richblack-50'>Publish Settings</div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
                <div className='flex gap-2'>
                    <label htmlFor='public' className='flex items-center gap-3'>
                        <input
                        type='checkbox'
                        id='public'
                        name='public'
                        {...register("public", {required: true})} 
                        className="outlione-none border-gray-300 h-5 w-5 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                        />
                        <span className='text-richblack-300 text-xl'>Make this Course Public</span>
                    </label>
                </div>
                <div className='flex flex-row justify-between '>
                    <button
                     type='button'
                     disabled={loading}
                     onClick={goBack}
                     className='px-2 py-1 flex cursor-pointer justify-center gap-1 items-center bg-richblack-500 border-b border-richblack-800 rounded-md text-richblack-50'
                    >
                    <BiArrowBack />
                    Back</button>

                    <IconBtn 
                        text={"Save and Publish"}
                        disabled={loading}
                        type='submit'
                        customClasses={'cursor-pointer'}
                    />
                </div>

            </form>
        </div>
    </div>
  )
}

export default PublishCourse
