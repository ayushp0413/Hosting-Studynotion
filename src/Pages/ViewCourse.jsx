import React, { useEffect, useState } from 'react'
import SidebarViewCourseDetails from '../Components/core/ViewCourse/SidebarViewCourseDetails'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLEctures } from '../slices/viewCourseSlice'
import CourseReviewModal from '../Components/core/ViewCourse/CourseReviewModal'

function ViewCourse() {

  const {token} = useSelector((state) =>  state.auth);
  const {courseId} = useParams();
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);


  const setCoursSpecificDetails = async() =>{
      try
      {
        const courseData = await getFullDetailsOfCourse(courseId, token);
        console.log("CourseData at view Course: ", courseData);
        
        // update the slice
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
        dispatch(setCourseEntireData(courseData?.courseDetails));
        dispatch(setCompletedLectures(courseData?.completedVideos));

        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length;
        })

        dispatch(setTotalNoOfLEctures(lectures));
        

      }catch(err)
      {
          console.log("Could not fetch course data");
      }
  }


  useEffect(() => {
    setCoursSpecificDetails();
  })
    
  return (
    <div className='relative text-richblack-200 flex flex-row mt-14'>
        <SidebarViewCourseDetails setReviewModal={setReviewModal} />
        <div className='w-full flex justify-center items-center ml-[150px]'>
            <div className='w-9/12 max-w-maxContent mx-auto flex flex-col h-full '>
                <Outlet />
            </div>
        </div>
      {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal}  />)}
    </div>
  )
}

export default ViewCourse
