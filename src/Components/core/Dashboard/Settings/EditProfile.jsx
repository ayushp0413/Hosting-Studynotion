import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingsAPI';
import { setUser } from '../../../../slices/profileSlice';

function EditProfile() {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) =>  state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const {register, handleSubmit, reset,  formState:{errors, isSubmitSuccessful}} = useForm();


    const submitProfileForm =  async(data) => {

        console.log("Form data Profile: ", data);
        try{

            dispatch(updateProfile(data, token));
            dispatch(setUser(data));


        }catch(err)
        {
            console.log("Error message - ", err.message);
        }

    }

    useEffect(()=>{
        reset({
            firstName : user?.firstName ?? "",
            lastName : user?.lastName ?? "",
            gender : user?.profile?.gender ??  "",
            about : user?.profile?.about ??  "",
            contactNumber :user?.profile?.contactNumber ??  "",
            dateOfBirth : user?.profile?.dateOfBirth ?? "",
        })
    },[reset, isSubmitSuccessful])


  return (
    <div>
      <div className='flex flex-row justify-between items-start bg-richblack-800 rounded-md px-8 py-6 border-[1px] border-richblack-600'>
        
        <div className='w-full flex flex-col gap-x-6 items-start'>  
           <p className='text-richblack-5 text-lg font-semibold tracking-wide'>Profile Information</p> 
            <form onSubmit={handleSubmit(submitProfileForm)}  className='w-[100%]'>
                
                <div className='grid lg:grid-cols-2 gap-y-6  mt-9 '>
                    
                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor='firstName' className='text-richblack-400 text-sm'>First Name</label>
                        <input 
                        id='firstName' 
                        type='text' 
                        name='firstName'
                        placeholder='Enter first name'  
                        defaultValue={user?.firstName} 
                        {...register("firstName", {required:true})}
                        className='text-richblack-25 lg:max-w-[90%]
                            outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                        '/>
                        {
                            errors.firstName && 
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your first name.
                            </span>                  
                        }
                    </div>

                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor='lastName' className='text-richblack-400 text-sm'>Last Name</label>
                        <input 
                        id='lastName' 
                        type='text' 
                        name='lastName'
                        placeholder='Enter last name'  
                        defaultValue={user?.lastName} 
                        {...register("lastName", { required: true })}
                        className='text-richblack-25 lg:max-w-[90%]
                            outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                        '/>
                        {
                            errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your last name.
                            </span>)

                        }
                    </div>

                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor='dateOfBirth' className='text-richblack-400 text-sm'>Date of Birth</label>
                        <input 
                        id='dateOfBirth' 
                        type='date' 
                        placeholder='Enter your date of birth'
                        name='dateOfBirth'
                        defaultValue={user?.profile?.dateOfBirth}
                        {...register("dateOfBirth", {
                            required: {
                                value: true,
                                message: "Please enter your Date of Birth.",
                            },
                            max: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Date of Birth cannot be in the future.",
                            },

                        })}
                        className='text-richblack-25 lg:max-w-[90%]
                            outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                        '/>
                        {
                            errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.dateOfBirth.message}
                            </span>)
                        }
                    </div>

                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor='gender' className='text-richblack-400 text-sm'>Gender</label>
                        <select 
                        type="text"
                        name="gender"
                        id='gender'
                        defaultValue={user?.profile?.gende || "Gender"}
                        {...register("gender", { required: true })}
                        
                        className='text-richblack-25 lg:max-w-[90%]
                            outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                        '>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            <option>Prefer not to say</option>
                        </select>
                        {errors.gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your grnder.
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor='contactNumber' className='text-richblack-400 text-sm'>Contact Number</label>
                        <input 
                        id='contactNumber' 
                        type='tel' 
                        placeholder='Enter Contact number' 
                        name='contactNumber'
                        defaultValue={user?.profile?.contactNumber}
                        {...register("contactNumber" , {
                            required: {
                                value: true,
                                message: "Please enter your Contact Number.",
                            },
                            maxLength: { value: 10, message: "Invalid Contact Number" },
                            minLength: { value: 10, message: "Invalid Contact Number" },
                        })}
                        className='text-richblack-25 lg:max-w-[90%]
                            outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                        '/>
                        {
                            errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter valid contact number.
                            </span>    
                            )
                        }
                    </div>

                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor='about' className='text-richblack-400 text-sm'>About</label>
                        <input 
                        id='about' 
                        type='text' 
                        placeholder='Enter your bio details' 
                        defaultValue={user?.profile?.about}
                        {...register("about", { required: true })}
                        className='text-richblack-25 lg:max-w-[90%]
                            outline-none bg-richblack-700 rounded-md py-3 px-3 border-b-[1px] border-richblack-400                            
                        '/>
                        {
                            errors.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your About.
                            </span>
                        )}
                    </div>
                    
                </div>

                <div className='flex justify-end items-center mt-14 gap-3'>
                    <button
                        onClick={() => navigate("/dashboard/myProfile")} 
                        className='text-richblack-25 cursor-pointer font-semibold bg-richblack-600 
                        rounded-md px-4 py-2 flex items-center justify-end'> Cancel</button>
                     <button 
                        type='submit'
                        className='bg-yellow-100 px-4 py-2 rounded-md text-richblack-800 flex items-center gap-3'>Save</button>
                    
                </div>
                
            </form>
        </div>
    </div>
    </div>
  )
}

export default EditProfile
