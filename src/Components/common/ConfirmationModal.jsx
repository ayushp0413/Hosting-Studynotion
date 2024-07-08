import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModal({modalData}) {

    console.log("Modal data: ", modalData);


  return ( 
    <div className='fixed  inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>

        <div className='border border-richblack-500 px-8 py-5 rounded-md bg-richblack-800'>
            <div className='flex flex-col gap-y-3 pr-8 '>
                <p className='font-bold text-richblack-50'>{modalData.text1}</p>
                <p className='text-sm text-richblack-500'>{modalData.text2}</p>    
                <div className='flex flex-row gap-4 font-semibold text-sm mt-3'>
                    <IconBtn
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />
                    <button onClick={modalData?.btn2Handler}
                    className='bg-richblack-100 px-4 py-2 rounded-md text-richblack-800'
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal
