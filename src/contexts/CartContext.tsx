import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, saveCart, clearCart } from "@/lib/cart";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = getCart();
    setItems(stored.items);
    setTotal(stored.total);
  }, []);

  useEffect(() => {
    saveCart({ items, total });
  }, [items, total]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setTotal((prev) => prev + item.price * item.quantity);
  };

  const removeItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    setTotal((prev) => prev - item.price * item.quantity);
  };

  const clear = () => {
    setItems([]);
    setTotal(0);
    clearCart();
  };

  return (
    <CartContext.Provider value={{ items, total, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart trebuie folosit în interiorul unui CartProvider");
  }
  return context;
};
