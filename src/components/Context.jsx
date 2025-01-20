import React, { createContext, useState } from "react";

export const cartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Add or update items in the cart
  function additems(item) {
    setCartItems((prevItems) => {
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
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[id];
      return newQuantities;
    });
  }

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
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
