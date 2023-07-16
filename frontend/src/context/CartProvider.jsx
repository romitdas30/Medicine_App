import React from 'react'
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();



export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [addressID, setAddressID] = useState(null);
  
    const addToCart = (product) => {
      setCartItems([...cartItems, product]);
    };
    
    const deleteCartItem = (itemId) => {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
    };

    const selectAddress = (address) =>{
      setAddressID(address)
      console.log(addressID)
    }

    useEffect(() => {
      console.log(cartItems)
      console.log(addressID)
    }, [cartItems, addressID]);

    const updateQuantity = (itemId, newQuantity) => {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity:  parseInt(newQuantity) };
        }
        return item;
      });
  
      setCartItems(updatedCartItems);
    };
  
    

    return (
      <CartContext.Provider value={{ cartItems,setCartItems, addToCart, updateQuantity,selectAddress,addressID, deleteCartItem  }}>
        {children}
      </CartContext.Provider>
    );
  };

