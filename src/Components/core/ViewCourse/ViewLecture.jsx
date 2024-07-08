import React, { useRef , useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import {updateCompletedLectures} from "../../../slices/viewCourseSlice"
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import {AiFillPlayCircle} from "react-icons/ai"
import IconBtn from '../../common/IconBtn';


function ViewLecture() {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {courseSectionData, courseEntireData, completedLectures,} = useSelector((state)=>state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);


  // setting the flags
  useEffect(()=> {

    const setVideoSpecificDetails = async() => {
        
        if(!courseSectionData.length)
            return;
        if(!courseId && !sectionId && !subSectionId) {
            navigate("/dashboard/enrolled-courses");
        }
        else {
            //let's assume k all 3 fields are present

            const filteredData = courseSectionData.filter(
                (section) => section._id === sectionId
            )

            const filteredVideoData = filteredData?.[0].subSection.filter(
                (data) => data._id === subSectionId
            )

            setVideoData(filteredVideoData[0]);
            setVideoEnded(false);

        }
    }
    setVideoSpecificDetails();

  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
  }
  else {
      return false;
  }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    if(currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
          return true;
      }
    else {
      return false;
    }

    
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

    if(currentSubSectionIndex !== noOfSubSections - 1) {
        //same section ki next video me jao
        const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
        //next video pr jao
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
        //different section ki first video
        const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
        const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
        ///iss voide par jao 
        navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }

  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

    if(currentSubSectionIndex != 0 ) {
        //same section , prev video
        const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1];
        //iss video par chalge jao
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
        //different section , last video
        const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
        const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
        const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
        //iss video par chalge jao
        navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }

  }

  const handleLectureCompletion = async() => {
    try{
      
      setLoading(true);
      const response = await markLectureAsComplete({
        courseId: courseId,
        subSectionId: subSectionId,
      },token);


      if(response) {
        dispatch(updateCompletedLectures(subSectionId)); 
      }
      setLoading(false);

    }catch(err)
    {
        console.log("Could not fecth course progress")
    }
  }

  return (
    <div className='realtive mt-12 mb-12 overflow-hidden'>
    <h1>
      {videoData?.title}
    </h1>
    {
      !videoData ? (<div>
                      No Data Found
                  </div>)
      : (
          <Player
              ref = {playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
               >

               <div className='absolute top-10 left-10 z-[1000] w-full'>  
               {
                  videoEnded && (
                      <div className='flex flex-col gap-12 '>

                          <div className='flex flex-col justify-between gap-4 w-11/12  '>

                          <div className='flex justify-between'>
                          {
                                  !completedLectures.includes(subSectionId) && (

                                    <button
                                      disabled={loading}
                                      onClick={() => handleLectureCompletion()}
                                      className=' rounded-md bg-yellow-50 text-xl text-black px-3 py-1 ' 
                                    >
                                    Mark as Watched
                                    </button>
                          
                                  )
                              }

                              <button
                                  disabled={loading}
                                  onClick={() => {
                                      if(playerRef?.current) {
                                          playerRef.current?.seek(0);
                                          playerRef.current?.slickPlay();
                                          setVideoEnded(false);
                                      }
                                  }}
                                  className=' rounded-md bg-yellow-50 text-xl text-black px-3 py-1 ' 
                                  >
                                    Rewatch
                                    </button>

                          </div>
                                  

                           <div className='flex justify-between'>
                           {
                                !isFirstVideo() && (
                                  <button
                                  disabled={loading}
                                  onClick={()=> {goToPrevVideo()}}
                                  className=' rounded-md bg-yellow-50 text-xl text-black px-3 py-1'
                                  >
                                      Prev
                                  </button>
                              )}
                              {
                                !isLastVideo() && (
                                  <button
                                  disabled={loading}
                                  onClick={()=>{goToNextVideo()}}
                                  className=' rounded-md bg-yellow-50 text-xl text-black px-3 py-1'
                                  >
                                      Next
                                  </button>
                              )}
                           </div>       

                          
                              

                   
                             
                        
                          </div>

                      </div>
                  )
              }

               </div>

             
          </Player>
      )
    }
  </div>
  )
} 

export default ViewLecture
