import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";



export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
   const isAuthenticated=useContext(CartContext);
  
  // Load from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart


  const increaseQuantity = (productId) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (productId) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

 const addToCart = (product, isAuthenticated) => {
  

  setCartItems(prev => {
    const exists = prev.find(item => item.id === product.id);
    if (exists) {
      return prev.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prev, { ...product, quantity: 1 }];
    }
  });

  return true;
};
  

  // Remove item from cart
  function removeFromCart(productId) {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart ,increaseQuantity, decreaseQuantity  }}>
      {children}
    </CartContext.Provider>
  );
}
