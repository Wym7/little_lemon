"use client";

import MenuCard from "@/components/MenuCard";
import { useAppDispatch } from "@/hooks";
import { cn } from "@/lib/utils";
import { getMenuCategoryMenuThunk } from "@/store/slice/menuCategoryMenuSlice";
import { getMenuCategoryThunk } from "@/store/slice/menuCategorySlice";
import { getMenus } from "@/store/slice/menuSlice";
import { Inter } from "next/font/google";
import { Suspense, useEffect } from "react";
import Loading from "../loading";

const font = Inter({ subsets: ["latin"] });

const ThisWeekSpecials = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMenus());
    dispatch(getMenuCategoryThunk());
    dispatch(getMenuCategoryMenuThunk());
  }, [dispatch]);
  return (
    <section className="grid-cols-1 grid " id="specials">
      <div className="flex items-center xl:gap-x-96 gap-x-5 md:gap-x-[16rem] lg:gap-x-[30rem] justify-center ">
        <p
          className={cn(
            "heading text-secondary font-semibold xl:text-6xl text-4xl ",
            font.className
          )}
        >
          This weeks specials
        </p>
      </div>
      <div>
        <Suspense fallback={<Loading />}>
          <MenuCard />
        </Suspense>
      </div>
    </section>
  );
};

export default ThisWeekSpecials;
