import React from 'react'
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa" 

function CodeTTB({heading, subheading,ctabtn1, ctabtn2 }) {
  return (
    <div className='flex lg:w-[50%] flex-col gap-8 text-bold font-inter text-left'>
        
        <div className='text-4xl font-semibold'>
            {heading }
        </div>

        <div className='text-richblack-600 font-bold text-md'>
            { subheading}
        </div>

        <div className='mt-10 flex flex-row gap-6 mb-6'>
            <div className='flex flex-row  gap-3 justify-center items-center'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>{ctabtn1.text}
                <FaArrowRight/>
                </CTAButton>
            </div>
            <div>
               <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>{ctabtn2.text}</CTAButton>
            </div>
            
        </div>

    </div>
  )
}

export default CodeTTB
