import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints,  } from "../apis"

const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API} = endpoints;



export function sendOtp(email, navigate) {
  
  return async (dispatch) => {

   const toastId = toast.loading("Loading...")
   dispatch(setLoading(true));
   
   try {

    console.log("Send opt route: ", SENDOTP_API);
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })

      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email");

    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
 
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/login")
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {

  return async (dispatch) => {

    dispatch(setLoading(true))
    
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful");
      console.log("In login services : printing response ka user: ",response.data.exsistingUser);
      

      dispatch(setToken(response.data.token))
      const userImage = response.data?.exsistingUser?.image
        ? response.data.exsistingUser.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.exsistingUser.firstName} ${response.data.exsistingUser.lastName}`
      dispatch(setUser({ ...response.data.exsistingUser, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.exsistingUser))

      navigate("/dashboard/myProfile");

    } catch (error) {
      console.log("LOGIN API ERROR............", error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false))
    
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email} );

      console.log("rest passwrrd token response..", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true);

    } catch (error) {
      console.log("reset password token error....", error)
      toast.error("Failed To Send Reset Email");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    console.log("Inside logout");
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/");
    console.log("Done log out");
  }
}
