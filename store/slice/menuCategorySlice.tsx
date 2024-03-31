import { MenuCategory } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface menuCategoryState {
  items: MenuCategory[];
  isLoading?: boolean;
  isError?: Error | null;
}

const initialState: menuCategoryState = {
  items: [],
  isLoading: false,
  isError: null,
};

export const getMenuCategoryThunk = createAsyncThunk(
  "menu/getMenuCategory",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/menuCategory");
      const menuCategory = response.data;
      thunkApi.dispatch(getMenuCategory(menuCategory));
    } catch (err) {
      console.log(err);
    }
  }
);

export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    getMenuCategory: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { getMenuCategory } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
