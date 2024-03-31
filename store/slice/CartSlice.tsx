import { Menu } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export interface cartItem extends Menu {
  quantity: number;
}

interface cartState {
  items: cartItem[];
  isLoading?: boolean;
  isError?: Error | null;
}

const initialState: cartState = {
  items: [],
  isLoading: false,
  isError: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateQuantity: (state, action) => {
      const hasQuantity = action.payload.quantity;
      if (!hasQuantity) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload
      );
    },
    clearItems: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, clearItems, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
