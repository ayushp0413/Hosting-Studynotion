import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import {buyCourse} from "../../../../services/operations/studentFeaturesApi"
import { useNavigate } from 'react-router-dom';

function RenderCartSummary() {

    const {total, cart} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course)=> course._id);
        buyCourse(token, courses, user, navigate, dispatch);
    }

  return (
    <div className='mt-12'>

        <div className='flex flex-col gap-7 bg-richblack-800 border border-richblack-500 rounded-md px-4 py-5 lg:p-12'>
            
            <div>
            <p>Total: </p>
            <p className='text-3xl text-yellow-100'> ₹ {total}</p>
            </div>

            <div>
                <IconBtn
                    text="Buy Now"
                    onclick={handleBuyCourse}
                    customClasses={"flex justify-center text-center font-semibold w-fit"}
                    
                />
            </div>

        </div>
      
    </div>
  )
}

export default RenderCartSummary
