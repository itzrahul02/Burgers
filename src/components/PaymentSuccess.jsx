import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "./Context";

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");
    const {setCartItems} = useContext(cartContext)
    const navigate = useNavigate()

    useEffect(() => {
        toast.success("Thanks for the Order");
        setCartItems([]);  
    }, [setCartItems]);
    
    return (

        <>
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold uppercase text-green-600">Order Successful</h1>
                <p className="text-gray-700 mt-3">Reference No. <span className="font-semibold">{referenceNum}</span></p>
            </div>
            <button className="border bg-green-500 rounded-md text-white px-4 py-2 font-bold text-lg" onClick={()=>navigate('/')}>Back</button>
        </div>

        </>
        
    );
};

export default PaymentSuccess;
