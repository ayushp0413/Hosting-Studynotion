import React from 'react'
import { FaArrowRight } from "react-icons/fa" 
import { Link } from 'react-router-dom';
import  HighlightText  from "../Components/core/HomePage/HighlightText";
import CTAButton from '../Components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeTTB from '../Components/core/HomePage/CodeTTB';
import CodeBlock from '../Components/core/HomePage/CodeBlock';
import LearnLanguageSection from '../Components/core/HomePage/LearnLanguageSection';
import TimeLineSection from '../Components/core/HomePage/TimeLineSection';
import InstructorSection from '../Components/core/HomePage/InstructorSection';
import ReviewsSection from '../Components/core/HomePage/ReviewsSection'; 
import CatalogCards from '../Components/core/HomePage/CatalogCards';
import Footer from '../Components/common/Footer';


export const Home = () => {
  return (

    <div className='z-10'>
        {/* section 1 */}
        <div className='relative mx-auto w-11/12 mt-14 max-w-maxContent text-white flex flex-col justify-center items-center'>
          
          {/* Instructor button */}
          <Link to={"/signUp"}>
              <div className="rounded-full max-auto mt-16 bg-richblack-800 py-[14px] px-[2.8rem]
              border-[0.1px] border-richblack-900 border-b-richblack-400 w-fit hover:scale-95 hover:bg-richblack-900 hover:border-richblack-400  transition-all duration-300 ">
                <div className='p-[6px, 18px, 6px, 18px] flex flex-row gap-[8px] items-center' >
                  <p className='text-[#999DAA] font-inter font-bold'>Become an Instructor</p>
                  <FaArrowRight className='text-[#999DAA]'/>
                </div>
              </div>
          </Link>

          {/* Hero content */}
          <div className='flex flex-col gap-6 mx-auto justify-center items-center'>
            <div className='text-4xl font-bold mt-14'>
              <p className=''>Empower your Future with <HighlightText text={"Coding Skills"}/></p>
            </div>

            <div className='font-bold text-md max-w-[930px]'>
              <p className="text-richblack-600 text-center">With our online coding courses, you can learn at 
              your own pace, from anywhere in the world, 
              and get access to a wealth of resources, 
              including hands-on projects, quizzes, and 
              personalized feedback from instructors.</p>
            </div>
            
            <div className=' mt-8 flex flex-row gap-7 '>
              <CTAButton active={true} linkto={"/signUp"} >Learn More</CTAButton>
              <CTAButton active={false} linkto={"/login"} >Book a Demo</CTAButton>
            </div>
          </div>

          {/* hero Video */}
          <div className='mx-3 my-12 shadow-lg shadow-blue-200 '>
            <video muted loop autoPlay src={Banner} ></video>
          </div>

          {/* code section 1 */}
          <div className='z-[100] w-full mt-16 mb-16 flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-12'>
          <CodeTTB 
            heading={<div>
               Unlock Your <HighlightText text={"Coding Potential "}/>
              with our online courses
            </div>} 
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
            ctabtn1={ 
              {
                active:true,
                linkto:"/signUp",
                text:"Try it Yourself"
              }
            } 
            ctabtn2={ 
              {
                active:false,
                linkto:"/login",
                text:"Learn More"

              }
            }>
          </CodeTTB>
          <CodeBlock 
                    code={`<!DOCTYPE html>
                          <html>
                          <head>
                          <link rel="stylesheet" href="styles.css">
                          </head>
                          <body>
                          <h1>This is a heading</h1>
                          <p>This is a paragraph.</p>
                          <p>This is Type Animation </p>
                          </body>
                          </html>`
                          } 
                    codeColor={"text-yellow-25"} >

          </CodeBlock>
          </div>

          {/* code section 2 */}
          <div className='z-[100] w-full mt-12 mb-14 flex flex-col-reverse justify-center items-center lg:flex-row lg:justify-between gap-12'>
          <CodeBlock 
                    code={`import React from 'react'
                           import { FaArrowRight } from "react-icons/fa"
                           import CTAButton from '../Components/Button';
                           import { TypeAnimation } from 'react-type-animation'
                           
                           const Home = () => {
                           return (
                           <div>Home</div>  
                           )
                           }
                           export default Home`
                          } 
                    codeColor={"text-[#4DFFFF]"} >

          </CodeBlock>
          <CodeTTB 
            heading={<div>
               Start <HighlightText text={"coding in seconds "}/>
            </div>} 
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} 
            ctabtn1={ 
              {
                active:true,
                linkto:"/signUp",
                text:"Continue Learning"
              }
            } 
            ctabtn2={ 
              {
                active:false,
                linkto:"/login",
                text:"Learn More"

              }
            }>
          </CodeTTB>
          </div>

          <CatalogCards/>
        </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 '>
            
            {/* two buttons only */}
            <div className='homepage_bg h-[333px]'>
                <div className='w-11/12 max-w-maxContent h-[333px] mx-auto flex flex-row gap-8 justify-center items-center pt-20'>
                  <CTAButton active={true} linkto={"/signUp"}>
                    <div className='flex justify-center items-center gap-2'>
                      Explore Full Catalog
                      <FaArrowRight/>
                    </div>
                  </CTAButton>
                  <CTAButton active={false} linkto={"/login"}>Learn More</CTAButton>
                </div>
            </div>

            {/* flex */}
            <div className='w-11/12 max-w-maxContent mt-32 flex flex-col lg:flex-row gap-x-[11rem] gap-y-4 justify-center mx-auto'>

              <div className='text-4xl font-bold w-full'>
                <p className=''>Get the skills you need for a <HighlightText text={"job that is in demand."}/></p>
              </div>

              <div className='flex flex-col gap-y-10 '>
                <div className='text-richblack-700 text-md'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                <div className='w-fit'>
                   <CTAButton linkto={"./signUp"} active={true}>Learn More</CTAButton>
                </div>
              </div>

            </div>

            <TimeLineSection/>
            <LearnLanguageSection/>

        </div>

        {/* section 3 */}
        <div className='w-11/12 max-w-maxContent mx-auto bg-richblack-900 h-screen flex flex-col gap-5 relative text-white'>
          <InstructorSection/>
        </div>

        <ReviewsSection />
        {/* Footer */}
        <Footer/>
    </div>  
   

    
    )
}

export default Home;