import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { resetPassword } from '../services/operations/authAPI';

function UpdatePassword() {

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    
    function submitHandler(e){
        e.preventDefault();
        const token =  location.pathname.split("/").at(-1).trim();
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }

  return (
     <div className='w-11/12 max-w-maxContent mx-auto h-screen flex flex-col justify-center items-center text-richblack-5 '>
            <div className='lg:w-[350px]  flex flex-col gap-y-2'>

            <h1 className='font-bold text-xl'> Choose your password</h1>
            <p className='text-sm text-richblack-300 '>Almost done. Enter your new password and youre all set.</p>
            <form onSubmit={submitHandler} className='flex flex-col mt-3'>

                <label>
                    <p className='text-sm text-richblack-300'>New Password<span  className='text-pink-500'>*</span></p>
                    <input className='p-2 outline-none border-0 rounded-md bg-richblack-700 w-full mb-3 border-b-2 border-b-richblack-600 hover:border-blue-25 transition-all duration-200'
                        required
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder='Enter your new password'
                    >
                    </input>
                </label>   
                <label>
                    <p className='text-sm text-richblack-300'>Confirm new Password<span  className='text-pink-500'>*</span></p>
                    <input className='p-2 outline-none border-0 rounded-md bg-richblack-700 w-full mb-3 border-b-2 border-b-richblack-600 hover:border-blue-25 transition-all duration-200'
                        required
                        type='password'
                        name='password'
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        placeholder='Re-enter your new password'
                    >
                    </input>
                </label>   
        
                <button className='bg-yellow-25 rounded-md p-2 text-richblack-900 font-semibold transition-all duration-200'>
                    Reset Password
                </button>
           
            </form>

            <Link to="/login" className='flex flex-row gap-2 items-center '>
                <IoArrowBack className='text-sm'/>
                <p className='text-xs'>Back to login</p>
            </Link>

            </div>
        
        </div>

  )
}

export default UpdatePassword
