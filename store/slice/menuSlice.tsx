import { Menu } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface menuState {
  items: Menu[];
  isLoading?: boolean;
  isError?: Error | null;
}

const initialState: menuState = {
  items: [],
  isLoading: false,
  isError: null,
};
export const getMenus = createAsyncThunk(
  "menu/getMenus",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/menu");
      const menus = response.data;
      thunkApi.dispatch(getMenu(menus));
    } catch (err) {
      console.log(err);
    }
  }
);

/* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/menu");
        setMenu(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchData();
  }, []); */

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    getMenu: (state, action) => {
      state.items = action.payload;
    },
    isAvailableMenu: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { getMenu, isAvailableMenu } = menuSlice.actions;

export default menuSlice.reducer;
