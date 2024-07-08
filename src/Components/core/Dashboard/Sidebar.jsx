import React, {useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';
import SidebarLinkComponent from "./SidebarLinkComponent"



function Sidebar() {
    
    const {user, loading: profileLoading} = useSelector((state)=>state.profile);
    const {loading: authLoading} = useSelector((state)=>state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    if(authLoading || profileLoading){
        <div className='spinner text-black mt-24 text-3xl'>Loading...</div>
    }



    return (
    <div className='fixed top-15 left-0 z-20'>
        
        <div  className='flex min-w-[222px] max-w-[210px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 h-[100vh]
            bg-ricjblackk-800 py-10'>

            <div className='flex flex-col text-richblack-200'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && link.type !== user?.accountType) return null;
                        else return (
                            <SidebarLinkComponent  link={link} iconName={link?.icon} key={link.id}/> 
                        )                        
                    } )
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

            {/* Settings and Logout  */}
            <div className='flex flex-col '>
                
                <SidebarLinkComponent link={{name:"Settings", path:"/dashboard/settings"}} 
                iconName="VscSettingsGear"/>
                {/* logout */}

                <button 
                  onClick={ () => setConfirmationModal({
                    text1:"Are you Sure ?",
                    text2:"You will be logged out from your account.",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),   
                })}

                className="text-sm font-md text-richblack-100 px-8 py-2"
                >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className=' text-md'/>
                        <span>Logout</span>
                    </div>

                </button>



            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/> }       

        </div>
            
             
    </div>
  )
}

export default Sidebar



 