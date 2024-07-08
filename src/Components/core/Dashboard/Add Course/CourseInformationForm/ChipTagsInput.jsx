import React, { useState , useEffect } from 'react'
 
// we use two state variables for that 
// 1st for storing user typed value
// 2nd us value to array me store kr denge when hit enter or comma
// then vo array ko render kr denge


function ChipTagsInput({label, name, register, errors , setValue , getvalues}) {

    const [tag, setTag] = useState("");
    const [tagsList, setTagsList] = useState([]);

    useEffect(()=> {
        register(name,{required:true})
    },[])

    useEffect(()=>{
        setValue(name,tagsList);
    },[tagsList])




    const addToTags = (e) => {
        
        if((e.keyCode === 13 || e.keyCode === 188) && tag )
            {
                setTagsList([...tagsList, tag]);
                setTag(""); // to clear the input field value
                e.preventDefault(); // vo pata nhai kyo remove function call ho raha tha baar baar
        }
    }

    const removeFromTags = (index) => {
        console.log("Remove function invoked", index)
        const updatedTagsList = [...tagsList];
        updatedTagsList.splice(index,1);
        setTagsList(updatedTagsList);
    }



    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={name} className='text-xs text-richblack-25'>{label}<sup className='text-pink-700'>*</sup></label>
            
            {
                tagsList.length > 0 && (

                <ul className='flex gap-1 flex-wrap '>
                    {
                        tagsList.map((tag, index) => (
                            <li key={index} className='flex flex-row justify-start items-center w-fit gap-1 text-sm text-richblack-800 bg-yellow-100 rounded-md px-2 py-1'>
                                <p>{tag}</p>
                                <button
                                    onClick={() => removeFromTags(index)}
                                    className=' bg-yellow-25 rounded-full aspect-square w-[13px] h-[13px]
                                    flex justify-center items-center p-[0.56rem]
                                    '>
                                    x
                                </button>

                            </li> 

                        ))
                   }
                </ul>)
            }


            <input
                type='text'
                name={name}
                id={name}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={addToTags}

                placeholder='Enter tags'
                className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
               outline-none px-3 placeholder:text-sm'

            />
            
        </div>
    )
  
}

export default ChipTagsInput
