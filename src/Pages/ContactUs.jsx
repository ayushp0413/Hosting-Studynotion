import React from 'react'
import Footer from '../Components/common/Footer'
import { IoIosChatboxes } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import ContactUsForm from '../Components/common/ContactUsForm';
import ReviewsSection from '../Components/core/HomePage/ReviewsSection';

function ContactUs() {
  return (
    <div className='mt-16'>

        <div className='w-11/12 max-w-maxContent mt-16 flex flex-col gap-y-5 items-center  lg:flex-row mx-auto justify-between lg:items-start'>  
            <div className='flex flex-col justify-evenly bg-richblack-800 lg:max-h-[450px] lg:h-[420px] p-8 lg:max-w-[50%] lg:w-[40%] rounded-xl'>
                
                {/* First */}
                <div className='flex flex-row gap-3 text-richblack-5 items-center text-xl'>
                    <IoIosChatboxes className='text-2xl'/>
                    <h2 className='font-bold'>Chat on us</h2>
                </div>
                <div className='text-richblack-100 text-sm flex flex-col'>
                    <p>Our friendly team is here to help.</p>
                    <p className='font-semibold'>info@studynotion.com</p>
                </div>

                {/* second*/}
                <div className='flex flex-row gap-3 mt-10 text-richblack-5 items-center text-xl'>
                    <FaEarthAfrica className='text-2xl'/>
                    <h2 className='font-bold'>Visit us</h2>
                </div>
                <div className='text-richblack-100 text-sm flex flex-col'>
                    <p>Come and say hello at our office HQ.</p>
                    <p className='font-semibold lg:max-w-[95%]'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                </div>

                {/* third */}
                <div className='flex flex-row gap-3 mt-10 text-richblack-5 items-center text-xl'>
                    <BiSolidPhoneCall className='text-2xl text-blue-200'/>
                    <h2 className='font-bold'>Call us</h2>
                </div>
                <div className='text-richblack-100 text-sm flex flex-col'>
                    <p>Mon - Fri From 8am to 5pm</p>
                    <p className='font-semibold'>+91 7800855435</p>
                </div>
            </div>

            <div className=' flex flex-col mb-10  justify-center border-[1px] border-richblack-500 text-richblack-5  lg:w-[55%] rounded-xl '>
                {/* Form  */}
                
                <div className='pl-9 pt-7 font-bold text-left flex flex-col gap-y-5 '>
                    <h1 className='text-[40px] '>Got a Idea? We've got the skills. Let's team up</h1>
                    <p className='text-richblack-600 font-thin'>Tell us more about yourself and what you're got in mind.</p>
                </div>
                <div className='lg:-mx-16 mb-8'>
                    <ContactUsForm/>
                </div>

            </div>
        </div>

        <ReviewsSection />

      <Footer/>
    </div>
  )
}

export default ContactUs
