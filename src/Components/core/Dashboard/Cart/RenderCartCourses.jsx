import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../../../slices/cartSlice';
import {RiDeleteBin6Line} from "react-icons/ri"
import { RiStarSFill } from "react-icons/ri";
import ReactStars from "react-rating-stars-component"
import RatingStars from '../../../common/RatingStar';
import GetAvgRating from '../../../../utils/avgRating';

function RenderCartCourses() {

    const {cart} = useSelector((state)=>state.cart);
    const {totalItems} = useSelector((state)=>state.cart);
    
    
    const dispatch = useDispatch();

  return (
    <div  className='mt-12'>
        <p  className='bg-richblack-700 rounded-md px-3 py-3 text-md'>{totalItems} Course(s) in cart </p>
        {
            cart.map((course,index)=>{
                return (
                <div className='flex flex-col lg:flex-row gap-2 mt-4'>
                    <div className='flex gap-2'>
                        <img src={course?.thumbnail} className='w-[160px] h-[140px] md:w-[200px] lg:w-[260px]  max-w-[260px] rounded-md' />
                        <div className='flex flex-col gap-1 text-richblack-300 text-sm'>
                            <p className='text-2xl font-semibold text-richblack-100'>{course?.courseName}</p>
                            <p className='max-w-[280px]'>{course?.courseDescription.length > 100 ? course?.courseDescription.substring(0,100) + "..." : course?.courseDescription}</p>
                            <div className='flex  items-center gap-2'>
                                <span>{GetAvgRating(course?.ratingAndReviews).toFixed(1)}</span>
                                <RatingStars Review_Count={GetAvgRating(course?.ratingAndReviews)}/>
                                <span>{course?.ratingAndReviews?.length} Rating</span>
                            </div>
                        
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                            className='flex gap-2 bg-richblack-800 border border-richblack-500 w-fit text-pink-600 p-2 rounded-md'
                         >
                         <RiDeleteBin6Line/>
                         <span>Remove</span>
                         </button>
                         <p className='text-yellow-200'>₹ {course?.price}</p>
                    </div>
                </div>
            )
            })
        }
    </div>
  )
}

export default RenderCartCourses
