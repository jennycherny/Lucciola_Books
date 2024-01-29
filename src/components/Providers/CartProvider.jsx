import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [buyCart, setBuyCart] = useState([]);
  const [rentCart, setRentCart] = useState([]);

  useEffect(() => {
    const storedBuyCart = localStorage.getItem('buyCart');
    const storedRentCart = localStorage.getItem('rentCart');

    if (storedBuyCart) {
      setBuyCart(JSON.parse(storedBuyCart));
    }
    
    if (storedRentCart) {
      setRentCart(JSON.parse(storedRentCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('buyCart', JSON.stringify(buyCart));
    localStorage.setItem('rentCart', JSON.stringify(rentCart));
  }, [buyCart, rentCart]);

  const addToBuyCart = (book) => {
    setBuyCart((prevBuyCart) => [...prevBuyCart, { ...book, inBuyCart: true }]);
  };

  const addToRentCart = (book) => {
    setRentCart((prevRentCart) => [...prevRentCart, { ...book, inBuyCart: false }]);
  };

  const removeFromBuyCart = (bookToRemove) => {
    setBuyCart((prevCart) =>
      prevCart.filter((book) => book.id !== bookToRemove.id)
    );
  };

  const removeFromRentCart = (bookToRemove) => {
    setRentCart((prevCart) =>
      prevCart.filter((book) => book.id !== bookToRemove.id)
    );
  };

  return (
    <CartContext.Provider 
        value={{ 
            buyCart, 
            setBuyCart, 
            rentCart, 
            setRentCart, 
            addToBuyCart, 
            removeFromBuyCart, 
            addToRentCart, 
            removeFromRentCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};