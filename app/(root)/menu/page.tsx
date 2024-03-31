"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks";
import { formatter } from "@/lib/utils";
import { useAppDispatch } from "@/store/hook";
import { getMenuCategoryMenuThunk } from "@/store/slice/menuCategoryMenuSlice";
import { getMenuCategoryThunk } from "@/store/slice/menuCategorySlice";
import { getMenus } from "@/store/slice/menuSlice";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Filter from "./[menuId]/components/filter";

const Menu = () => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector((state) =>
    state.menu.items.filter(
      (menu) => menu.isFeatured === true && menu.isArchived === false
    )
  );

  const params = useSearchParams();
  const searchKey = params.get("menuCategoryId");
  const menuCategories = useAppSelector((state) => state.menuCategory.items);

  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );

  const searchMenuCategoryIds = menuCategoryMenus
    .filter((item) => item.menuCategoryId === searchKey)
    .map((item) => item.menuId);

  const searchedMenus = menus.filter((item) =>
    searchMenuCategoryIds.includes(item.id)
  );

  useEffect(() => {
    dispatch(getMenus());
    dispatch(getMenuCategoryThunk());
    dispatch(getMenuCategoryMenuThunk());
  }, [dispatch]);

  return (
    <article className="items-center gap-20 flex flex-col  justify-center">
      <div className="bg-gray-900 p-10 w-full text-5xl flex-col text-yellow-400 flex items-center justify-center">
        Menus
      </div>
      <div className=" text-center gap-5 grid grid-cols-1">
        <Filter
          valueKey="menuCategoryId"
          name="MenuCategories"
          data={menuCategories}
        />
      </div>
      <div className="grid lg:grid-cols-3  md:grid-cols-3 grid-cols-1 gap-10">
        {searchedMenus.length > 0 ? (
          searchedMenus.map((menu) => (
            <Link key={menu.name} href={`/menu/${menu.id}`}>
              <Card
                key={menu?.id}
                className="xl:w-[300px] md:w-[250px] bg-[#edefee]"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between text-secondary">
                    <p>{menu?.name}</p>
                    <p className="text-emerald-500">
                      {formatter.format(Number(menu.price))}
                    </p>
                  </CardTitle>
                  <CardDescription>{menu?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={menu?.imageUrl || ""}
                    alt="Menu"
                    width={500}
                    height={500}
                    className="object-cover max-h-60 max-w-full object-center rounded-xl"
                  />
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div>No result.</div>
        )}
      </div>

      <Separator className="mt-20" />
    </article>
  );
};

export default Menu;
