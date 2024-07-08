import React from 'react'
import HighlightText from '../Components/core/HomePage/HighlightText'
import Banner1  from "../assets/Images/aboutus1.webp";
import Banner2  from "../assets/Images/aboutus2.webp";
import Banner3  from "../assets/Images/aboutus3.webp";
import "../App.css"
import story from "../assets/Images/FoundingStory.png"
import StatsComponent from '../Components/core/About/StatsComponent';
import LearningGridComponents from '../Components/core/About/LearningGridComponents';
import Footer from '../Components/common/Footer';
import ContactFormSection from '../Components/core/About/ContactFormSection';
import ReviewsSection from '../Components/core/HomePage/ReviewsSection';

function About() {
  return (

    <div className='flex flex-col gap-4 text-richblack-25 mt-8 '>

    {/* section 1 */}
    <section className='bg-richblack-800 relative h-[500px]'>
        <div className='w-11/12 mx-auto mt-24 flex flex-col gap-3 justify-center items-center '>
            <div className='lg:max-w-[80%]'>
                <h1 className='text-4xl font-bold text-center'>Driving Innovation in Online Education for a <br></br><HighlightText text={"Brighter Future"}/></h1>
                <p className='text-sm font-semibold text-richblack-500 mt-4 text-center'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </div>
            <div className='flex flex-row gap-x-5 mt-4 mx-auto absolute top-[340px]'>
                <img src={Banner1} alt='banner'/>
                <img src={Banner2} alt='banner' className='hidden md:block'/>
                <img src={Banner3} alt='banner' className='hidden lg:block'/>
            </div>
        </div>
    </section>

    {/* section 2 */}
    <section className='w-11/12 max-w-[80%] text-center mt-[15rem] mx-auto text-2xl mb-12'>
        
        <h1>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology, "}/>
        <span className='orangeGradient text-yellow-100'> expertise </span>
        and community to create an 
        <span className='orangeGradient text-yellow-100'> unparalleled educational experience.</span>
         
        </h1>
    </section>


    {/* section - 3 */}
    <div className='w-11/12 mt-24 mb-12 grid grid-cols-1 lg:grid-cols-2 place-content-center mx-auto  gap-y-16 gap-x-16'>

       <div className='flex flex-col gap-y-3'>
                <div className=''>
                    <h1 className='text-3xl  text-pink-300 mb-2'>Our Founding Story </h1>
                    <p className='text-sm text-richblack-400 mb-5'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='text-sm text-richblack-400'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
       </div>
        
        <div className='flex sm:justify-center'>
           <img src={story} width={400} alt='founding' />
        </div>
       
      
        <div className='flex flex-col gap-y-3'>
                <h1 className='text-3xl  text-yellow-100  mb-2'>Our Vision </h1>
                <p className='text-sm text-richblack-400 mb-5'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
        </div>

        <div className=''>
            <div>
                <HighlightText  text={"Our Mission"}/>
                <p className='text-sm text-richblack-400'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div> 
        </div>

        
    </div>


    {/* section -4 */}

    <StatsComponent/>


    {/* section- 5 */}

    <LearningGridComponents/>

    {/* section - 6 */}
    <ContactFormSection/>

    {/* section - 7  Reviews */}
    <ReviewsSection />

    {/* section -8 Footor */}
    <Footer/>
      
    </div>

  )
}

export default About

