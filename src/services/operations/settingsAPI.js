import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { settingsEndpoints } from "../apis"
import { setLoading, setToken  } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { resetCart } from "../../slices/cartSlice";


const {UPDATE_PROFILE_PICTURE_API , DELETE_PROFILE_API , CHANGE_PASSWORD_API ,UPDATE_PROFILE_API} = settingsEndpoints;

export function updateProfilePicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
  
        console.log("Inside : ", UPDATE_PROFILE_PICTURE_API);
        const response = await apiConnector(
          "PUT", 
          UPDATE_PROFILE_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`,
          }
      );
  
        console.log("Update profile picture  reponse ............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Profile Picture Update  Successfully");
        console.log("Image src: ", response.data?.profile?.image);

        console.log("after img upload : ", response?.data?.userDetails);
        
        dispatch(
          setUser({ ...response.data.userDetails })
        )

        
      } catch (error) {
        console.log("Update Profile Picture ERROR............", error)
        toast.error("Failed To upload profile picture")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }

export function updateProfile(formData, token) {

    return async (dispatch) => {
      
        const toastId = toast.loading("Loading...")
      
        try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, {formData, token})

        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        console.log(response.data.userDetails);
        
        const userImage = response.data.userDetails.image
          ? response.data.userDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`

        dispatch(
          setUser({ ...response.data.userDetails, image: userImage })
        )

        toast.success("Profile Updated Successfully");
      
    } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }
  
export function changePassword(token,email, oldPassword, newPassword, navigate) {
    return async(dispatch) => {
 
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true))
     try {
 
 
       const response = await apiConnector("PUT", CHANGE_PASSWORD_API ,{token,email,oldPassword, newPassword});
 
       console.log("Password Chnage response ............", response)
 
       if (!response.data.success) {
         throw new Error(response.data.message)
       }
 
       toast.success("Password Changed Successfully");
       
       navigate("/login");
       dispatch(setToken(null))
       dispatch(setUser(null))
       dispatch(resetCart())
       localStorage.removeItem("token")
       localStorage.removeItem("user")
       
     } catch (error) {
       console.log("Changed Password ERROR............", error)
       toast.error("Failed To Chnaged Password")
     }
     toast.dismiss(toastId)
     dispatch(setLoading(false))   
    }
 }
  
  export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
  
  
        const response = await apiConnector("DELETE", DELETE_PROFILE_API,{token});
  
        console.log("Delete profile response ............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Profile Deleted  Successfully");
        navigate("/Signup");
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        
      } catch (error) {
        console.log("Profile Delete ERROR............", error)
        toast.error("Failed To Delete profile")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
  
