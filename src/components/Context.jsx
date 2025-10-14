import React, { createContext, useState } from "react";

export const cartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar,setAvatar]=useState(null);

  // Add or update items in the cart
  function loginCheck() {
  const data= localStorage.getItem("user");
  if(data){
    return true
  }
  return false;
}

  function additems(item) {
    console.log(item);
    setCartItems((prevItems) => {
      console.log(prevItems);
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // If item does not exist, add it to the cart with quantity
        return [...prevItems, { ...item, quantity: item.quantity }];
      }
    });

    // Update the quantity in the quantities state
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.id]: (prevQuantities[item.id] || 0) + item.quantity,
    }));
  } 

  // Update the quantity of an existing item in the cart
  function updateQuantity(id, increment) {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max((prevQuantities[id] || 0) + increment, 0);
      return { ...prevQuantities, [id]: newQuantity };
    });

    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + increment, 0) } : item
      );
    });
  }

  // Remove an item from the cart
  function removeItem(id) {
    console.log("Remove call");
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      console.log(newQuantities);
      delete newQuantities[id];
      return newQuantities;
    });
  }
  console.log("cartitems in context",cartItems);
  return (
    <cartContext.Provider
      value={{
        cartItems,
        quantities,
        additems,
        updateQuantity,
        removeItem,
        setCartItems,
        isLoggedIn,
        setIsLoggedIn,
        loginCheck,
        setAvatar,
        avatar
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
