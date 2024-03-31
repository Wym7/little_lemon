import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slice/CartSlice";
import menuCategoryMenuSlice from "./slice/menuCategoryMenuSlice";
import menuCategorySlice from "./slice/menuCategorySlice";
import menuSlice from "./slice/menuSlice";
import orderSlice from "./slice/orderSlice";
// ...

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    menuCategory: menuCategorySlice,
    menuCategoryMenu: menuCategoryMenuSlice,
    order: orderSlice,
    cart: CartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
