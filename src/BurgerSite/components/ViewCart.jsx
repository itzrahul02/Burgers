import React, { useContext, useState } from "react";
import { cartContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
            removeCard(id)
        }
    }
    function handleLogIn(){
        if (!isLoggedIn){
            navigate('/login')
        }
        else{
            toast.success("Thanks for the Order")
            navigate('/')
            setCartItems([])
        }
    }

    function removeCard(id){
        setCartItems(cartItems.filter((each)=>each.id!==id))
    }
    const total = cartItems.reduce((sum, each) => sum + each.price * quantities[each.id], 0);
    return (
        <>
            <div className="bg-yellow-400 p-[2rem] min-h-screen h-full pb-[2rem] pt-[5rem] space-y-5 flex flex-col items-center justify-center">
                {(cartItems.length!==0) ?
                cartItems.map((each,index)=>(
                    <div key={each.id} className=" card min-w-[50%] shadow-lg flex bg-white/90 items-end space-x-5 rounded-lg">
                    <div>
                        <img src={each.image} alt="Burger" className="w-[13rem] h-28 rounded-md shadow-lg" />
                    </div>
                    <div className="w-full p-4 ">
                        <p className="font-bold text-xl text-gray-800">{each.name}</p>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-slate-700 text-lg font-semibold">₹{parseInt(each.price)*quantities[each.id]}</p>
                            <div className="flex items-center bg-orange-700 text-white sm:px-4 sm:py-2 sm:text-[1rem] text-[0.8rem] p-1 rounded-md font-bold shadow-md">

                            {quantities[each.id]>0?
                            (<>
                             <button className="hover:bg-orange-800 sm:px-2 px-1 rounded" onClick={()=>handleQuantity(-1,each.id)}>-</button>
                                    <span className="px-2">
                                        {quantities[each.id]}
                                    </span>
                                <button 
                                    onClick={() => handleQuantity(1,each.id)} 
                                    className="hover:bg-orange-800 sm:px-2 px-1 rounded"
                                >
                                    +
                                </button>
                            </>)
                            :removeCard(each.id)
                            }
                                                            
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                )):
                (<div className="text-orange-800 text-center">
                 <div 
                className="font-bold text-5xl" 
                style={{
                    fontFamily: 'Flame', 
                    textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)' 
                }}
                >
                OOPS!
                </div>

                 <div className="text-xl">No item is added</div>
                </div >)}
                {total>0 && (
                 <div className="bg-white/90 space-x-4 shadow-xl p-4 rounded-xl min-w-[80%] sm:min-w-[60%] md:min-w-[60%] flex justify-between items-center mt-4">
                 <p className="text-lg font-bold">Total</p>
                 <div className="flex items-center space-x-4 w-full justify-between">
                     <p className="text-lg font-semibold">₹{total}/-</p>
                     <button className="bg-orange-700 px-4 py-2 rounded-lg text-white font-semibold hover:bg-orange-800 w-auto" onClick={handleLogIn}>
                         Order Now
                     </button>
                 </div>
                 </div>
                )}
                
            </div>
        </>
    );
}
