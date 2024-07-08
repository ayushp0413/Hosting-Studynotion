import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";



function MyProfile() {
  
  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();
  

    let trimmedDateString = null;
    console.log("In MY profile: ",user?.profile);

    
    if(user?.profile?.dateOfBirth) 
    {
      const dateObject = new Date(user?.profile?.dateOfBirth);

      // Get day, month, and year from the Date object
      const day = dateObject.getDate().toString().padStart(2, '0'); // padStart ensures two digits
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = dateObject.getFullYear();

      // Form the trimmed date string in "dd-mm-yyyy" format
      trimmedDateString = `${day}-${month}-${year}`;

      console.log("simple date format :",  trimmedDateString); 

    }
    
  return (
    <div className='flex flex-col gap-y-4 mt-12 mb-12 ml-8'>
        
        <h1 className='text-3xl text-richblack-5'>My Profile</h1>

        {/* section -1 */}
        <div className='flex flex-row justify-between items-center mt-8 bg-richblack-800 rounded-md px-8 py-7 border-[1px] border-richblack-600'>
          
          <div className='flex flex-col md:items-center md:flex-row gap-y-2 gap-x-6 '>  
            <img src={user?.image} alt={`${user.firstname}`} className='aspect-square max-w-[78px] w-[78px] rounded-full '/>
            <div className='flex flex-col'>
              <p className='text-richblack-5 text-lg font-semibold tracking-wide hover:text-caribbeangreen-200 transition-all duration-200 cursor-pointer'>{`${user?.firstName} ${user?.lastName} `}</p>
              <p className='max-w-[100px] '>{user?.email}</p>
            </div>
          </div>

          <div className='flex flex-row '>
            <IconBtn text="Edit" onclick={()=>navigate("/dashboard/settings")}>
              <FiEdit/>
            </IconBtn>
          </div>

        </div>

        {/* section -2  */}

        <div className='flex flex-row justify-between items-start mt-8 bg-richblack-800 rounded-md px-8 py-7 border-[1px] border-richblack-600'>
          
          <div className='flex gap-x-6 items-center'>  
            
            <div className='flex flex-col gap-y-3'>
              <p className='text-richblack-5 text-lg font-semibold tracking-wide '>About</p>
              <p>{user?.profile.about ||  "Write something about yourself"}</p>
              <p className='mt-8'>Account Type : {user?.accountType}</p>
            </div>
          </div>

          <div className='flex flex-row'>
            <IconBtn text="Edit" onclick={()=>navigate("/dashboard/settings")}>
              <FiEdit/>
            </IconBtn>
          </div>

        </div>

        {/* section -3 */}

        <div className='flex flex-row justify-between items-start mt-8 bg-richblack-800 rounded-md px-8 py-6 border-[1px] border-richblack-600'>
          
          <div className='flex flex-col gap-x-6 items-start'>  
              <p className='text-richblack-5 text-lg font-semibold tracking-wide max-w-[100px]'>Personal Details</p>  
              
              <div className='grid lg:grid-cols-2 gap-x-36 gap-y-6 mt-9'>
                  
                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-400 text-sm'>First Name</p>
                    <p className='text-richblack-25'>{user?.firstName}</p>
                  </div>

                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-400 text-sm'>Last Name</p>
                    <p className='text-richblack-25'>{user?.lastName}</p>
                  </div>

                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-400 text-sm'>Email</p>
                    <p className='text-richblack-25 '>{user?.email}</p>
                  </div>

                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-400 text-sm'>Phone Number</p>
                    <p className='text-richblack-25'>{user?.profile?.contactNumber ||  "Add contact number"}</p>
                  </div>

                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-400 text-sm'>Gender</p>
                    <p className='text-richblack-25'>{user.profile.gender ?? "Add gender"}</p>
                  </div>

                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-400 text-sm'>Date of Birth</p>
                    <p className='text-richblack-25'>{trimmedDateString ?? "Add your date of birth"}</p>
                  </div>
                  
              </div>
            



          </div>

          <div className='flex flex-row'>
            <IconBtn text="Edit" onclick={()=>navigate("/dashboard/settings")}>
              <FiEdit/>
            </IconBtn>
          </div>

        </div>

    </div>
  )
}

export default MyProfile
