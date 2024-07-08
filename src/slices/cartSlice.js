import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ?
    JSON.parse(localStorage.getItem("cart")) :
    [],

    // quantity
    totalItems: localStorage.getItem("totalItems") ?
    JSON.parse(localStorage.getItem("totalItems")) :
    0, 

    // amount
    total : localStorage.getItem("total") ?
    JSON.parse(localStorage.getItem("total")) :
    0, 
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{

        addToCart : (state , action) => {

            const course = action.payload;
            // precaution
            const index = state.cart.findIndex((item) => item._id === course._id)  
            if(index >= 0) {
                // item already present in cart
                toast.error("Course already in cart");
                return 
            }

            state.cart.push(course);
            // update price and quantity
            state.totalItems++;
            state.total += course.price;

            // now store them to local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            toast.success("Course added to cart");
        } ,

        // delete from id
        removeFromCart: (state, action) => {
            const courseId = action.payload;

            const index = state.cart.findIndex((item) => item._id === courseId)

            if(index >=0 ){
                // delete from cart

                state.totalItems--;
                state.total -= state.cart[index].price;
                // state.cart.filter( (item) => item._id!== courseId)
                state.cart.splice(index, 1);

                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")

                return; 
            }
        },

        resetCart: (state) => {
            // set all to initial state and also removed from localstorage
            state.cart=[];
            state.total=0;
            state.totalItems=0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    },
});

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions 
export default cartSlice.reducer;