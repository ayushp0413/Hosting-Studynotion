import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { GrPowerReset } from "react-icons/gr";
import { signUp } from '../services/operations/authAPI';
import { sendOtp } from '../services/operations/authAPI';


function VerifyEmail() {
    
    const {loading, signupData} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    useEffect(()=>{
        if(!signupData) {
            navigate("/signup");
        }
    },[])


    function submitHandler(e) {
        e.preventDefault();
        const {accountType, firstName, lastName, email, password, confirmPassword }  = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))

    }

    function resendButtonHandler(e) {
        const {email} = signupData;
        dispatch(sendOtp(email, navigate));
    }


  
    return (
    <div>

        <div className='text-richblack-25 w-11/12'>
            {
                loading ? ( <div className='flex h-screen justify-center items-center'>
                             <div className="spinner"></div>
                            </div>
                          ) 
                : 
                (<div className='max-w-[340px] mx-auto flex flex-col  gap-4 justify-center  h-screen'>

                    <h1 className='font-bold text-2xl text-left'>Verify Email</h1>
                    <p className='text-sm text-richblack-300 '>A verification code has been sent to you. Enter the code below</p>

                    <form onSubmit={submitHandler} className='max-w-[340px]'>
                      
                        <div className='relative max-w-[340px] '>

                        <OTPInput 
                            className='' 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props}  className='text-white bg-richblack-800 text-4xl rounded-md ml-2 mr-2 px-2'/>}
                        />
                        </div>
                        

                        <button className='mt-5 w-full bg-yellow-25 rounded-md p-1 text-richblack-900 font-semibold transition-all duration-200'>
                           Verify Email
                        </button>
                    </form>

                    <div className='flex flex-row justify-between -mt-2'>
                        <div>
                            <Link to="/login" className='flex flex-row gap-2 items-center '>
                            <IoArrowBack className='text-sm'/>
                            <p className='text-xs'>Back to login</p>
                            </Link>
                        </div>
                        <div className='text-blue-200'>
                            <button onClick={resendButtonHandler} className='flex flex-row gap-2 items-center'>
                                <GrPowerReset className='text-sm'/>
                                <p className='text-xs'>Resend otp</p>
                            </button>

                        </div>
                    </div>
                </div>)
            }
        </div>


      
    </div>
  )
}

export default VerifyEmail

