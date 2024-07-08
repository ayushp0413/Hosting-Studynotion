import React, { useEffect, useInsertionEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {RxCross1} from "react-icons/rx"
import Upload from "../CourseInformationForm/Upload"
import IconBtn from '../../../../common/IconBtn'
import toast from 'react-hot-toast'
import { setCourse } from '../../../../../slices/courseSlice'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'

function SubSectionModal({modalData, setModalData, add = false, view = false, edit = false}) {

  const {register, handleSubmit,  setValue, getValues , formState:{errors}} = useForm()
  
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const [loading, setLoading] = useState();

  useEffect(()=> {
    if(view || edit) {  // data show karna hoga
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  },[])


  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl ) {
          return true;
      }
      else return false;
  }

  const handleEditSubSection = async()=> {

    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("courseId", course._id);

    if(currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    else{
      formData.append("title", modalData.title);
    }

    if(currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    else{
      formData.append("description", modalData.description);
    }

    if(currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }
    else{
      formData.append("video", modalData.videoUrl);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if(result) {
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);

  }


  const onSubmit = async(data) => {

    if(view) {
      return;
    }

    if(edit){
      // check krlo pgle forma edit bhi huaa hai
      if(!isFormUpdated){
        toast.error("No changes made to form");
      }
      else
      {
        handleEditSubSection();
      }
      return;
    }

    // 100% add sub Section
    const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("courseId", course._id);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);
        
        setLoading(true);
      const result = await createSubSection(formData, token);
      if(result) {
        dispatch(setCourse(result))
      }

      setModalData(null);
      setLoading(false);
  }

  
  return (
    <div className='fixed inset-0 grid place-content-center bg-white bg-opacity-10 backdrop-blur-sm overflow-auto z-[1000] transition-all ease-out duration-1000 '>
        <div className='w-[39vw] bg-richblack-800 px-4 py-3 rounded-md'>
            {/* Heading */}
            <div className='flex flex-row justify-between'>
                <p className='text-md text-richblack-25'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={() => (!loading ? setModalData(null) : {})} >
                    <RxCross1 />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}
            className='mt-6 flex flex-col gap-6'
            >
                <Upload 
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl: null}
                    editData={edit ? modalData.videoUrl: null}
                />

                <div className='flex flex-col gap-2'>
                  <label className="text-sm text-richblack-200">Lecture Title</label>
                  <input
                    type='text'
                    name='lectureTitle'
                    id='lectureTitle'
                    placeholder='Enter Lecture Title'
                    {...register("lectureTitle", {required:true})}
                    className='w-full bg-richblack-700 border-b border-richblack-500 py-3 rounded-md px-3 outline-none placeholder:text-sm'
                  />
                   {errors.lectureTitle && (<span className='text-xs text-yellow-50'>
                        Lecture Title is required
                    </span>)}
                </div>

                <div>
                    <label className="text-sm text-richblack-200">Lecture Description</label>
                    <textarea 
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required:true})}
                        className='w-full min-h-[130px] bg-richblack-700 border-b border-richblack-500 
                        py-3 rounded-md px-3 outline-none placeholder:text-sm'
                    />
                    {
                        errors.lectureDesc && (<span className='text-xs text-yellow-100'>
                            Lecture Description is required
                        </span>)
                    }
                </div>

                {

                  !view && (
                    <div>
                      <IconBtn
                        text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                      />
                    </div>
                  )
                }
            </form>
        </div>
      
    </div>
  )
}

export default SubSectionModal
