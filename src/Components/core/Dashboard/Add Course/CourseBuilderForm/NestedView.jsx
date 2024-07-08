import React, { useReducer, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {RiDeleteBin6Line} from "react-icons/ri"
import {MdEdit} from "react-icons/md"
import {AiOutlinePlus} from "react-icons/ai"
import { IoMdArrowDropdown } from "react-icons/io";
import { setCourse } from '../../../../../slices/courseSlice'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from "../../../../common/ConfirmationModal"

function NestedView({handleChangeEditSectionName}) {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    
    
    const summaryRef = useRef();
    
    const drop = () => {
        summaryRef.current.click();
    }
    
    const handleDeleteSection = async(sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        },token);
        
        console.log("PRINTING AFTER DELETE SECTIOn", result);
        if(result) {
            console.log("rsult after section delete: ", result);
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }
    
    const handleDeleteSubSection = async(subSectionId, sectionId) => {
        // edit subsection api call
        const result = await deleteSubSection({subSectionId, sectionId, courseId: course._id}, token);
        if(result) {
            //TODO: extra kya kar skte h yaha pr 
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }
    
    useEffect(() => {
        console.log("Rendering it again");
    });
    
    
    return (
        <div>
        <div className='w-full bg-richblack-700 rounded-md px-6 py-4 flex flex-col gap-4 justify-between'>
            {course?.courseContent?.map((section) => (
                <details key={section._id} open className='w-full'>
                    
                    <summary ref={summaryRef} className='flex w-full justify-between'>
                        
                        <div className='flex items-center gap-2'>
                            <RxDropdownMenu className='text-2xl'/>
                            <p className='font-semibold tracking-wider text-richblack-50'>{section.sectionName}</p> 
                        </div>
                        
                       <div className='flex gap-x-2 items-center'>
                        <button
                                onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                className='corser-pointer'
                            >
                            <MdEdit className='text-lg' />
                            </button>

                            <button
                                onClick={() => setConfirmationModal({
                                    text1: "Delete this Section",
                                    text2: "All the lectures in this section wil be deleted",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null),
                                })}
                            >
                                <RiDeleteBin6Line className='text-md'/>
                            </button>
                            <span className='text-richblack-500'>|</span>
                            <IoMdArrowDropdown className='text-lg cursor-pointer'  />     
                       </div>
                    </summary>
                    
                    {/* subsection */}
                    <div className='mt-2'>
                    {
                        section?.subSection?.map((data) => (
                            <div key={data._id} onClick={()=> setViewSubSection(data)} className='flex items-center justify-between  gap-x-6 mt-1 border-b-2 border-richblack-600 border-dotted'>
                                
                                <div className='flex items-center gap-2'>
                                    <RxDropdownMenu className='text-xl'/>
                                    <p className='text-sm tracking-wider text-richblack-100'>{data?.title}</p> 
                                </div>

                                <div
                                 onClick={(e) =>e.stopPropagation()}
                                 className='flex items-center gap-x-3'>
                                    <button
                                       onClick={() => setEditSubSection({...data, sectionId:section._id})}
                                    >
                                    <MdEdit />
                                    </button>
                                    <button
                                    onClick={() => setConfirmationModal({
                                        text1: "Delete this Sub Section",
                                        text2: "selected Lecture will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                        btn2Handler: () => setConfirmationModal(null), })}
                                    >
                                    <RiDeleteBin6Line />  
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    <button
                    onClick={() => setAddSubSection(section._id)}
                    className='mt-4 flex items-center gap-x-2 text-yellow-50 text-sm'
                    >
                        <AiOutlinePlus />
                        <p>Add Lecture</p>
                    </button>
                    </div>
                    <div className='w-full bg-richblack-500 border-b border-yellow-300 border-dotted'></div>
                </details>
            ))}
        </div>

        {
            addSubSection ?     
            (<SubSectionModal
            modalData = {addSubSection}
            setModalData = {setAddSubSection}
            add={true}
            />)    
            : viewSubSection ? 
            (<SubSectionModal
            modalData = {viewSubSection}
            setModalData = {setViewSubSection}
            view={true}

            />) 
            : editSubSection ?   
            (<SubSectionModal
            modalData= {editSubSection}
            setModalData = {setEditSubSection}
            edit={true}
            />)  
            : (<div></div>)
        }

        {confirmationModal ? 
        (
            <ConfirmationModal modalData={confirmationModal} />
        )
        : (<div></div>)
        }
        
    </div>
  )
}

export default NestedView
