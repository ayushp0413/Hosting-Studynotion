import React from 'react'
import { TypeAnimation } from 'react-type-animation'

function CodeBlock({code, codeColor }) {
  return (

    <div className='z-10 relative h-fit w-[100%]  text-left  flex flex-row text-[15px] py-4 lg:w-[500px] bg-[#2d28283e] border-richblack-400 border-[1px]'> 


        {/* gradient */}
        {/* <div className='circle2'></div> */}


        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-1 font-bold font-mono ${codeColor} pr-2`}>
          <TypeAnimation
            sequence={[code,500,""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            cursor={true}
            style={
                {
                    whiteSpace: "pre-line",
                    display:"block",
                    fontFamily:"",
                }
            }
          />
        </div>

    </div>
  )
}

export default CodeBlock