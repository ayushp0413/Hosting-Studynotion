const BASE_URL = "https://studynotion-backend-fute.onrender.com/api/v1"


// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    
}

// CATAGORIES API 
export const catagories = {
    CATAGORIES_API:  BASE_URL + "/course/getAllCategories",
    CATEGORY_PAGE_DETAILS_API:  BASE_URL + "/course/categoryPageDetails",
}

// Contact Us API for form 
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// Profile Setting  APIs for Dashboards
export const settingsEndpoints = {
  UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
  UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
}

//Profile specific APIs 

export const profileEndpoints = {
  GET_USER_ENROLLED_COURSES : BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API : BASE_URL + "/profile/getInstructorData",
}

// Course Create API's
export const courseEndpoints = {
  COURSE_CATEGORIES_API : BASE_URL + "/course/getAllCategories",
  CREATE_COURSE_API : BASE_URL + "/course/createCourse",
  GET_COURSE_DETAILES_API : BASE_URL + "/course/getCourseDetails",
  
  EDIT_COURSE_API :  BASE_URL + "/course/updateCourse",
  PUBLISH_COURSE_API :  BASE_URL + "/course/publishCourse",
  DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS : BASE_URL + "/course/getFullCourseDetails",
  GET_INSTRUCTOR_COURSES : BASE_URL + "/course/getInstructorCourses",
  CREATE_RATING_API: BASE_URL + "/course/createRatingAndReviews",
  GET_ALL_REVIEWS_API: BASE_URL + "/course/getAllRatingAndReviews",

  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
}

export const sectionEndpoints = {
  CREATE_SECTION_API : BASE_URL + "/course/createSection",
  UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
  DELETE_SECTION_API : BASE_URL + "/course/deleteSection" ,
  DELETE_SUB_SECTION_API : BASE_URL + "/course/deleteSubSection",
  CREATE_SUB_SECTION_API : BASE_URL + "/course/createSubSection",
  UPDATE_SUB_SECTION_API : BASE_URL + "/course/updateSubSection",
}

export const studentEndpoints = {
  CAPTURE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
  VERIFY_SIGNATURE_API : BASE_URL + "/payment/verifySignature",
  SEND_PAYMENT_SUCCESSFUL_EMAIL_API : BASE_URL + "/payment/sendPaymentSuccessfullEmail",
}