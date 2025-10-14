import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "./Context";
import NavBar from "../Nav";
import card1 from "../assets/card1.png";
import card2 from "../assets/card4.png";
import axios from "axios";

function Menu() {

  const { additems, updateQuantity, quantities } = useContext(cartContext);
  const [changeWidth, setChangeWidth] = useState([40, 0]);
  const [active, setActive] = useState(0);
  const [vegitems,setVegitems]=useState([])
  const [nonvegitems,setNonvegitems] = useState([])
  const [selectedItem,setSelectedItem]=useState(null)

  // Add item to cart with quantity 1
  function handleAddItem(item) {
    console.log("What is am sending",item);
    additems({ ...item, quantity: 1 });
  }

  // Update the quantity of an item
  function handleUpdateQuantity(id, increment) {
    updateQuantity(id, increment);
  }
  useEffect(() => {
    const handleBurgerData = async () => {
      try {
        const response = await axios.get("https://burgers-y7t2.onrender.com//api/burgers/getBurgerData"); 
        const data = response.data.data; 
        console.log("Fetched Burgers:", data); 
        const indexData=data.map((item,index)=>({ 
          ...item,
          id:index+1 
        }))

        const vegData=indexData.filter(each=>each.category.toLowerCase()==="veg")
        const nonvegData=indexData.filter(each=>each.category.toLowerCase()==="non-veg")
        setVegitems(vegData.map((item,index)=>({
          ...item,          
        })
      ))
        
        setNonvegitems(nonvegData.map((item,index)=>({
          ...item,
        })));
      } 
      catch (error) {
        alert(error.message)
        console.log("Error in getting burger data", error);
      }
    };
    console.log("veg items",vegitems);
    console.log("Non items",nonvegitems);
    handleBurgerData();
  }, []);

  return (
    <>
<NavBar />
<div className="bg-[#121212] min-h-screen mt-[4rem] text-white pb-10 px-4 sm:px-10">
  <h2 className="text-center font-bold text-4xl sm:text-5xl pt-8 text-orange-400 font-[Flame] tracking-wide">
    OUR MENU
  </h2>

  {/* Toggle Buttons */}
  <div className="w-fit mx-auto mt-6 text-lg sm:text-xl font-semibold relative flex gap-6">
    <button
      className={`pb-2 ${active === 0 ? "text-orange-400" : "text-gray-400 hover:text-orange-300"}`}
      onClick={() => { setChangeWidth([40, 0]); setActive(0); }}
    >
      Veg
    </button>
    <button
      className={`pb-2 ${active === 1 ? "text-orange-400" : "text-gray-400 hover:text-orange-300"}`}
      onClick={() => { setChangeWidth([100, 60]); setActive(1); }}
    >
      Non-Veg
    </button>
    <span
      className="absolute bottom-0 h-[2px] bg-orange-400 transition-all duration-300 ease-out"
      style={{ width: `${changeWidth[0]}px`, left: `${changeWidth[1]}px` }}
    />
  </div>

  {/* Menu Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
  {(active ? nonvegitems : vegitems).map((item) => (

    <div
      key={item._id}
      className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center hover:shadow-2xl transition duration-300"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-40 h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      <p className="text-gray-600 text-sm mt-2">₹{item.price}</p>
      <div className="flex items-center justify-center">
        <p className="text-black">{item.description.slice(0,10)}</p> 
        <span className="text-red-700" onClick={()=>setSelectedItem(item)}>...full</span>
      </div>
      {
        quantities[item.id]>=1?(
          <div className="flex items-center bg-orange-500/90 px-3 py-1 rounded-full text-white text-sm sm:text-base gap-2 font-bold">
                 <button onClick={() => handleUpdateQuantity(item.id, -1)} className="hover:text-gray-200">−</button>
                 <span>{quantities[item.id]}</span>
                 <button onClick={() => handleUpdateQuantity(item.id, 1)} className="hover:text-gray-200">+</button>
            </div>
        ):(
          <button
            onClick={() => handleAddItem(item)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded-full text-sm sm:text-base"
          >
            Add
          </button>
        )
      }

   {/* Popups */}
   {
    (selectedItem?(
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 " onClick={()=>setSelectedItem(null)}>
          <div className="bg-white p-6 rounded-2xl max-w-md w-full relative shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Popup content */}
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-40 h-40 object-cover rounded-xl mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {item.name}
            </h3>
            <p className="text-gray-600 text-center mt-1">₹{selectedItem.price}</p>
            <p className="text-gray-700 mt-4">{selectedItem.description}</p>
          </div>
        </div>
    ):null)
   }
    </div>
  ))}
</div>
</div>
</>
  );
}

export default Menu;


// {(active ? NonVegData : VegData).map((item) => (
//       <div
//         key={item.id}
//         className="bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-orange-400/20 p-4 sm:p-6 transition-transform duration-300 hover:scale-[1.03] relative"
//       >
//         <img src={item.type} alt="" className="w-5 h-5 absolute top-4 right-4" />
//         <div className="flex justify-center">
//           <img src={item.image} alt="Burger" className="w-40 h-28 object-cover rounded-md mb-4" />
//         </div>
//         <div className="text-center space-y-2">
//           <h3 className="text-xl font-bold text-orange-200">{item.name}</h3>
//           <div className="flex items-center justify-between mt-3 w-[80%] mx-auto text-orange-300 font-semibold text-lg">
//             <p>₹{quantities[item.id] > 0 ? quantities[item.id] * item.price : item.price}</p>

//             {/* Quantity Controls or Add */}
//             {quantities[item.id] >= 1 ? (
//               <div className="flex items-center bg-orange-500/90 px-3 py-1 rounded-full text-white text-sm sm:text-base gap-2 font-bold">
//                 <button onClick={() => handleUpdateQuantity(item.id, -1)} className="hover:text-gray-200">−</button>
//                 <span>{quantities[item.id]}</span>
//                 <button onClick={() => handleUpdateQuantity(item.id, 1)} className="hover:text-gray-200">+</button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => handleAddItem(item)}
//                 className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded-full text-sm sm:text-base"
//               >
//                 Add
//               </button> 
//             )}
//           </div>
//         </div>
//       </div>
//     ))}