import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformationForm/CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm';
import PublishCourse from './PublishCourse';

function RenderSteps() {

    const {step} = useSelector((state)=> state.course);
    console.log("step :", step);

    const steps = [
        {
            id:1,
            title:"Course Information",
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"Course Publish",
        },
    ]

    
  return (
        <div className='lg:w-[594px]'>

            {/* Steps logic */}
            <div className='flex justify-center items-center'>
            {
                steps.map((item) => (
                    <>
                        <div key={item.id} className='flex justify-center items-center '>
                            <div className={`${step === item.id ? 
                            "text-yellow-100 bg-yellow-800 border border-yellow-200" : 
                            "border border-richblack-600 bg-richblack-800 text-richblack-300"} 
                            w-[28px] aspect-square rounded-full flex items-center justify-center      
                            `}>
                            {
                                step > item.id ? (
                                    <div key={item.id} className='flex items-center justify-center text-yellow-25 bg-yellow-600 border border-yellow-200 aspect-square w-[28px] h-[26px] rounded-full'>
                                        <FaCheck className=' text-sm' />                                   
                                    </div>
                                    ) : (item.id)
                            }
                            </div>

                            <div className={`${step > item.id ? "text-yellow-25" : ""}`}>
                                {
                                    item.id < 3 ? (<div className='border-t border-dashed w-[205px]'></div>) : (<p></p>)
                                }
                            </div>
                        </div>
                    </>
                ))

            }
            
            </div>

            {/* name of steps */}
            <div className='flex justify-between items-center'>
            {
                steps.map((item) => {
                    return (
                        <>
                            <div key={item.id} className='flex justify-between '>
                                <p className='text-sm mt-1'>{item.title}</p>
                            </div>
                        </>
                    )
                })
            }
                
            </div>

            {/* Forms */}
            {
                step === 1 && (<CourseInformationForm />)
            }
            {
                step === 2 && (<CourseBuilderForm />)
            }
            {
                step == 3 && (<PublishCourse />)
            }
        </div>  
  )
}

export default RenderSteps
