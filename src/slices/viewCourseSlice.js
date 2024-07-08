import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData:[],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLEctures: [],
}


const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state, action) =>{
            state.courseSectionData = action.payload
        },
        setCourseEntireData: (state, action) =>{
            state.courseEntireData = action.payload
        },
        setCompletedLectures: (state, action) =>{
            state.completedLectures = action.payload
        },
        setTotalNoOfLEctures: (state, action) =>{
            state.totalNoOfLEctures = action.payload
        },
        // extra function to update the completed llecture
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },

    }

})


export const { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLEctures, updateCompletedLectures } = viewCourseSlice.actions

export default viewCourseSlice.reducer