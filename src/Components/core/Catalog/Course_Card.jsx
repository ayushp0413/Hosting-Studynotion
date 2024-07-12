import React from 'react'
import RatingStars from "../../common/RatingStar"
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';


function Course_Card({course, height, size}) {

  const reviewCount = course?.ratingAndReviews?.length; 
  const avgRating = GetAvgRating(course?.ratingAndReviews).toFixed(1);
 
  return (
    <div className='flex flex-col gap-5rounded-lg'>
    <Link to={`/courses/${course?._id}`}>

        <div className='text-richblack-100'>
          <img src={course.thumbnail} alt='thumbnail' className={`${size === true ? "rounded-lg h-[360px] w-[590px] object-cover" : "rounded-lg h-[270px] w-[520px] object-cover" }`}/>
          <h3 className='text-xl '>{course.courseName}</h3>
          <p className='text-sm'>By {course.instructor.firstName} {course.instructor.lastName}</p>
        </div>
        <div className='flex flex-row gap-3 mt-2'>
            <span>{GetAvgRating(course?.ratingAndReviews).toFixed(1)}</span>
            <RatingStars Review_Count={GetAvgRating(course?.ratingAndReviews)}/>
          <p>{reviewCount} Rating</p>
        </div>
    </Link>
    </div>
  )
}

export default Course_Card
