import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type CartItem = {
  id: number;
  name: string;
  img: string;
  price: number;
  count: number;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'count'>, count?: number) => void;
  removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'count'>, count: number = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, count: i.count + count } : i
        );
      }
      return [...prev, { ...item, count }];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
