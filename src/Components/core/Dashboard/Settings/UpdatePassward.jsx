import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/settingsAPI';
import { useEffect } from 'react';

function UpdatePassward() {

    
    const {register, handleSubmit, reset, formState:{errors, isSubmitSuccessful}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state)=> state.auth);



    function changePasswordHandler (data) {

        const oldPassword = data.oldPassword;
        const newPassword = data.newPassword;

        dispatch(changePassword(token, user.email, oldPassword, newPassword, navigate));

    }

    useEffect(()=>{
        reset({
            oldPassword:"",
            newPassword:"",
        })
    },[reset, isSubmitSuccessful]);




  return (
    <div>
        
        <div className='flex flex-row justify-between items-start  bg-richblack-800 rounded-md px-8 py-6 border-[1px] border-richblack-600'>
            <div className='w-full flex gap-x-6 items-center'>  
                
                <div className='w-full flex flex-col gap-y-3 '>
                    <p className='text-richblack-5 text-lg font-semibold tracking-wide '>Password</p>
                    <form className='w-[100%]' onClick={handleSubmit(changePasswordHandler)}>
                        <div className='grid lg:grid-cols-2 gap-y-6  mt-2'>

                            <div className='flex flex-col gap-[2px]'>
                                <label htmlFor='password' className='text-richblack-400 text-sm'>Current Password</label>
                                <input 
                                id='password' 
                                type='password' 
                                name='oldPassword'
                                placeholder='Enter current password' 
                                {...register("oldPassword",{required:true})}
                                className='text-richblack-25 lg:max-w-[90%]
                                    outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                                '/>
                                {
                                    errors.oldPassword && (<span className='text-sm text-yellow-100'>Please enter current password</span>)
                                }
                            </div>

                            <div className='flex flex-col gap-[2px]'>
                                <label htmlFor='confirmpassword' className='text-richblack-400 text-sm'>New Password</label>
                                <input 
                                    id='confirmpassword'
                                    name='newPassword'
                                    type='password' 
                                    {...register("newPassword", {required:true})}
                                    placeholder='Enter new password' 
                                    className='text-richblack-25 lg:max-w-[90%]
                                    outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                                '/>
                                {
                                    errors.oldPassword && (<span className='text-sm text-yellow-100'>Please enter new password</span>)
                                }
                            </div>
                        </div>

                        <div className='flex justify-end items-center mt-8 gap-3'>
                            <button
                                onClick={() => navigate("/dashboard/myProfile")} 
                                className='text-richblack-25 cursor-pointer font-semibold bg-richblack-600 
                                rounded-md px-4 py-2 flex items-center justify-end'> Cancel</button>
                            <button type='submit'
                                className='bg-yellow-100 px-4 py-2 rounded-md text-richblack-800 flex items-center gap-3'>Change Password</button>
                        </div>

                    </form>
                        

                </div>
            </div>
        </div>

    </div>
  )
}

export default UpdatePassward
