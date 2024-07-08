import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'; 
import Sidebar from "../Components/core/Dashboard/Sidebar";


function Dashboard() {

    const {loading:authLoading} = useSelector((state)=>state.auth);
    const {loading:profileLoading} = useSelector((state)=>state.profile);

    if(authLoading || profileLoading){
        <div className='flex h-screen justify-center items-center'>
          <div className="spinner"></div>
        </div>
    }


  return (
    <div className='relative text-richblack-200 flex flex-row mt-14'>
        <Sidebar/>
        <div className='w-full flex justify-center items-center ml-[150px]'>
            <div className='w-9/12 max-w-maxContent mx-auto flex flex-col h-full'>
                <Outlet/>
            </div>
        </div>

      
    </div>
  )
}

export default Dashboard
