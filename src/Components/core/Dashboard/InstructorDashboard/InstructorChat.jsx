
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

import { DiResponsive } from 'react-icons/di';
ChartJS.register(ArcElement, Tooltip, Legend);

function InstructorChat({ courses }) {

    const [currChart, setCurrChat] = useState("Student");

    ///function to get random color 

    const getRandomColor = (numColor) =>{
        const colors = [];

        for(let i=0 ; i < numColor ; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}) `
            colors.push(color);
        }

        console.log("Colors are: ", colors);
        return colors;
    }

    // student data created

    const StudentChartData = {
        labels : courses.map((course) =>course.courseName),
        datasets : [
            {
                data: courses.map((course) => course.totalStudentEnrolled),
                backgroundColor: getRandomColor(courses.length),
                borderColor: '#070546'
            }
        ],
    }

    // Income related Data

    const IncomeChartData = {
        labels : courses.map((course) =>course.courseName),
        datasets : [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColor(courses.length)
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };


  return (
    <div className='max-w-maxContent min-w-[70%]'>
        <div className='flex flex-col items-start gap-3 bg-richblack-800 rounded-md px-5 py-5'>
            <p className='text-2xl font-bold text-richblack-50 '>Visual Insights</p>

            <div className='flex gap-3 transition-all duration-200'>
                <button
                 className={`${currChart === "Student" ? " bg-richblack-700 rounded-md px-2 py-1 text-yellow-50" : " "  }`}
                 onClick={() => setCurrChat("Student")}>Student</button>
                <button 
                className={`${currChart === "Income" ? " bg-richblack-700 rounded-md px-2 py-1 text-yellow-50" : " "  }`}
                onClick={() => setCurrChat("Income")}>Income</button>
            </div>
            
            <div className="relative mx-auto aspect-square lg:h-[320px] w-full">
               <Doughnut
                    data={currChart === "Student" ? StudentChartData : IncomeChartData}
                    options={options}

               ></Doughnut>
            </div>

        </div>
    </div>
  )
}

export default InstructorChat
