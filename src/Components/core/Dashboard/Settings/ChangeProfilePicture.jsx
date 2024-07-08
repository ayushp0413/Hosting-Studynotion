import React, { useEffect, useRef ,useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { FaCloudUploadAlt } from "react-icons/fa";
import {updateProfilePicture} from "../../../../services/operations/settingsAPI"

function ChangeProfilePicture() {
    
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) =>  state.auth);
    const navigate = useNavigate;
    const dispatch = useDispatch(); 

    const [loading, setLoading ] = useState(false);
    
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    
    const fileInputRef = useRef(null);

    const handleClick = () => {
      fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0]; // selected file
      console.log(file);

      if (file) {
        setImageFile(file);
        previewFile(file); // function below
      }
    }

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);

      
      
      
      reader.onloadend = () => {
        console.log("Reader result : ", reader.result);
        setPreviewSource(reader.result);
      }
    }


    const handleFileUpload = () => {
      try
      {
        console.log("Uploading...")
        setLoading(true); 

        const formData = new FormData();

        console.log("FILE :" , imageFile);
        formData.append("displayPicture", imageFile);

        console.log("Form data for image uploading ", formData.get('displayPicture'));

        dispatch(updateProfilePicture(token, formData)).then(() => {
          setLoading(false);
        })

      }catch(err)
      {
        console.log("ERROR MESSAGE - ", err.message)
      }
    }

    
  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])


  return (
    <div>
        <div className='flex justify-between items-center bg-richblack-800 rounded-md px-8 py-7 border-[1px] border-richblack-600'>
        
            <div className='flex gap-x-6 items-center'>  
                 <img 
                 src={previewSource || user?.image} 
                 alt={`profile-${user?.firstName}`} 
                 className='aspect-square w-[78px] rounded-full '/>
                
                <div className='flex flex-col'>    
                    
                    <p className='text-richblack-5 text-md '>Change Profile Picture</p>               
                    <div  className='flex lg:flex-row  gap-3 mt-1  '>
                        
                        <input 
                        type='file' 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept='image/png , image/gif , image/jpeg'
                        id='file' 
                        className='hidden'

                        />
                        <button
                          onClick={handleClick}  
                          disabled={loading}
                          className='text-richblack-25 cursor-pointer font-semibold bg-richblack-600 rounded-md px-3 py-1 flex items-center '
                          >
                          Select
                          </button>
                        <IconBtn text={loading ? "Upload..." : "Upload"} 
                          onclick={handleFileUpload}
                          >

                          {
                            !loading && (
                               <FaCloudUploadAlt className='text-xl text-richblack-900'/> 
                            )
                          }

                        </IconBtn>
                        
                    </div>
                
                </div>
            </div>
    </div>
      
    </div>
  )
}

export default ChangeProfilePicture
