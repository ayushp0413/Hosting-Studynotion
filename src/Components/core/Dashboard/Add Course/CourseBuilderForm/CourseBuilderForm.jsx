import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCourse, setEditCourse, setStep ,resetCourseState} from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import {MdAddCircleOutline} from "react-icons/md"
import {BiRightArrow} from "react-icons/bi"
import {toast} from "react-hot-toast"
import NestedView from './NestedView';
import { createSection, editCourseDetails, updateSection } from '../../../../../services/operations/courseDetailsAPI';

function CourseBuilderForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {course} = useSelector((state)=>state.course);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) =>state.auth);
  const [editSectionName , setEditSectionName] = useState(null);


  const {register, handleSubmit, setValue, getValues, formState :{errors}} = useForm();
  

  const cancelButtonHandler = () => {
    setEditSectionName(null);
    setValue("sectionName", "")
  }

  const goBack = () =>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    console.log("Inside the gotoNExt ");
    console.log("Course: ", course);

    
    if(course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));

  }

  const courseBuilderFormHandler = async(data) => {

    console.log("Course builder form data : ", data);
    setLoading(true);
    let result;

    if(editSectionName)
    {
       result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId : course._id
       }, token)
    }
    else
    {
        result = await  createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token)
    }

    // update values
    if(result)
    {
      console.log("result:" , result);

      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }  

    // remove loadding
    setLoading(false);
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    
    if(editSectionName === sectionId){
      cancelButtonHandler();
      return;
    }
    else 
    setEditSectionName(sectionId); // when click on edit icon of section
    setValue("sectionName", sectionName);
  }

  useEffect(() => {
    console.log("UPDATED");
    console.log(course);
  }, [course])





  return (
    <div>
      <form onSubmit={handleSubmit(courseBuilderFormHandler)} className='flex flex-col gap-6 px-4 py-5 w-full mt-8 mb-8 rounded-md bg-richblack-800'>
      <p className='text-lg font-semibold text-richblack-50'>Course Builder</p>
        
        <div className='flex flex-col'>
          <label htmlFor='sectionName'>Section Name <sup className='text-sm text-pink-800'>*</sup></label>
          <input
           type='text'
           name='sectionName'
           id='sectionName'
           placeholder='Add section Name'
           {...register("sectionName",{required:true})}
           className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
               outline-none px-3 placeholder:text-sm'
           />
        </div>

        {/* create  or edit section button */}
        <div className='flex gap-4 '>
            <IconBtn
              type='submit'
              text={ editSectionName ? "Edit Section Name " : "Create Section"}
              outline={true}
              customClasses={"text-black"}
              >
               <MdAddCircleOutline className='text-richblack-700' size={20}/>
              </IconBtn>

              {
                editSectionName && (
                  <button
                  type='button'
                  onClick={cancelButtonHandler}
                  className='text-md underline text-richblack-400'
                  >Cancel Edit</button>
                )
              }
        </div>

      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className='flex justify-end gap-x-3 mt-10 mb-12'>
        <button
        onClick={goBack}
        className=' bg-richblack-300 px-3 py-1 text-richblack-900 rounded-md cursor-pointer flex items-center '>
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}>
          <BiRightArrow className='-ml-2' />
        </IconBtn>

      </div>

    </div>
  )
}

export default CourseBuilderForm
