import React, { useEffect, useRef, useState } from 'react'
import "../../App.css";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { LuShoppingCart } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import toast from 'react-hot-toast'
import { apiConnector } from '../../services/apiConnector'
import { catagories } from '../../services/apis'
import ProfileDropdownComponent from '../core/Auth/ProfileDropdownComponent'
import { BiCross, BiHandicap } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'


function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchBar,  setSearchBar] = useState(false);
    const [subLinks, setSubLinks] = useState([]);
    const searchRef = useRef(null); 
    const [category, setCategory] = useState([]);
    const [displaySearchItems, setDisplaySearchItems] = useState([]);

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile); // login k time set kiya hai services me se
    const {totalItems} = useSelector((state) => state.cart); 


    function searchBarToggle(){
        setSearchBar(!searchBar);
    }

    function changeHandle(e) {
        var userValue  = e.target.value
        
        // concept of debouncing 
        setTimeout(() => {
            const searched = category.filter((cat) => cat?.name.startsWith(userValue));
            setDisplaySearchItems(searched);
        },1000)
        
    }

    const fetchSubLinks = async() => {
        try{
            const result = await apiConnector("GET", catagories.CATAGORIES_API);
            setSubLinks(result.data.data);
        }catch(err)
        {
            console.log("Could not fetch catalog");
            toast.error("Could not fetch Catalog list")
        }

    }
    const fetchCategories = async () => {
        const response  = await fetchCourseCategories();
        if(response)
        {
            setCategory(response);
        }
    }

    useEffect(()=> {
        fetchSubLinks();
        fetchCategories();
    },[])
    
    useEffect(() => {
        if(searchBar && searchRef.current){
            console.log("HeLlo world")
            searchRef.current.focus();
        }
    },[searchBar])

    const MenuRef = useRef(null);
    const handleMenu = () => MenuRef.current.classList.toggle("show__menu");


  return (
    <div className='fixed top-0 left-0 z-50 w-screen  flex flex-col gap-y-12 h-14 items-center bg-richblack-800 justify-center border-b-[1px] border-richblack-700'>
        
        <div className='w-11/12 max-w-maxContent flex flex-row justify-between items-center'>

            {/* LOGO */}
            <div>
                <Link to={"/"}>
                    <img src={logo} width={160} alt='logo'></img>
                </Link>
            </div>

            {/* NAVLINKS */}
            <nav ref={MenuRef} onClick={handleMenu} className='menu'>
                <ul className='md:opacity-100 md:flex flex-row gap-3 items-center text-richblack-25'>
                    {
                        NavbarLinks.map( (link , index) => {
                            return (
                                <li key={index} className=''>
                                {
                                    link.title!== "Catalog" ? 
                                    (<div className={`${link.path === location.pathname ? "text-yellow-25 border-b-[1px] border-yellow-5" : ""}`}>
                                        <Link to={link.path}>
                                            <p>{link.title}</p>
                                        </Link>
                                    </div>) : 
                                    (
                                        <div className=" relative flex flex-row gap-x-1 justify-center group items-center">
                                            
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle fontSize={17}/>
           
                                                <div className='opacity-0 invisible flex flex-col absolute bg-richblack-5 w-[300px]  top-[140%] z-20 rounded-lg group-hover:opacity-100 group-hover:visible text-richblack-900 transition-all p-4 '>
                                                    <div className='opacity-0 absolute bg-richblack-5 w-14 h-14 rotate-45 top-[-1%] left-[50%] -z-10 rounded-lg group-hover:opacity-100'></div>

                                                    {
                                                        // backend se aayga data
                                                        subLinks.length > 0 ? 
                                                        (
                                                            subLinks.map( (subLink , index) => {
                                                            return (
                                                                
                                                                <Link to={`/category/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                                    <div className=''>
                                                                        <p className='hover:bg-richblack-50 rounded-md p-2'>
                                                                            {subLink.name}
                                                                        </p>
                                                                    </div>
                                                                    
                                                                </Link>
                                                            )
                                                        })
                                                        ) : 
                                                        (<div></div>)
                                                    }
                                                
                                                </div>
                                          
                                        </div>
                                    )
                                }
                                
                            </li>
                            )
                        }      
                       )
                    }
                </ul>
            </nav>
            <span onClick={handleMenu} className=' text-white text-2xl text-smallTextColor md:hidden cursor-pointer'>
                <RxHamburgerMenu/>
            </span>

            {/* LOGIN/SIGNUP BUTTONS */}
             
            <div className='opacity-0 hidden md:opacity-100 md:flex flex-row items-center gap-3 text-white transition-all duration-200 relative'>

                <div className='relative flex flex-row items-center'>                   
                    {
                        searchBar ? ( 
                            <input
                                type='text'
                                ref={searchRef} 
                                className='outline-none border-0 px-3 py-1 mr-2 rounded-lg bg-blue-500  transition-all ease-in duration-1000'
                                placeholder="Search Course..."
                                onChange={changeHandle}
                                >
                            </input>

                            ) : (<div></div>) 
                    }
                    {
                       searchBar ? (<CgClose onClick={searchBarToggle} fontSize={25} color='white' className="cursor-pointer"></CgClose>) : (<CiSearch onClick={searchBarToggle} fontSize={25} color='white' className="cursor-pointer"></CiSearch>)  
                    }
                   
                </div>
                

                 {
                    // if the user is logged in and he is student
                    user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                        <LuShoppingCart className='text-lg' />
                        <div className={`${totalItems > 0 ? "absolute top-2 left-2 w-[15px] h-[15px] bg-yellow-50 rounded-full aspect-square flex justify-center items-center" : " "}`}>
                            {
                                totalItems > 0 && (
                                    <span className=' text-richblack-900 py-2 px-1'>
                                        {totalItems}
                                        
                                    </span>
                                )
                            }    
                        </div>
                        
                        </Link>
                    )
                }

                
                
                {
                    token === null ? (
                        <Link to={"/login"}>
                            <button className='border-[1px] border-richblack-700 px-3 py-2 rounded-md  hover:scale-95'>
                                Login
                            </button>
                        </Link>
                    ) : (<div></div>)
                }  

                {
                    token === null ?  (
                    <Link to={"/signUp"}>
                        <button className='border-[1px] border-richblack-700 px-3 py-2 rounded-md  hover:scale-95'>
                            Sign Up
                        </button>
                    </Link>
                    ) : (<div></div>)
                } 
                
                {
                    token!=null  && ( 
                        <ProfileDropdownComponent/>
                     )
                }
            </div>

            <div className=' absolute top-12 right-[25%] bg-richblack-50 w-[215px] rounded-md'>
            {
                searchBar && displaySearchItems.length > 0 &&  (
                <ul className='p-3'>
                {
                     displaySearchItems?.map((item, index) => (
                        <Link to={`/category/${item.name.split(" ").join("-").toLowerCase()}`} key={index}>
                            <li className='hover:bg-blue-500 hover:text-white p-2 rounded-md'>{item?.name}</li>
                        </Link>    
                     ))
                     
                }
                </ul>
                ) 
            }
                
            </div>

        </div>
      
     </div>
  )
}

export default Navbar
