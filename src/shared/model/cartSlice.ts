import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  name: string;
  img: string;
  price: number;
  count: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ item: Omit<CartItem, "count">; count: number }>,
    ) => {
      const { item, count } = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.count += count;
      } else {
        state.items.push({ ...item, count });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.count = action.payload.count;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, setCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
