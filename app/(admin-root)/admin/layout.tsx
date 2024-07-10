"use client";
import AdminNav from "@/components/AdminNav";
import { useAppDispatch } from "@/hooks";
import { getMenuCategoryMenuThunk } from "@/store/slice/menuCategoryMenuSlice";
import { getMenuCategoryThunk } from "@/store/slice/menuCategorySlice";
import { getMenus } from "@/store/slice/menuSlice";
import { getOrders } from "@/store/slice/orderSlice";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMenus());
    dispatch(getMenuCategoryThunk());
    dispatch(getMenuCategoryMenuThunk());
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <main>
      <AdminNav />
      {children}
    </main>
  );
};

export default AdminLayout;
