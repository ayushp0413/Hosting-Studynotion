import React from 'react'

const  IconBtn = ({text, children, onclick, disabled, type, customClasses,outline=false}) => {
  return (
    <button 
    onClick={onclick} disabled={disabled} type={type}
    className={`${customClasses ? `${customClasses} bg-yellow-100 px-4 py-2 rounded-md text-richblack-800 flex items-center gap-3` : "bg-yellow-100 px-4 py-2 rounded-md text-richblack-800 flex items-center gap-3" }`}>
        {
            children ? (
                <>
                <span >{text}</span>
                {children}

                </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn
