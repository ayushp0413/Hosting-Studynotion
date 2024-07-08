import "./App.css";
import { Route, Routes } from "react-router-dom";
import  Home  from "./Pages/Home";
import Navbar from "./Components/common/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import OpenRoute from "./Components/core/Auth/OpenRoute";
import ForgotPassword from "./Pages/ForgotPassword"
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import ProfileDropdown from "./Pages/ProfileDropdown";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import Error from "./Pages/Error"
import Settings from "./Components/core/Dashboard/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import { useSelector } from "react-redux";
import Cart from "./Components/core/Dashboard/Cart";
import AddCourse from "./Components/core/Dashboard/Add Course";
import { PiCubeLight } from "react-icons/pi";
import PublishCourse from "./Components/core/Dashboard/Add Course/PublishCourse";
import EditCourse from "./Components/core/Dashboard/Edit Course";
import MyCourses from "./Components/core/Dashboard/MyCourses";
import Catalog from "./Pages/Catalog"
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import ViewLecture from "./Components/core/ViewCourse/ViewLecture";
import Instructor from "./Components/core/Dashboard/InstructorDashboard/Instructor";

function App() {

  const {user} = useSelector((state) => state.profile);
  
  return (  
    <div className="realtive w-screen min-h-screen bg-[#000814] font-inter flex flex-col gap-y-12">
  
      <Navbar/>
      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        
        <Route path="category/:categoryName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        
        <Route path="/login" element={<OpenRoute>
                                      <Login/>
                                     </OpenRoute>
        } />

        <Route path="/Signup" element={
                                       <OpenRoute>
                                        <Signup/>
                                       </OpenRoute> 
        } />

        <Route path="/dashboard/my-profile" element={
                                       <OpenRoute>
                                        <ProfileDropdown/>
                                       </OpenRoute> 
        } />


        <Route path="/forgot-password" element={
                                       <OpenRoute>
                                        <ForgotPassword/>
                                       </OpenRoute> 
        } />
        
        <Route path="/update-password/:token" element={
                                        <UpdatePassword/>
                                       
        } />

         <Route path="/verify-email" element={
                                       <OpenRoute>
                                        <VerifyEmail/>
                                       </OpenRoute> 
        } />

        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
      

        <Route element={<PrivateRoute> <Dashboard/> </PrivateRoute>}>
           
           <Route path="/dashboard/myProfile" element={<MyProfile/>}/>
           <Route path="dashboard/settings" element={<Settings/>}/>
           {
             user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>

              </>
             )
           }
           {
             user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/instructor" element={<Instructor/>} />
                <Route path="/dashboard/add-course" element={<AddCourse/>} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
              </>
             )
           }

        </Route>


        <Route  element={ <PrivateRoute> 
                          <ViewCourse/> 
                          </PrivateRoute> }>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
               path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
               element={<ViewLecture/>} />

            </>
          )
        }
        </Route>

        <Route path="*" element={<Error/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
