import React from 'react'
import Course_Card from './Course_Card'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination,EffectCoverflow}  from 'swiper/modules'



function CourseSlider({courses}) {
  return (
    <div>
        <div>
            {
                courses?.length <= 0 ? (<p className='text-2xl text-richblack-500'>No courses Found !!</p>) : 
                (
                    <>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                            }}
                            pagination={{
                            clickable: true
                            }}
                            navigation={true}
                            className="mySwiper"
                            slidesPerView={'auto'}
                            modules={[Autoplay,Pagination,Navigation,EffectCoverflow]}
                            breakpoints={{
                                1024:{slidesPerView:3},
                                700:{slidesPerView:2},
                                640:{slidesPerView:1},

                            }}
                    >
                        {
                            courses?.map((course, index) => (
                                <SwiperSlide  key={index}>
                                    <Course_Card course={course} height={320} size={false} />
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default CourseSlider
