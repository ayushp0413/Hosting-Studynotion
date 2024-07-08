import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { BsBackpack2Fill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn';
import { RiArrowDropDownLine } from "react-icons/ri";

function SidebarViewCourseDetails({setReviewModal}) {


    const [activeStatus, setActiveStatus] = useState(""); // lecture
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams(); // for CSS

    // data from slice
    const {
      courseSectionData,
      courseEntireData,
      completedLectures,
      totalNoOfLEctures,
    } = useSelector((state) => state.viewCourse);


    const {user} = useSelector((state) => state.profile);

    const addReview = () => {
      console.log("add review invoke")
        setReviewModal(true);
    }

    // for intial styling
    useEffect(() => {
      const setActiveFlags = () => {
        if(!courseSectionData.length){
          return;
        }

        const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
        setActiveStatus(courseSectionData?.[currentSubSectionIndex]?._id);

        const currentSubSectionId = courseSectionData[currentSectionIndex].subSection?.[currentSubSectionIndex]?._id;
        setVideoBarActive(currentSubSectionId);

      }

      setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])


  return (
    <div className='fixed top-15 left-0 z-20'>
        
        <div  className='flex min-w-[222px] max-w-[210px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 h-[100vh] bg-ricjblackk-800 py-10'>

            <div className='flex flex-row justify-around items-center '>
                <button 
                onClick={() => navigate("/dashboard/enrolled-courses")}
                className='bg-white w-[30px] h-[30px] aspect-square flex items-center justify-center rounded-full '
                ><BiArrowBack className='text-black' /></button>

                <button
                  className='px-3 py-2 bg-yellow-100 rounded-md text-richblack-800'
                  onClick={() => addReview()}>
                  Add Review  
                </button> 
            
            </div>
 
            {/* heading */}
            <div className='px-4 py-3 border-b mb-3 border-richblack-600'>
              <p className='text-richblack-25 font-bold'>{courseEntireData?.courseName}</p>
              <p className='text-sm font-bold'>{completedLectures?.length} / {totalNoOfLEctures}</p>
            </div>

       
            {/*  section sections and sub sections */}
            <div  className=''>
              {
                courseSectionData.map((section, index) => (
                  <div
                  onClick={() => setActiveStatus(section._id)}
                  key={index}
                  className='mb-1'
                  >

                    <div className='bg-richblack-700'>
                      <div className='flex justify-between bg-richblack-700 px-4 py-2 '>
                          <div className={`${activeStatus === section._id ?  "text-richblack-25 font-semibold tracking-wide " : " " } flex flex-col gap-4`}>
                              {section?.sectionName}
                          </div>
                          <div className={`${activeStatus === section._id ?  "" : "-rotate-90" } flex flex-col gap-4`}>
                            <RiArrowDropDownLine size={24}/>
                          </div>

                      </div>
                    </div>

                    {/* sub sections -- one visible at a time depending on activeStatus  */}
                    <div className=''>
                        {
                          activeStatus === section?._id && (
                            <div className=' mb-1'>
                            {
                              section?.subSection.map((lecture, index) => (
                                <div
                                className={`flex gap-2 px-2 py-1  ${
                                                        videoBarActive === lecture._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-richblack-900 text-white"} `
                                          }
                                key={index}
                                onClick={() => {
                                  navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${lecture?._id}`);
                                  setVideoBarActive(lecture?._id);
                                }} // show that video
                                >
                                  <input 
                                  type='checkbox' 
                                  checked={completedLectures.includes(lecture._id)}
                                  onChange={() => {}} // nothing 
                                  />
                                  <span>{lecture?.title}</span>
                                </div>
                              ))

                            }
                            </div>

                          )
                        } 
                    </div>


                  </div>
                ))
              }

            </div> 
        </div>

    </div>

  )
}

export default SidebarViewCourseDetails
