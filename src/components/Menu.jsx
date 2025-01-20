import React, { useContext, useState } from "react";
import { cartContext } from "./Context";
import NavBar from "../Nav";
import card1 from "../assets/card1.png";
import card2 from "../assets/card4.png";

function Menu() {
  const VegData = [
    { id: 1, image: card1, name: "Burger1", price: 1001, type: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg", quantity: 0 },
    { id: 2, image: card1, name: "Burger2", price: 1375, type: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg", quantity: 0 },
    { id: 3, image: card1, name: "Burger3", price: 1370, type: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg", quantity: 0 },
  ];

  const NonVegData = [
    { id: 4, image: card2, name: "Burger 4", price: 1239, type: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/330px-Non_veg_symbol.svg.png", quantity: 0 },
    { id: 5, image: card2, name: "Burger 5", price: 1139, type: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/330px-Non_veg_symbol.svg.png", quantity: 0 },
    { id: 6, image: card2, name: "Burger 6", price: 739, type: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/330px-Non_veg_symbol.svg.png", quantity: 0 },
  ];

  const { additems, updateQuantity, quantities } = useContext(cartContext);
  const [changeWidth, setChangeWidth] = useState([40, 0]);
  const [active, setActive] = useState(0);

  // Add item to cart with quantity 1
  function handleAddItem(item) {
    additems({ ...item, quantity: 1 });
  }

  // Update the quantity of an item
  function handleUpdateQuantity(id, increment) {
    updateQuantity(id, increment);
  }

  return (
    <>
      <NavBar />
      <div className="bg-yellow-400 min-h-screen mt-[3rem] sm:mt-[4.1rem] pb-[2rem]">
        <div>
          <p className="text-center font-bold text-3xl pt-[1rem] text-orange-950" style={{ fontFamily: "flame" }}>
            OUR MENU
          </p>
          <div className="w-[90%] mx-auto text-xl sm:text-2xl font-bold flex flex-col space-y-2">
            <div className="flex space-x-4 items-center">
              <button className="text-orange-950" onClick={() => { setChangeWidth([40, 0]); setActive(0); }}>
                Veg
              </button>
              <button className="text-orange-950" onClick={() => { setChangeWidth([100, 60]); setActive(1); }}>
                Non-Veg
              </button>
            </div>
            <div className="bg-orange-950 rounded h-[2px] transition-all duration-300 ease-out" style={{ width: `${changeWidth[0]}px`, marginLeft: `${changeWidth[1]}px` }}></div>
          </div>
          <div className="menu-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-[90%] mx-auto my-8">
            {(active ? NonVegData : VegData).map((item) => (
              <div key={item.id} className="card bg-white/90 shadow-md p-4 sm:p-6 h-[20rem] hover:scale-105 transition ease-in-out rounded-lg">
                <div className="flex justify-end"><img src={item.type} alt="" width="24px" height="24px" /></div>
                <div className="flex justify-center mb-4">
                  <img src={item.image} alt="no" className="w-[150px] sm:w-[180px] h-[120px] sm:h-[150px] rounded-md" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg sm:text-xl text-orange-950 font-bold">{item.name}</p>
                  <div className="flex items-center justify-between mt-2 w-[80%] mx-auto">
                    <p className="text-orange-950 text-lg sm:text-xl" style={{ fontFamily: "flame" }}>
                      {quantities[item.id] > 0 ? quantities[item.id] * item.price : item.price}/-
                    </p>
                    <div>
                      {quantities[item.id] >= 1 ? (
                        <div className="flex items-center space-x-2 bg-orange-950 text-white px-4 py-2 rounded-md font-bold">
                          <button className="cursor-pointer" onClick={() => handleUpdateQuantity(item.id, -1)}>-</button>
                          <div>|</div>
                          <div>{quantities[item.id]}</div>
                          <div>|</div>
                          <button className="cursor-pointer" onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
                        </div>
                      ) : (
                        <div onClick={() => handleAddItem(item)} className="cursor-pointer bg-orange-950 text-white px-4 py-2 rounded-md font-bold">
                          Add
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
