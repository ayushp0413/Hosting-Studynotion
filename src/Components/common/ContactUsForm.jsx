import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../data/countrycode.json"
import "../../App.css"
import { apiConnector } from '../../services/apiConnector';
import {contactusEndpoint} from "../../services/apis";
import { toast } from "react-hot-toast"

function ContactUsForm() {

    const [loading, setLoading] = useState(false);
    const {register, reset, handleSubmit, formState:{errors, isSubmitSuccessful} } = useForm();

    const  contactUsFormSubmit = async(data) => {
        
        toast.success("Message sent successfully");
        console.log(" form data: ", data);
        try{

            setLoading(true);
            const response = await apiConnector("POST",  contactusEndpoint.CONTACT_US_API, data);
            console.log("printing response of contact us form :", response)
            setLoading(false);

        }catch(err){
            console.log(err.message);
        }
    }


    useEffect(()=>{
        reset({
            email:"",
            firstname:"",
            lastname:"",
            phoneNo:"",
            message:""
        })
    },[reset, isSubmitSuccessful]);



  return (
        <form onClick={handleSubmit(contactUsFormSubmit)} className='flex flex-col gap-5 lg:w-[75%] mx-auto'>

            {/* name */}
            <div className='flex flex-row gap-3 mt-12'>     
                {/* firstName */}
                <div className='flex flex-col'> 
                    <label htmlFor='firstname'>First Name <span className='text-pink-700'>*</span></label>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter your first name'
                        {...register("firstname",{required:true})}
                        className='text-white bg-richblack-700 outline-none p-3 rounded-md border-b-2 border-b-richblack-500'                
                    />
                    {
                        errors.firstname && (<span className='text-yellow-50 text-xs'>Please Enter first name!</span>)
                    }
                </div>

                {/* lastname */}
                <div className='flex flex-col'> 
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter your last name'
                        {...register("lastname")}
                        className='text-white bg-richblack-700 outline-none p-3 rounded-md border-b-2 border-b-richblack-500'
                    
                    />
                </div>
            </div>

            {/*email  */}
            <div className='flex flex-col'> 
                <label htmlFor='email'>Email Address <span className='text-pink-700'>*</span></label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    {...register("email", {required:true})}
                    className='text-white bg-richblack-700 outline-none p-3 rounded-md border-b-2 border-b-richblack-500'    
                />
                {
                    errors.email && (<span className='text-yellow-50 text-xs'>Invalid Email Address!</span>)
                }
            </div>

            {/* Phone number */}

            <div className='flex flex-col'>
                <label htmlFor='phonenumber'>Phone Number <span className='text-pink-700 text-xs'>*</span></label>
                <div className='flex fle-row gap-3'>
                    {/* dropdown */}
                    <select name='dropdown' id='dropdown'
                    className=' w-[18%] text-white bg-richblack-700 outline-none p-3 rounded-md border-b-2 border-b-richblack-500'
                    {...register("countrycode", {required:true})}
                    >
                    {
                        CountryCode.map( (elem , index) => {
                            return (
                                <option key={index} value={elem.code} id='dropdown' 
                                className='text-white bg-richblack-700 outline-none p-3 rounded-md border-b-2 border-b-richblack-500'
                                >
                                    {elem.code} -{elem.country}
                                </option>
                            )
                        })
                    }
                    </select>

                
                    {/* number input */}
                    
                        <input
                            type='tel'
                            id='phonenumber'
                            name='phonenumber'
                            placeholder='87673 4XXXX'
                            {...register("phoneNo",
                            {required:true,
                            maxLength:10,
                            minLength:10}
                            )}
                            className='w-[82%] disableCounter text-white bg-richblack-700 outline-none p-3 rounded-md border-b-2 border-b-richblack-500'
                        />      
                </div> 
                <div>
                    {errors.phoneNo && (<p className='text-xs text-yellow-25'>Invalid phone number</p>)}
                </div>   

            </div>

            {/*message field  */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message <span className='text-pink-700 '>*</span></label>
                <textarea
                    placeholder='Enter your message...'
                    cols={30}
                    rows={7}
                    type='type'
                    id='message'
                    {...register("message",{required:true})}
                    className='text-white bg-richblack-700 outline-none p-3 rounded-md border-b-2 border-b-richblack-500'
                />

            </div>

            <button type='submit' className='p-2 font-semibold bg-yellow-25 rounded-md text-richblack-800 hover:scale-95 transition-all duration-300'>Send a message</button>   
    
    </form>
  )
}

export default ContactUsForm
