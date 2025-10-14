import React, { useContext, useState } from "react";
import { cartContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export function Cart() {
    const navigate=useNavigate();
    const {cartItems,setCartItems,isLoggedIn,updateQuantity}=useContext(cartContext)
    console.log("CartItems",cartItems);

    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, each) => {
            acc[each.id] = each.quantity; 
            return acc;
        }, {})
    );

    console.log("quantity",quantities);

    function handleQuantity(increment,id){
        updateQuantity(id,increment)
        setQuantities((prev)=>({
            ...prev,
            [id]:Math.max((increment+prev[id]),0)
        }))
        if(quantities.id===0){
          console.log("quantity zero ho gai");
            removeCard(id)
        }
    }
    function handleLogIn(){
        if (!isLoggedIn){
            navigate('/login')
        }
        else{
            checkoutHandler()
            
        }
    }

    function removeCard(id){
        setCartItems(cartItems.filter((each)=>each.id!==id))
    }
    async function checkoutHandler(){
        try{
            const {data:{key}} = await axios.get("https://burgers-y7t2.onrender.com//api/getkey")

            const {data} = await axios.post("https://burgers-y7t2.onrender.com//api/checkout",{amount:total}) 
            console.log("data is",data);
            const options = {
                key: key, // Enter the Key ID generated from the Dashboard
                amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Burger Seller",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: "https://burgers-y7t2.onrender.com//api/paymentverification",
                prefill: {
                    name: "Rahul Sharma",
                    email: "rahulbikker@gmail.com",
                    contact: "8604400838"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.success",function(response){
                window.location.href = `https://burgers-y7t2.onrender.com//paymentsuccess?reference=${response.razorpay_payment_id}`
            })
            rzp1.open()
            
            
        }
        catch(error){
            console.log("payment error:",error);
        }
       
    }
    const total = cartItems.reduce((sum, each) => sum + each.price * quantities[each.id], 0);
    return (
        <>
            <div className="bg-[#121212] min-h-screen pt-[6rem] pb-[6rem] px-4 sm:px-10 font-[Flame] text-white">
  {cartItems.length !== 0 ? (
    <>
      <h2 className="text-4xl sm:text-5xl font-bold text-orange-400 mb-8 text-center">Your Cart</h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row bg-[#1e1e1e] rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all overflow-hidden">
            <img src={item.image} alt={item.name} className="sm:w-40 w-full h-[180px] object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none" />
            <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400">Price: ₹{item.price} × {quantities[item.id]}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-bold text-green-400">₹{item.price * quantities[item.id]}</p>
                <div className="flex items-center space-x-3 border border-orange-500 rounded-full px-3 py-1 bg-[#2b2b2b]">
                  <button
                    className="text-orange-400 text-xl font-bold px-2 hover:text-orange-300 transition"
                    onClick={() => handleQuantity(-1, item.id)}
                  >−</button>
                  <span className="text-lg font-medium">{quantities[item.id]}</span>
                  <button
                    className="text-orange-400 text-xl font-bold px-2 hover:text-orange-300 transition"
                    onClick={() => handleQuantity(1, item.id)}
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Checkout Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1a1a1a] shadow-2xl px-4 sm:px-10 py-4 flex justify-between items-center z-50 border-t border-gray-700">
        <div>
          <p className="text-lg text-gray-400">Total:</p>
          <p className="text-2xl font-bold text-orange-400">₹{total}/-</p>
        </div>
        <button
          onClick={handleLogIn}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold text-lg transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  ) : (
    <div className="text-center text-orange-300 pt-16">
      <h2 className="text-6xl font-bold mb-4">OOPS!</h2>
      <p className="text-xl font-light text-gray-400">Your cart is empty in the dark... 🍽️</p>
    </div>
  )}
</div>

        </>
    );
}
