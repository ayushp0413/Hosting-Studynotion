import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';

function RequirementField({register, setValue, getValues, errors, label, name}) {
    
    const [requirement, setRequirement] = useState("");
    const [requirementList , setRequirementList] = useState([]);


    useEffect(()=> {
        register(name,{required:true})
    },[])

    useEffect(()=>{
        setValue(name,requirementList);
    },[requirementList])


    const handleAddButton = () => {
        console.log("handle add button");
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }

    const handleRemoveButton = (index) => {
        console.log("handle remove button");
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className='flex flex-col gap-1'>
        <label htmlFor={name} className='text-xs text-richblack-25'>{label}<sup className='text-pink-700'>*</sup></label>
        <div className='flex flex-col'>
            <input
            id={name}
            name={name}
            type='text'
            value={requirement}
            onChange={(e)=> setRequirement(e.target.value)}
            placeholder='Enter Requirements or Instructions'
            className='bg-richblack-700 rounded-md border-b border-richblack-500 py-2
            outline-none px-3 placeholder:text-sm'
            />
            <button
                type='button'
                onClick={handleAddButton}
                className='text-left mt-1 text-sm text-yellow-50'>
                Add 
            </button>
        </div>
        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((item,index) => (
                            <li key={index} className='flex gap-3'>
                                <p>{item}</p>
                                <button
                                    onClick={() => {handleRemoveButton(index)}}
                                    className='text-sm text-richblack-500'
                                > Clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }

        {errors[name] && (
            <span className='text-yellow-100 text-sm'>
                {label} is required
            </span>
        )}


    </div>

  )
}

export default RequirementField
