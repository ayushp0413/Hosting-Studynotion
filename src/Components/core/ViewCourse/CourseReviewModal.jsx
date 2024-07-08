import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';
import { CgCross } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';



function CourseReviewModal({setReviewModal}) {
    

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state)=> state.viewCourse);


    const {register, setValue, handleSubmit, formState:{errors}} = useForm();
    useEffect(()=> {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[]);


    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId : courseEntireData?._id,
                rating : data.courseRating,
                review : data.courseExperience,
            },token
        );
        setReviewModal(false);
    }
  
  
  
  
    return (
        <>
        <div className='fixed inset-0 grid place-items-center z-[1000] overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='flex flex-col bg-richblack-800 rounded-lg overflow-hidden max-w-[650px] w-[540px]'>
           
            {/* Modal header */}
            <div className='flex justify-between bg-richblack-700 p-4 '>
                <p className='text-richblack-25 font-bold'>Add Review</p>
                <button 
                onClick={() => setReviewModal(false)}
                >
                <IoClose size={20}/>
                </button>
            </div>

            {/* Modal Body */}
            <div className='flex flex-col justify-center items-center mt-3'>

                <div className='flex flex-row items-center gap-3 '>
                    <img 
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square  w-[50px] rounded-full object-cover'
                    />
                    <div className='flex flex-col justify-center'>
                        <p className='text-richblack-50 font-bold'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-sm text-richblack-100'>Posting Publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-3 flex flex-col items-center w-full'>

                    <ReactStars 
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div className='w-11/12'>
                        <label htmlFor='courseExperience' className='text-richblack-50'>
                            Add Your Experience<sup className='text-yellow-100'>*</sup>
                        </label>
                        <textarea 
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                            className='rounded-md bg-richblack-700 p-3 min-h-[130px] w-full placeholder:text-sm outline-none border-b border-richblack-600'
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience 
                                </span>
                            )
                        }
                    </div>
                    {/* Cancel and Save button */}
                    <div className='flex gap-4 justify-end w-11/12 mb-5'>
                        <IconBtn 
                            text="Save"
                            customClasses={"py-[0.5]"}
                        />
                        <button
                        className='text-black bg-richblack-400 rounded-md px-2'
                        onClick={() => setReviewModal(false)}
                        >
                            Cancel
                        </button>
                    </div>


                </form>

            </div>
        </div>
    </div>
        </>
  )
}

export default CourseReviewModal
