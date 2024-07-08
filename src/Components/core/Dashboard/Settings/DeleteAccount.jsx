import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile } from '../../../../services/operations/settingsAPI';
import {MdDelete} from "react-icons/md"
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


  return (
    <div>
        <div className='flex gap-x-5 items-start justify-center text-richblack-25 bg-pink-800 rounded-md border-[1px] border-pink-500 px-8 py-6'>
            <div className='w-[54px] aspect-square bg-pink-600 rounded-full flex justify-center items-center'><MdDelete className='text-3xl'/></div>
            <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold'>Delete Account</p>
                <p className='lg:max-w-[60%]'>Would you like to delete account?<br></br>
                This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
                <button 
                    onClick={()=> dispatch(deleteProfile(token, navigate))}
                    className='flex w-fit px-2 py-2 mt-4 text-white font-bold bg-transparent rounded-md border-[1px]
                  hover:border-pink-100 hover:bg-pink-200 transition-all duration-500 border-pink-500 '>I Want to Delete my Account</button>
            </div>

        </div>
    </div>
  )
}

export default DeleteAccount
