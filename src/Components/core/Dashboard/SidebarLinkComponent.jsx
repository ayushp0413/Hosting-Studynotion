import React from 'react'
import { CgProfile } from 'react-icons/cg';
import * as Icons from "react-icons/vsc"
import { NavLink, useLocation } from 'react-router-dom';


function SidebarLinkComponent({link, iconName}) {
  
    const Icon = Icons[iconName];
    const location = useLocation();

   console.log("Link and icon Name: ", link, iconName)
   console.log("ICON: ", Icon);

    return (
        <NavLink to={link.path} className={`${link.path === location.pathname ? "bg-yellow-700 text-richblack-25" : "bg-opacity-0"  } relative px-8 py-2 text-sm font-md`}>
        
            <span className={`${link.path === location.pathname ? "bg-yellow-100" : "opacity-0" } absolute left-0 top-0 h-full w-[0.2rem] `}></span>
            
            <div className='flex items-center gap-x-3'>
                {/* <span><Icon /></span> */}
                <CgProfile />
                <span>{link.name}</span>
            </div>

        </NavLink>  
  )
}
export default SidebarLinkComponent;