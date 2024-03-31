import { Order } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface orderState {
  items: Order[];
  isLoading?: boolean;
  isError?: Error | null;
}

const initialState: orderState = {
  items: [],
  isLoading: false,
  isError: null,
};

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/order");
      const orders = response.data;
      console.log(orders);

      thunkApi.dispatch(getOrder(orders));
    } catch (err) {
      console.log(err);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrder: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { getOrder } = orderSlice.actions;

export default orderSlice.reducer;
