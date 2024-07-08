import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

function TimeLineSection() {

  const timeLine = [
    {
        logo: Logo1,
        heading: "Leadership",
        desc:"Fully committed to the success company"
    },
    {
        logo: Logo2,
        heading: "Responsibilty",
        desc:"Students will always be our top priority"
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        desc:"The ability to switch is an important skills"
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        desc:"Code your way to a solution"
    },
    

  ]

  return (
    <div className='mt-12 mb-16'>
     
        <div className='w-11/12 max-w-maxContent flex flex-col  lg:flex-row gap-x-[270px] gap-y-9 justify-center items-center mx-auto'>

        <div className='mx-auto'>
            {
                timeLine.map( (element , index) => {
                    return (
                        <div className=' flex flex-row gap-x-4 gap-y-4 py-2' key={index}>

                            <div className='flex flex-col justify-center items-center'>


                                <div className='w-[50px] h-[50px] rounded-full bg-white flex flex-col justify-center items-center '>
                                    <img src={element.logo} alt='logo'></img>
                                </div>

                                <div className={` ${index !== 3 ? "mt-4 bg-richblack-100 w-[0.67px] h-12": " "}`}></div>
                            </div>


                            <div className='flex flex-col text-md'>
                                <p className=' font-bold text-lg'>{element.heading}</p>
                                <p>{element.desc}</p>
                            </div>


                        </div>
                    )

                })
            }

        </div>

        <div className='relative lg:w-[50%] shadow-xl shadow-blue-100'>

            <img src={TimeLineImage} alt='timeline'></img>   

            <div className='max-w-[90%] absolute top-0 left-0  lg:translate-x-[12%] lg:translate-y-[200%]  xl:translate-x-[12%] xl:translate-y-[300%]    flex flex-row gap-x-6 gap-4 py-9 px-9 bg-caribbeangreen-700 text-white justify-center items-center  '>
                <div className='flex flex-row gap-x-4 items-center border-r   border-r-caribbeangreen-600 pr-3'>
                    <p className='font-bold text-4xl'>10</p>
                    <p className='text-md uppercase text-caribbeangreen-400'>Years of Experience</p>
                </div>
                <div className='flex flex-row gap-x-8 pl-3 items-center'>
                    <p className='font-bold text-4xl'>250</p>
                    <p className='text-md uppercase text-caribbeangreen-400'>Types of courses</p>
                </div>

            </div> 

        </div>

        </div>
      
    </div>
  )
}

export default TimeLineSection
