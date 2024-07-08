import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import IconBtn from "../../../../common/IconBtn"
import {setCourse, setStep} from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from '../../../../../utils/constants';
import {toast } from "react-hot-toast";
import ChipTagsInput from './ChipTagsInput';
import Upload from './Upload';

function CourseInformationForm() {

    const { register, handleSubmit , setValue, getValues , formState:{errors}} = useForm();
    
    const {token} = useSelector((state)=> state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [courseCategories , setCourseCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedTag, setSelectedTag] = useState([]);


    // fetch all categories and set to state variable
    const getCatagories = async() => {

        setLoading(true);
        const categories = await fetchCourseCategories();
        console.log("Categories: ",categories[0]?.name);
        // categories array me saari categories hai
        if(categories.length > 0)
        {
            setCourseCategories(categories);
        }

        setLoading(false);
    }


    useEffect(()=>{
        
        // if editcourse redux state variable true hai to form me ye values set ho jayenge
        if(editCourse) {
            setValue("courseTitle", course.courseName);        // now they become key value pair
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatWillYouLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }
        
        getCatagories();
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();

        if( currentValues.courseTitle !== course?.courseName ||
            currentValues.courseShortDesc !== course?.courseDescription ||
            currentValues.coursePrice !== course?.price ||
            currentValues.courseCategory !== course?.category ||
            currentValues.courseTags !== course?.tag ||
            currentValues.courseBenefits !== course?.whatWillYouLearn ||
            currentValues.courseRequirements !== course?.instructions ||
            currentValues.courseImage !== course?.thumbnail
        )
        return true;
        else return false;
    }



    // when click on next button
    const handleCourseInformationForm = async(data) => {

        console.log("DATA FORM : ", data);

        if(editCourse)
        {
            if(isFormUpdated()) 
            {
                const currentValues = getValues();
                console.log("current values :", currentValues);
                const formData = new FormData();

                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                else{
                    formData.append("courseName", currentValues.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                else{
                    formData.append("courseDescription", currentValues.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                else{
                    formData.append("price", currentValues.coursePrice);
                }


                if(currentValues.courseBenefits !== course.whatWillYouLearn) {
                    formData.append("whatWillYouLearn", data.courseBenefits);
                }
                else{
                    formData.append("whatWillYouLearn", currentValues.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                else{
                    formData.append("category", currentValues.courseCategory);
                }

                if(currentValues.courseTags !== course.tag) {
                    formData.append("tag", data.courseTags);
                }
                else{
                    formData.append("tag", currentValues.courseTags);
                }

                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnail" , data.courseImage);
                }
                else{
                    formData.append("thumbnail", currentValues.courseImage);
                }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                else{
                    formData.append("instructions", currentValues.courseRequirements);
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result) {
                    console.log("result bhi aaaya edit course : ", result);
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else {
                toast.error("NO Changes made so far");
            }
            return;
        } 
    

        // create new course

        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatWillYouLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("tags", data.courseTags);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnail" , data.courseImage);
        formData.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await addCourseDetails(formData,token);
        if(result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
    }



  return (
    <form className='flex flex-col gap-6 px-4 py-5 w-full mt-8 mb-8 rounded-md bg-richblack-800' onSubmit={handleSubmit(handleCourseInformationForm)}>

        <div className='flex flex-col gap-1'>
            <label htmlFor='courseTitle' className='text-xs text-richblack-25'>Course Title <sup className='text-pink-700'>*</sup></label>
            <input
              id='courseTitle'
              name='courseTitle'
              type='text'
              {...register("courseTitle",{required:true})}
              placeholder='Enter course title'
              className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
               outline-none px-3 placeholder:text-sm'
            />
            {
                errors.courseTitle && (<span className='text-yellow-25 text-xs'>Enter Course Title </span>)
            }

        </div>

        <div className='flex flex-col gap-1'>
            <label htmlFor='courseShortDesc' className='text-xs text-richblack-25'>Course Description <sup className='text-pink-700'>*</sup></label>
            <textarea 
              id='courseShortDesc'
              name='courseShortDesc'
              type='text'
              placeholder='Enter course description'
              {...register("courseShortDesc",{required:true})}
              className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
               outline-none px-3 min-h-[130px] placeholder:text-sm'
            />
            {
                errors.courseShortDesc && (<span className='text-yellow-25 text-xs'>Enter Course Description </span>)
            }

        </div>   

        <div className=' relative flex flex-col gap-1'>
            <label htmlFor='coursePrice' className='text-xs text-richblack-25'>Course Price <sup className='text-pink-700'>*</sup></label>
            <HiOutlineCurrencyRupee className='absolute text-xl top-[1.87rem] left-1' /> 
            <input
              id='coursePrice'
              name='coursePrice'
              type='number'
              {...register("coursePrice",{
                required:true,
                valueAsNumber:true,
                })}
              placeholder='Enter course pice'
              className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
               outline-none px-8 placeholder:text-sm'
            />
            {
                errors.coursePrice && (<span className='text-yellow-25 text-xs'>Enter Course Price </span>)
            }

        </div> 

        <div className='flex flex-col gap-1'>
            <label htmlFor='courseCategory' className='text-xs text-richblack-25'>Course Category <sup className='text-pink-700'>*</sup></label>
            <select
                 id='courseCategory'
                defaultValue=""
                {...register("courseCategory", {required:true})}
                className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
               outline-none px-3'
            >
            <option value="" disabled className='text-sm'>Choose a Category</option>
            {
                !loading && courseCategories.map((category, index) => (
                    <option key={index} value={category?._id}>
                        {category.name}
                    </option>
                ))
            }




            </select>

        </div>

        
         <ChipTagsInput
            name="courseTags"
            label="Tags"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />   

         {/* UploadThumbnailInput    */}
         <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
        />


         <div className='flex flex-col gap-1'>
            <label htmlFor='courseBenefits' className='text-xs text-richblack-25'>Course Benefits <sup className='text-pink-700'>*</sup></label>
            <textarea 
              id='courseBenefits'
              name='courseBenefits'
              type='text'
              placeholder='Enter Benefites of course'
              {...register("courseBenefits",{required:true})}
              className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
               outline-none px-3 min-h-[130px] placeholder:text-sm'
            />
            {
                errors.courseBenefits && (<span className='text-yellow-25 text-xs'>Mention Course Benefites </span>)
            }

        </div> 

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />

        {/* Next button */}

        <div className='flex justify-end gap-3'>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300 rounded-md px-3 text-richblack-800'
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <IconBtn
                text={!editCourse ? "Next" : "Save Changes"}
                type='submit'                                   // form handler 
            />
        </div>
        
    </form>      
    
  )
}

export default CourseInformationForm
