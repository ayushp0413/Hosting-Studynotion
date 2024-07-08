import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../Add Course/RenderSteps"
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI"

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)


    const getFullDetails = async() => {

        setLoading(true)
        const result = await getFullDetailsOfCourse(courseId, token)
        console.log("result: ", result);

          if (result?.courseDetails) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
          }
        setLoading(false);
    }


  useEffect(() => {
    getFullDetails();
  }, [])

  if (loading) {
    return (
      <div className='flex h-screen justify-center items-center'>
      <div className="spinner"></div>
    </div>
    )
  }

  return (
    <div>
      <h1 className="mb-12 mt-12 text-3xl font-medium text-richblack-50">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px] flex justify-center">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-2xl text-richblack-100">
            Course not found....
          </p>
        )}
      </div>
    </div>
  )
}