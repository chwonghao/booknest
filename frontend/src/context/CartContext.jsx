import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (p, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i].qty += qty;
        return next;
      }
      return [...prev, { ...p, qty }];
    });
  };
  const removeItem = (id) => setItems(prev => prev.filter(x => x.id !== id));
  const updateQty = (id, qty) => setItems(prev => prev.map(x => x.id === id ? { ...x, qty } : x));

  const cartCount = items.reduce((sum, x) => sum + x.qty, 0);
  const total = items.reduce((sum, x) => sum + x.price * x.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, cartCount, total }}>
      {children}
    </CartContext.Provider>
  );
}
