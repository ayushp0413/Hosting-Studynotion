import React from "react"
import {toast} from "react-hot-toast"
import { catagories } from "../apis";
import axios from "axios"
import { apiConnector } from "../apiConnector";


export const getCatalogPageData = async (cid)=>{

    let result = [];
   
    try
    {
         const response = await apiConnector("POST",  catagories.CATEGORY_PAGE_DETAILS_API, {categoryId: cid})
         if(!response?.data?.success) {
            throw new Error("Could not fetched category page data");
         }

         result = response?.data; // data contains all type of courses

    }catch(err)
    {   
        console.log(err);
        toast.error(err.message);
    }
    
    return result;

}
