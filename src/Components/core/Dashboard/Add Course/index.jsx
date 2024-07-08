import React from 'react'
import RenderSteps from './RenderSteps'
import { BsLightningCharge } from "react-icons/bs";

function AddCourse() {
  return (
    <>
        <div className='relative flex flex-row justify-center xl:justify-between mt-12 ml-8'>   
            
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl text-richblack-25'>Add Course</h1>
                <div className='mt-3'>
                    <RenderSteps />
                </div>
            </div>

            <div className='fixed top-30 right-[12rem] z-20 hidden xl:block  max-w-sm h-fit bg-richblack-800 px-10 py-8 text-richblack-200 rounded-lg -mr-36'>
                <div className='flex gap-1 items-center -mt-2 -ml-4 mb-2'>
                    <BsLightningCharge className='text-yellow-25'/>
                    <h2 className='text-richblack-25 text-xl font-bold'>
                        Course upload Tips
                    </h2>
                </div>
                <ul className='space-y-2 text-sm list-disc'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important.</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>

            </div>
        
        </div>
    </>
  )
}

export default AddCourse
