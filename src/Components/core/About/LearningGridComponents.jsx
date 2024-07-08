import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from "../../core/HomePage/Button"

const LearningGrid = [
    {
        order:-1,
        text:"World-Class Learning for",
        highlight: "Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText:"Learn More",
    },
    {
        order: 1,
        text:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order: 2,
        text:"Our Learning Methods",
        description:"The learning process uses the namely online and offline."

    },
    {
        order: 3,
        text:"Certification",
        description:"You will get a certificate that can be used as a certification during job hunting."
    },
    {
        order: 4,
        text:"Rating Auto-grading",
        description:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
    {
        order: 5,
        text:"Ready to Work",
        description:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    }

]

function LearningGridComponents() {
  return (
    <section className='w-11/12 max-w-maxContent mt-24 mb-24 mx-auto'>
        <div className='grid grid-cols-1 gap-y-5 lg:grid-cols-4 lg:gap-y-0'>
            {
                LearningGrid.map( (card, index) => {
                    return (
                        <div key={index} className={`${card.order === -1 && "lg:col-span-2"}
                                                    ${card.order % 2 == 1 && "bg-richblack-700"}
                                                    ${card.order % 2 == 0 && "bg-richblack-800" }
                                                    ${card.order === 3 && "lg:col-start-2"}`}>

                        {
                            card.order < 0 ? 
                            (<div className='flex flex-col justify-start items-start'>
                                <h1 className='text-3xl'>{card.text}</h1>
                                <HighlightText text={card.highlight}/>
                                <p className='text-sm mt-4 mb-4 text-richblack-500 max-w-[80%]'>{card.description}</p>
                                <CTAButton className="" active={true} linkto="/" >{card.btnText}</CTAButton>
                            </div>
                            ) : 
                            (<div className='text-richblack-25 h-[280px] p-6'>
                                <h1 className='text-xl font-bold'>{card.text}</h1>
                                <p className='text-sm text-richblack-300 mt-6'>{card.description}</p>
                            </div>)
                        }                                

                        </div>
                    )
                })
            }


        </div>
        
    </section>
  )
}

export default LearningGridComponents
