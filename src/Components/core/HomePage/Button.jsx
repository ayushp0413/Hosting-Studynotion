import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({active , linkto, children}) {
  return (
    <Link to={linkto}>
        <div className={`px-6 py-3 flex flex-row  justify-center items-center gap-2 rounded-md font-bold text-center text-[15px] hover:scale-95 transition-all duration-300 ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white" }`}>
            {children}
        </div>
    </Link>
  )
}
