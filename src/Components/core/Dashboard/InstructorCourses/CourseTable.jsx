import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from '../../../../services/formatDate';
import { COURSE_STATUS } from '../../../../utils/constants';
import { HiClock } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useSelector } from 'react-redux';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';

function CourseTable({courses, setCourses}) {

  const {token } = useSelector((state) =>state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [confirmationModal , setConfirmationModal] = useState(null);

  const handleCourseDelete = async(courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token); // delete course 
    const result = await fetchInstructorCourses(token); // fetch remaining courses
    if (result) {
      setCourses(result); // state variable form props
    }
    setConfirmationModal(null);
    setLoading(false);
  }
  
  
  
  return (
    <div>
      {
          loading ? ( <div className='flex h-screen justify-center items-center'>
            <div className="spinner"></div>
          </div>) : 
          ( 

            <Table className="rounded-xl border border-richblack-800 ">
          <Thead>
            <Tr className="flex justify-between gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
              <Th className="flex-1 text-left text-md font-semibold uppercase text-richblack-100">COURSES</Th>
              <Th className="text-left text-md font-semibold uppercase text-richblack-100">DURATION</Th>
              <Th className="text-left text-md font-semibold uppercase text-richblack-100">PRICE</Th>
              <Th className="text-left text-md font-semibold uppercase text-richblack-100">ACTIONS</Th>
            </Tr>
          </Thead>

          <Tbody>
          {
            courses?.length === 0 ? 
            (<Tr>
                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                  No courses found
                  {/* TODO: Need to change this state */}
                </Td>
              </Tr>
            ) :
            (
                courses?.map((course) => (
                  <Tr key={course._id}  className="flex justify-between gap-x-10 border-b border-richblack-800 px-6 py-8">
                    
                    <div>
                      <Td className="">
                        <div className='flex flex-col lg:flex-row gap-3'>
                          <img src={course?.thumbnail} alt={course?.courseName}
                            className='h-[148px] w-[220px] rounded-lg object-cover'
                          />
                          <div className="flex flex-col gap-1">
                              <p className='text-lg text-richblack-200'>{course?.courseName}</p>
                              <p className='text-md text-richblack-200 max-w-[280px]'>{
                                  course?.courseDescription.length > 70 ? (course?.courseDescription.substring(0,70)+"...") : 
                                  (course?.courseDescription)
                                }
                              </p>
                              <p className='text-xs text-richblack-200'>
                                Created: {formatDate(course?.createdAt)}
                              </p>
                              {course.status === COURSE_STATUS.DRAFT ? (
                                  <p className="mt-12 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                    <HiClock size={14} />
                                    Drafted
                                  </p> ) :
                                (
                                  <p className="mt-6 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-caribbeangreen-400">
                                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-caribbeangreen-400 text-richblack-700">
                                      <FaCheck size={8} />
                                    </div>
                                    Published
                                  </p>
                                )}
                          </div>
                        </div>
                      </Td>
                    </div>

                    <div className='flex gap-14'>
                      <Td className=" text-sm font-medium text-richblack-100">
                        {course?.courseContent?.subSection?.timeDuration || "2:30min"}
                      </Td>

                      <Td className="text-sm font-medium text-richblack-100">
                        ₹{course.price}
                      </Td>

                      <Td className=" flex flex-row text-sm font-medium justify-start items-start text-richblack-100 ">
                        <button
                        type='button'
                        title='Edit Course'
                        onClick={() => {
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                        >
                        <FiEdit2 size={20} />
                        </button>
                        <button
                        type='button'
                        title='Delete course'
                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                        onClick={() => setConfirmationModal({
                          text1: "Do you want to delete this course?",
                            text2:
                              "All the data related to this course will be deleted",
                            btn1Text: !loading ? "Delete" : "Loading...  ",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () => handleCourseDelete(course._id)
                              : () => {},
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                        }) }
                        >
                        <RiDeleteBin6Fill size={20} />
                        </button>


                      </Td>
                    </div>
      
                  </Tr>
                ))
            )
          }
            <Tr></Tr>
          </Tbody>

            </Table>

          )
      }
    
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseTable
