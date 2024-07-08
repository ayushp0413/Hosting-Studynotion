import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from "react-icons/fa" 

const InstructorSection = () => {
  return (
    <div className='mt-16 mb-0 mx-auto flex flex-col justify-between gap-x-24 gap-y-5 lg:flex-row lg:justify-between lg:items-center  '>

        <div className='flex flex-row gap-x-20 gap-y-5 md:justify-center'>
            <img className='z-10' src={Instructor} alt='instructor'></img>
            <div className='hidden lg:block absolute lg:w-[27rem] lg:h-[24rem] -z-1 bg-white -left-[2%] top-[5%]'> </div>
        </div>

        <div className='flex flex-col justify-start gap-x-12 gap-y-3 items-start  font-bold'>
            <p className='text-4xl'>Become an <HighlightText text={"Instructor"}/></p>
            <p className='text-md text-richblack-300 text-left'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            <div className='mt-8'>
                <CTAButton active={true} linkto={"/signUp"}>Start Teaching Today
                <FaArrowRight/>
                </CTAButton>
            </div>
        </div>
      
    </div>
  )
}

export default InstructorSection
