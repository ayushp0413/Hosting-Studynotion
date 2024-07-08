import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

function ContactFormSection() {
  return (
    <div className='flex flex-col justify-center items-center mx-auto mt-8 mb-24 w-11/12 max-w-maxContent '>
      <h1 className='text-[40px] font-bold text-center'>Get in Touch</h1>
      <p className='text-xl text-richblack-200'>We'd love to here for you, Please fill out this form.</p>
      <div>
        <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactFormSection
