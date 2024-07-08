import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from "../../../core/Dashboard/Cart/RenderCartCourses"
import RenderCartSummary from "../../../core/Dashboard/Cart/RenderCartSummary"


function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);


  return (
    <div className='flex flex-col gap-y-4 mt-12 mb-12 ml-8'>
        <h1 className='text-3xl text-richblack-50'>Your Cart</h1>
        {
            total > 0 ? 
            (<div className='w-full text-xl text-richblack-100 flex flex-col lg:flex-row gap-x-10  gap-y-5'>
          
                <RenderCartCourses/>
                <RenderCartSummary />
            </div>) : 
            (<div>Your Cart is Empty!</div>)
        }

    </div>
  )
}

export default Cart
