import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";
import rzrpay from "../../assets/Logo/Logo-Full-Dark.png"
import { resetCart } from "../../slices/cartSlice";



const {CAPTURE_PAYMENT_API, VERIFY_SIGNATURE_API, SEND_PAYMENT_SUCCESSFUL_EMAIL_API} = studentEndpoints
 
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

// Open Modal of Razorpay
// capture payment api call
// send payment successfull mail
// verifySignature api call
export async function buyCourse(token, courses, userDetails, navigate, dispatch) {

    const toastId = toast.loading("Loading...");
    try
    {
        //load Script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // initiate order ->>> capturePayment call
        
        const orderResponse = await apiConnector("POST",CAPTURE_PAYMENT_API,
            {courses},
            {
                Authorization:`Bearer ${token}`
            }
        )

        if(!orderResponse.data.success) {       
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);

        const options = {
            key: process.env.RAZORPAY_KEY, // rzp_test_ABMgWcpTJjuDxP
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzrpay,
            prefill: {
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email
            },
            handler : function (response) {
                // API Calls
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
                verifyPayment({...response, courses}, token, navigate,dispatch)
            } 
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("Oops, Payment Failed");
            console.log(response.error);
        })



    }catch(error)
    {
        console.log("PAYMENT API ERROR.....", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    
    try
    {
        await apiConnector("POST", SEND_PAYMENT_SUCCESSFUL_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    try{
        const response  = await apiConnector("POST",VERIFY_SIGNATURE_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
}