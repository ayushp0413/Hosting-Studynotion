import React from 'react'


const stats = [ 
    {
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    },
]


function StatsComponent() {
  return (
    <div>

        <section className='bg-richblack-800 mt-24 text-richblack-25 py-12 mb-12'>

            <div className='w-11/12 grid grid-cols-2 gap-y-5 place-content-center place-items-center md:grid-cols-4  mx-auto items-center gap-x-7'>
                {
                    stats.map( (data, index)=> {
                        return (
                            <div key={index} className='flex flex-col items-center justify-center'>
                                <h1 className='text-2xl font-bold'>{data.count}</h1>
                                <h4 className='text-richblack-300'>{data.label}</h4>
                            </div>
                        )
                    } ) 
                }
            </div>


        </section>
      
    </div>
  )
}

export default StatsComponent
