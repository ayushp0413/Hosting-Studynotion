import { toast } from "react-hot-toast"
import { setLoading} from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"


const {GET_USER_ENROLLED_COURSES, GET_INSTRUCTOR_DATA_API} = profileEndpoints


export async function getUserEnrolledCourses(token) {

    // const toastId = toast.loading("Loading....");
    let result =[] ;

    setLoading(true);
    try
    {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES, null , {Authorization:`Bearer ${token}`})

        console.log("After calling backend API for Enrolled courses");
        console.log("Response" , response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data;
    
    }
    catch(err)
    {
        console.log("Error in fetching the user enrolled courses", err.message);
        console.log("ERROR : ", err);
        toast.error(err.message);
    }
    setLoading(false);

    // toast.dismiss(toastId);
    return result;

}

export async function getInstructorData(token) {

    // const toastId = toast.loading("Loading...");
    let result = [];
    
    try
    {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization:`Bearer ${token}`,
        });

        console.log("GET_INSTRUCTOR_API_RESPONSE", response);
         result = response?.data?.courses

    }catch(err)
    {
        console.log("INSTRUCTOR_DATA_API ERROR: ", err);
        toast.error("Could not Get Instructor Data");
    }
    // toast.dismiss(toastId);
    return result;
}