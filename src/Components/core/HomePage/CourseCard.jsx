import React from 'react'
import {FaWpbeginner} from 'react-icons/fa'
import { TbBinaryTree2 } from "react-icons/tb";


// {/* cardData.heading === currentCard click ispr hua hai */}
export default function CourseCard( {cardData, currentCard, setCurrentCard}) {
  
    
  return (
    <div className={`flex flex-col gap-3  max-w-[18rem] p-5 ${cardData.heading === currentCard ? "bg-white text-black border-r-8 border-b-8 border-yellow-100" : "text-richblack-300 bg-richblack-800 " } transition-all duration-100 `}
    onClick={()=>{
        setCurrentCard(cardData.heading)
        }}
    >

        <div className='flex flex-col gap-y-2 '>
            <h2 className={` ${cardData.heading === currentCard ? "bg-white text-black" : "text-white bg-richblack-800 "} text-md font-semibold transition-all duration-100`}>{cardData.heading}</h2>
            <p className='text-richblack-400 text-sm'>{cardData.description}</p>
            <p className='h-[66px] border-b-2 border-b-richblack-700 border-dashed'></p>
        </div>

        <div className='flex flex-row justify-between'>

            <div className='flex flex-row items-center gap-x-2 text-richblack-300'>
                <FaWpbeginner className='text-lg'/>
                <p className='text-md'>{cardData.level}</p>
            </div>

            <div className='flex flex-row items-center gap-x-2 text-richblack-300'>
                <TbBinaryTree2 className='text-xl'/>
                <p className='text-md'>{cardData.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
}
