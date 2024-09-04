"use client";

import { ThisWeekSpecialsSkeleton } from "@/components/SkeletonLoadings";
import { useAppDispatch } from "@/hooks";
import { cn } from "@/lib/utils";
import { getMenuCategoryMenuThunk } from "@/store/slice/menuCategoryMenuSlice";
import { getMenuCategoryThunk } from "@/store/slice/menuCategorySlice";
import { getMenus } from "@/store/slice/menuSlice";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { Suspense, useEffect } from "react";

const font = Inter({ subsets: ["latin"] });

const MenuCard = dynamic(() => import("@/components/MenuCard"), {
  loading: () => <ThisWeekSpecialsSkeleton />,
  ssr: false,
});
const ThisWeekSpecials = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getMenus()).unwrap(),
          dispatch(getMenuCategoryThunk()).unwrap(),
          dispatch(getMenuCategoryMenuThunk()).unwrap(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      <Suspense>
        <MenuCard />
      </Suspense>
    </section>
  );
};

export default ThisWeekSpecials;
