import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { catagories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponents';
import Course_Card from '../Components/core/Catalog/Course_Card';
import CourseSlider from '../Components/core/Catalog/CourseSlider';
import Footer from "../Components/common/Footer"
import "../App.css"

export default function Catalog() {

  const {categoryName} = useParams();
  const [categoryPageData, setCategoryPageData] = useState([]);
  const [categoryId, setCategory] = useState(); 
  const [active1 , setActive1] = useState(true);
  const [active2 , setActive2] = useState(false);
  const [loading, setLoading] = useState(false);



  const getCategories = async() => {

    setLoading(true);
    try{
      const res = await apiConnector("GET", catagories.CATAGORIES_API);
      const category_id = res?.data?.data?.filter( (ct) => ct.name.split(" ").join("-").toLowerCase() === categoryName)[0]._id;
      setCategory(category_id);
    }catch(err)
    {
      console.log("Get categories error", err.message);
    }
    setLoading(false);
  }

  const getPageDetails = async() => {
    setLoading(true);
    try
    {
      const res = await getCatalogPageData(categoryId);
      console.log("Printing res : ", res);
      setCategoryPageData(res);

    }catch(err)
    {
      console.log("Get page details error", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
      getCategories();
  },[categoryName])


  useEffect(() => {
      if(categoryId) {
        getPageDetails();
      }
  },[categoryId])



  return (
    <div className='text-white mt-14 '>
    {
      loading ? (
        <div className='flex h-screen justify-center items-center'>
          <div className="spinner"></div>
        </div>
        )
       :
      (<div> 
        <div className='flex flex-col justify-center bg-richblack-800 h-[250px] px-16 py-4'>
          <div className='text-md flex flex-col gap-3'>
              <p className='text-sm text-richblack-200'>{`Home / Category / `}<span className='text-md text-yellow-50'>{categoryPageData?.data?.selectedCategory?.name}</span></p>
              <p className='text-3xl text-richblack-25'>{categoryPageData?.data?.selectedCategory?.name}</p>
              <p>{categoryPageData?.data?.selectedCategory?.description}</p>  
          </div>
       </div>

       <div className=' w-11/12 flex flex-col justify-center mx-auto gap-24 mt-12'>
          
          {/* section 1 */}
          <div className='flex flex-col gap-2'>
              
              <p className='text-3xl text-richblack-5 font-bold'>Course to get you started</p>
              <div className='flex gap-5 mt-6 text-richblack-50 cursor-pointer'>
                <button className={`${active1 ? "text-yellow-100 border-b border-yellow-100" : ""}`}
                  onClick={() => {
                    setActive1(true);
                    setActive2(false);
                  }} >Most Popular</button>
                <button className={`${active2 ? "text-yellow-100 border-b border-yellow-100" : ""}`}
                  onClick={() => {
                    setActive1(false);
                    setActive2(true);
                  }} >New</button>
              </div>
              <div className='w-full h-[1px] text-richblack-400 border border-double -mt-2'></div>
              <div className='mt-4'>
                <CourseSlider courses={categoryPageData?.data?.selectedCourses}/>
              </div>


          </div>
              
          {/*Section 2  */}
          <div className='flex flex-col gap-2 mt-12'>  
              <p className='text-3xl text-richblack-5 font-bold'>Top Courses of Our Website</p>
              <div className='mt-4'>
                <CourseSlider courses={categoryPageData?.data?.differentCourses}/>
              </div>
          </div>

          {/* section 3 Most selling courses */}
          <div className='mt-12 mb-12'>
            <p className='text-3xl font-bold'>Frequently Bought</p>
            
            <div className='py-8'>
                  <div className='grid grid-col-1 lg:grid-cols-2 place-items-center  gap-x-5 gap-y-12  '>
                    {
                      categoryPageData?.data?.mostSellingCourses?.slice(0,4).map((course, index) => (
                        <Course_Card course={course} key={index} height={450} size={true}/>
                      ))
                    }
                  </div>
            </div>
            
          </div>
       </div>
      
      <Footer />
    
      </div>)
    }
       
    </div>
  )
}
