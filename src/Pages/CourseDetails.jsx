import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApi';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import RatingStars from '../Components/common/RatingStar';
import GetAvgRating from '../utils/avgRating';
import { FaCalendar, FaEarthAsia } from 'react-icons/fa6';
import { formatDate } from '../services/formatDate';
import IconBtn from '../Components/common/IconBtn';
import { SiSharex } from 'react-icons/si';
import Course_Card from '../Components/core/Catalog/Course_Card';
import Footer from '../Components/common/Footer';
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';
import Error from './Error';
import { ACCOUNT_TYPE } from '../utils/constants';
import ConfirmationModal from "../Components/common/ConfirmationModal"
import copy from 'copy-to-clipboard';
import CourseAccordionBar from '../Components/core/Course/CourseAccordionBar';

function CourseDetails() {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {loading} = useSelector((state) => state.profile);

  const {courseId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [course, setCourse] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [dateTime, setDateTime] = useState();
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);

  

  const handleAddToCart = () => {
    if(!token)
    {
        setConfirmationModal({
          text1:"You are not Logged In",
        text2:"Please login to purchase the course",
        btn1Text:"Login",
        btn2Text:"Cancel",
        btn1Handler:() => navigate("/login"),
        btn2Handler:()=>setConfirmationModal(null),
        })
        return;
    }
    
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an Instructor, you cant buy a course");
      return;
    }
    
    dispatch(addToCart(course?.data?.course));

  }

  const handleBuyCourse = () =>{
    // services->operations me function call karega

    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an Instructor, you cant buy a course");
      return;
    }

    if(token){
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1:"You are not Logged In",
      text2:"Please login to purchase the course",
      btn1Text:"Login",
      btn2Text:"Cancel",
      btn1Handler:() => navigate("/login"),
      btn2Handler:()=>setConfirmationModal(null),
    })

  }

  const shareCourse = () => {
    copy(window.location.href);
    toast.success("Copied to Clipboard");
  }

  const avgRating = () => {
    if(course){
      setReviewCount(GetAvgRating(course?.data?.course?.ratingAndReviews));
      setDateTime(formatDate(course.data?.course?.createdAt));
    }
  }


  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(!isActive.includes(id)? isActive.concat(id) : isActive.filter((e)=> e!= id))
  }




  useEffect(() => {
    const getCourseFullDetails = async() => {
      try{

        const result = await fetchCourseDetails(courseId);

        if(result){
          console.log("printiong data: -->", result);
          setCourse(result);
        }

      }catch(err)
      {
        console.log("Could not fetch coursse details");
      }
    }
    getCourseFullDetails();
  },[courseId])

  useEffect(()=> {
    avgRating();
  },[course])

  useEffect(()=> {
    let lectures = 0;
    course?.data?.course?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures);

  },[course]);


  
  if(loading || !course) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <div className="spinner"></div>
      </div>
    )
}

  if(!course.success) {
      return (
          <div>
              <Error />
          </div>
      )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatWillYouLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    instructions,
  } = course.data?.course;


  return (
    <div className='w-full relative mt-14'>
       
          <div className='text-richblack-100 relative bg-richblack-800  xl:h-[410px] w-full flex flex-col items-center gap-y-5'>

            {/* LEFT PART */}
            <div className='w-10/12 mx-auto pt-24 flex flex-col gap-2'>
              <h1 className='text-3xl text-richblack-25 font-semibold'>{courseName}</h1>
              <p className='text-md text-richblack-200 max-w-sm lg:max-w-xl '>{`${courseDescription.length > 550 ? `${courseDescription.substring(0,540) + "...."}` : `${courseDescription}`}`}</p>        
              <div className='flex gap-3 mt-2'>
                  <p>{reviewCount.toFixed(1)}</p>
                  <RatingStars Review_Count={reviewCount}/>
                  <p>({ratingAndReviews.length} Reviews)</p>
                  <p>{studentsEnrolled.length} Student(s) Enrolled</p>
              </div>
              <p>Created by {instructor?.firstName} {instructor?.lastName}</p>
              <div className='flex items-center gap-5'>
                <div className='flex items-center gap-2'>
                  <FaCalendar />
                  <p>{dateTime}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <FaEarthAsia />
                  <p>English</p>
                </div>
              </div>
            </div>  

            {/* CARD MENU 1 flex col */}
            <div className='w-[350px] bg-richblack-700 rounded-md p-3 xl:hidden mb-10'>
              <div className='flex flex-col gap-3'>
                <img src={thumbnail} alt='thumbnail' className='w-full h-[210px] rounded-md object-covers ' />
                <p className='mt-3 text-2xl font-semibold'>Rs. {price}</p>

                <div className='flex flex-col justify-items-stretch gap-3 '>
                  <button
                  className='bg-yellow-100 px-3 py-2 text-richblack-800 font-semibold rounded-md'
                  onClick={
                    user && studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") :
                      (() => handleBuyCourse())
                  }
                  >
                  {
                      user && studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
                  }
                  </button>
                  {
                    (!studentsEnrolled.includes(user?._id)) && (
                      <button 
                      onClick={() => handleAddToCart()}
                      className='bg-richblack-800 px-3 py-2 text-white font-semibold rounded-md'
                      >
                      Add to Cart
                      </button>
                    )
                  }
                
                </div>

                <p className='text-sm text-center text-richblack-200'>30 days money-back guarantee</p>

                <div>
                  <p className='font-semibold'>This Course Includes : </p>
                  <p className='text-sm text-caribbeangreen-300'>
                    {whatWillYouLearn}
                  </p>
                </div>

                <div
                  onClick={() => shareCourse()}
                  className='flex gap-2 justify-center items-center mt-3 mb-3 cursor-pointer'>
                  <SiSharex />
                  <p>Share</p>
                </div>

              </div>
            </div> 

            {/* CARD MENU 2 */}
            <div className=' hidden xl:block xl:absolute top-10 right-36 w-[350px]  bg-richblack-700 rounded-md p-3'>
              <div className='flex flex-col gap-3'>
                <img src={thumbnail} alt='thumbnail' className='w-full h-[210px] rounded-md object-covers ' />
                <p className='mt-3 text-2xl font-semibold'>Rs. {price}</p>

                <div className='flex flex-col justify-items-stretch gap-3 '>
                  <button
                  className='bg-yellow-100 px-3 py-2 text-richblack-800 font-semibold rounded-md'
                  onClick={
                    user && studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") :
                      (() => handleBuyCourse())
                  }
                  >
                  {
                      user && studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
                  }
                  </button>
                  {
                    (!studentsEnrolled.includes(user?._id)) && (
                      <button 
                      onClick={() => handleAddToCart()}
                      className='bg-richblack-800 px-3 py-2 text-white font-semibold rounded-md'
                      >
                      Add to Cart
                      </button>
                    )
                  }
                
                </div>

                <p className='text-sm text-center text-richblack-200'>30 days money-back guarantee</p>

                <div>
                  <p className='font-semibold'>This Course Includes : </p>
                  <p className='text-sm text-caribbeangreen-300'>
                    {whatWillYouLearn}
                  </p>
                </div>

                <div
                  onClick={() => shareCourse()}
                  className='flex gap-2 justify-center items-center mt-3 mb-3 cursor-pointer'>
                  <SiSharex />
                  <p>Share</p>
                </div>

              </div>
            </div>  


          </div>


          <div className='text-white w-11/12 max-w-maxContent mx-auto flex flex-col items-center xl:items-start gap-6 mb-12'>
            
            <div className='w-2/3 border border-richblack-500 mt-12 p-3'>
              <h1 className='text-2xl text-richblack-50 font-semibold'>What will you Learn  </h1>
              <p className='text-md text-richblack-200 mt-2'>{whatWillYouLearn}</p>
            </div>

            <div className='text-richblack-50 flex flex-col gap-3 w-8/12 '>
              <h1 className='text-2xl font-semibold mt'>Course Content</h1>  
              
              <div className='flex justify-between '>
                <div className='flex gap-2 text-richblack-200'>
                  <p>{courseContent.length} section(s)</p>
                  <p>{totalNoOfLectures} lecture(s)</p>
                  <p>{course?.data?.totalDuration} total length</p>
                </div>
                <div className='cursor-pointer'>
                  <p className='text-md text-yellow-100' onClick={() => setIsActive([])}>Collpase all sections</p>
                </div>
              </div>

               {/* Course Details Accordion */}
              <div className="py-4">
                {courseContent?.map((section, index) => (
                  <CourseAccordionBar
                    course={section}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>

            </div>

            <div id='instructor' className='text-richblack-50 flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold mt'>Author</h1>
              <div className='flex gap-3 items-center'>
                <img src={instructor?.image} alt='instructor-img' className='w-[45px] h-[45px] aspect-square rounded-full'/>
                <div className='flex flex-col gap-1'>
                  
                   <h1 className='text-lg hover:text-yellow-200'>{instructor?.firstName} {instructor?.lastName}</h1>
                  
                  <p className='text-md text-richblack-300'>{`${instructor?.profile?.about?.length ? `${instructor?.profile?.about}` : `Instructor not added bio yet `}`}</p>
                </div>
              </div>
            </div>
          </div>


          <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center xl:items-start gap-6 mb-12 text-richblack-25'>
            <h1 className='text-3xl text-center font-semibold'>More Courses by {instructor?.firstName} {instructor?.lastName} </h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
            {
              instructor?.courses?.map((course, index) => (
                <Course_Card course={course} key={index} height={450} />
              ))
            }
            
            </div>
          </div>

      <Footer />

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}  />}
    </div>
  )
}

export default CourseDetails
