import { MenuCategoryMenu } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface MenuCategoryMenuProps {
  items: MenuCategoryMenu[];
  isLoading?: boolean;
  isError?: Error | null;
}

const initialState: MenuCategoryMenuProps = {
  items: [],
  isLoading: false,
  isError: null,
};

export const getMenuCategoryMenuThunk = createAsyncThunk(
  "menuCategoryMenu/getMenuCategoryMenuThunk",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/menuCategoryMenu");
      const menuCategoryMenus = response.data;
      thunkApi.dispatch(getMenuCategoryMenu(menuCategoryMenus));
    } catch (err) {
      console.log(err);
    }
  }
);

export const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    getMenuCategoryMenu: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { getMenuCategoryMenu } = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;
