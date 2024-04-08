import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const getInitialCart = () => {
    // Try to parse stored cart items; if unsuccessful, return an empty array
    try {
      // const storedCart = localStorage.getItem("cartItems");
      const storedCart = Cookies.get("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.log("Failed to retrieve cart from local storage:", error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(getInitialCart());

  useEffect(() => {
    // Update local storage whenever the cartItems state changes
    Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 7 });
  }, [cartItems]);

  const getCartData = () => {
    const cartCookieString = Cookies.get("cartItems");
    const cartCookie = cartCookieString ? JSON.parse(cartCookieString) : [];
    return cartCookie;
  };

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      console.log("prevItems : ", prevItems);
      const itemExists = prevItems.find((item) => item._id === product._id);
      console.log("itemExists : ", itemExists);
      if (itemExists) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const removeFromCart = (productId) => {
    console.log("productId : ", productId);
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  // const updateQuantity = (productId, quantity) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === productId ? { ...item, quantity } : item
  //     )
  //   );
  // };

  const updateQuantity = (id, quantity) => {
    console.log("id and quamtity : ", id, quantity);
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        calculateTotal,
        updateQuantity,
        removeFromCart,
        // updateItemQuantity,
        clearCart,
        getCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
