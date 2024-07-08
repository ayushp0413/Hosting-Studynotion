import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from "../../../assets/Images/Know_your_progress.svg"
import CompareWithOthers  from "../../../assets/Images/Compare_with_others.svg";
import  Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "../HomePage/Button"

function LearnLanguageSection() {
  return (
    <div className='w-11/12 mx-auto  mt-36 mb-20 flex flex-col items-center justify-center '>

        <div className='flex flex-col justify-center items-center'>

            <div className='text-4xl font-bold text-center'>
                Your swiss knife for <HighlightText text={"learning any language"}/>
            </div>
            <div className='text-md text-richblack-500 lg:max-w-[850px] mt-3 text-center'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

        </div>

        <div className='flex flex-col mt-4 lg:flex-row gap-3'>
            <img src={knowYourProgress} alt='knowyourprogess' className='-mr-32' />
            <img src={CompareWithOthers} alt='comarewithothers' />
            <img src={Plan_your_lessons} alt='planyourlessons' className='lg:-ml-36'/>
        </div>

        <div className='mb-24'>
            <CTAButton  active={true} linkto={"signUp"} >Learn More</CTAButton>
        </div>

      
    </div>
  )
}

export default LearnLanguageSection
