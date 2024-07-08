import React, { useEffect, useState } from 'react'
import { getAllReviews } from '../../../services/operations/courseDetailsAPI';
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination,EffectCoverflow}  from 'swiper/modules'
import RatingStars from '../../common/RatingStar';



function ReviewsSection() {


  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    const fetchAllReviews = async() => {
      try{
          const reviews = await getAllReviews();
          console.log("reviews: " , reviews);

          if(!reviews){
            return;
          }

          setReviews(reviews);


      }catch(err)
      {
          console.log("Could not fetched reviews!")
      }
    }


    fetchAllReviews();
  },[])


  return (
    <div className='text-richblack-25 w-11/12 max-w-maxContent mx-auto flex flex-col gap-12 '>  
        <h1 className='text-3xl font-bold w-full flex mb-6 justify-center mx-auto'>Reviews from the learners</h1>

        <div className='text-4xl font-semibold'>  
          <Swiper
          // slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={true}
          navigation={true}
          breakpoints={{
                      1024:{slidesPerView:3},
                      768 :{slidesPerView:2},
                      340 :{slidesPerView:1},
                      
                      
                    }}
          loop={true}
          autoplay={{
                      delay: 1500,
                    }}
          modules={[Autoplay, Navigation, FreeMode, Pagination]}
          className="mySwiper"
          >
          {
            reviews?.map((review, index) => (
              <SwiperSlide key={index}>
                <div className='border border-richblack-800 mb-12  bg-richblack-800 rounded-sm flex flex-col justify-start items-start px-5 lg:max-w-[320px] lg:max-h-[180px]'>
                  <div className='flex flex-row items-center gap-3 mt-3'>
                    <img className='w-[36px] h-[36px] aspect-square rounded-full ' src={review?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=UD`}></img>
                    <div className='flex flex-col items-start text-sm '>
                      <p className='text-sm'>{review?.user?.firstName || "User"} {review?.user?.lastName || "Deleted"}</p>
                      <p className='text-xs text-richblack-200'>{review?.course?.courseName || "---"}</p>
                    </div>
                  </div>
                  <div className='text-sm mt-5 max-w-[250px]'>{review?.reviews.length > 50 ? review?.reviews.substring(0,50) + "..." : review?.reviews}</div>
                  <div className='flex flex-row gap-2 text-md items-center justify-center  '>
                    <p className='text-[20px]'>{review?.rating.toFixed(1)}</p>
                    <RatingStars Review_Count={review?.rating}  />
                  </div>
                </div>

              </SwiperSlide>

            ))
          }
          </Swiper>    
        </div>
      
    </div>
  )
}

export default ReviewsSection

