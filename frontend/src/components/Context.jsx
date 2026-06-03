import React, { createContext, useState, useEffect } from "react";
import { userAPI } from "../services/api";

export const cartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setIsLoggedIn(true);
      setUser(JSON.parse(stored));
      userAPI.getAvatar().then((res) => {
        if (res.data.success) setAvatar(res.data.data.avatar);
      }).catch(() => {});
    }
  }, []);

  function loginCheck() {
    return !!localStorage.getItem("user");
  }

  function additems(item) {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: item.quantity }];
      }
    });
    setQuantities((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + item.quantity,
    }));
  }

  function updateQuantity(id, increment) {
    setQuantities((prev) => {
      const newQty = Math.max((prev[id] || 0) + increment, 0);
      return { ...prev, [id]: newQty };
    });
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity + increment, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
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
        loginCheck,
        setAvatar,
        avatar,
        user,
        setUser,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
