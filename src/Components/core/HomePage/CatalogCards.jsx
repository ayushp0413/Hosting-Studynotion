import { useState } from 'react';
import HighlightText from './HighlightText'
import  {HomePageExplore} from "../../../data/homepage-explore";
import CourseCard from './CourseCard';

    

function CatalogCards() {

    const tagNames = [
        "Free",
        "New to Coding",
        "Most Popular",
        "Skill Paths",
        "Career Paths",
    ]

    const [currentTab, setCurrentTab] = useState(tagNames[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);



    // here the value is tag Name 
    function setCatalog( value ) {

        console.log("Value if value: ", value)
        
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value)
        console.log("inside setCatalog: ", result);

        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);   
    }


  return (
    <div className='mt-24 mb-[180px] w-full flex flex-col justify-center items-center gap-6'>

        <div className='flex flex-col gap-y-3'>
            <p className='text-4xl font-bold text-center'>Unlock the <HighlightText text={"Power of Code"}/></p>
            <p className='text-md text-richblack-300 text-center'>Learn to Build Anything You Can Imagine</p>
        </div>

        {/* menu tags  */}
        <div className='hidden md:flex flex-row gap-x-3 justify-center items-center bg-richblack-800 text-richblack-100 transition-all duration-200 rounded-full cursor-pointer'>
            {
                tagNames.map ( (element , index) => {
                    return (
                        <div className={`px-4 py-1 m-2 mx-2 rounded-full transition-all duration-300 ${currentTab === element ? "text-white bg-richblack-900" : "hover:bg-richblack-900 hover:text-white  hover:transition-all hover:duration-200 "}  `}
                        onClick={()=>{setCatalog(element)}}
                        key={index}
                        >
                        {element}
                                       
                        </div>
                    )
                })
            }

        </div>

         {/* course card ka group */} 

         <div className='relative w-[1111px] mt-16 cursor-pointer'>

            <div className='w-full lg:absolute grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-y-10'>
                {
                    courses.map(  (course, index) => {
                        return (
                            <CourseCard  //for one card
                            key={index}
                            cardData = {course}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                            />
                        )
                    } )
                }
            </div>   
         </div>
        
    </div>
  )
}

export default CatalogCards 

