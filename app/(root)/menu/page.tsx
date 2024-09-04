"use client";

import {
  MenuCategorySkeleton,
  ThisWeekSpecialsSkeleton,
} from "@/components/SkeletonLoadings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { formatter } from "@/lib/utils";
import { useAppDispatch } from "@/store/hook";
import { addToCart } from "@/store/slice/CartSlice";
import { getMenuCategoryMenuThunk } from "@/store/slice/menuCategoryMenuSlice";
import { getMenuCategoryThunk } from "@/store/slice/menuCategorySlice";
import { getMenus } from "@/store/slice/menuSlice";
import { Menu as MenuType } from "@prisma/client";
import { Loader2, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Filter = dynamic(() => import("@/components/Filter"), {
  loading: () => <MenuCategorySkeleton />,
  ssr: false,
});

const Menu = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const menus = useAppSelector((state) =>
    state.menu.items.filter((menu) => menu.isFeatured && !menu.isArchived)
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

  const searchedMenus = searchKey
    ? menus.filter((item) => searchMenuCategoryIds.includes(item.id))
    : menus;

  const handleAddToCart = useCallback(
    async (menu: MenuType) => {
      setIsLoading(true);
      try {
        dispatch(addToCart({ ...menu, quantity: 1 }));
        toast.success("Successfully added to the cart");
      } catch (error) {
        console.error("Failed to add to cart:", error);
        toast.error("Failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getMenus()).unwrap(),
          dispatch(getMenuCategoryThunk()).unwrap(),
          dispatch(getMenuCategoryMenuThunk()).unwrap(),
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <article className="items-center gap-20 flex flex-col  justify-center">
      <div className="bg-gray-900 p-10 w-full text-5xl font-semibold flex-col text-yellow-400 flex items-center justify-center">
        Menus
      </div>
      <div className=" text-center gap-5 grid grid-cols-1">
        <Suspense>
          <Filter
            valueKey="menuCategoryId"
            name="MenuCategories"
            data={menuCategories}
          />
        </Suspense>
      </div>

      {isLoading ? (
        <ThisWeekSpecialsSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-center">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-10">
              {searchedMenus.length > 0 ? (
                searchedMenus.map((menu) => {
                  const menuCategoryMenu = menuCategoryMenus.find(
                    (mcm) => mcm.menuId === menu.id
                  );

                  const category = menuCategories.find(
                    (category) =>
                      category.id === menuCategoryMenu?.menuCategoryId
                  );
                  return (
                    <Card
                      key={menu.name}
                      className="xl:w-[300px]  md:w-[full] bg-white"
                    >
                      <CardHeader className="relative rounded-xl h-40">
                        <Image
                          src={menu?.imageUrl || ""}
                          alt="Menu"
                          fill
                          className="object-cover object-center  max-h-40 rounded-xl "
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="flex flex-col py-5 gap-2 justify-between text-secondary">
                          <p>{menu.name}</p>
                          <p key={menu.id}>
                            <Badge
                              className="shadow-xl"
                              variant={"destructive"}
                            >
                              {category ? category.name : "?"}
                            </Badge>
                          </p>
                          <p className="text-sm font-normal">
                            {menu.description}
                          </p>
                        </CardTitle>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-green-600 text-2xl">
                          {formatter.format(Number(menu.price))}
                        </p>
                        <Button
                          className="text-secondary"
                          onClick={() => handleAddToCart(menu)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <>
                              <div className="flex items-center gap-x-2">
                                <ShoppingCart size={15} />
                                Add to Cart
                              </div>
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <>
                  {!searchKey &&
                    menus.map((menu) => {
                      const menuCategoryMenu = menuCategoryMenus.find(
                        (mcm) => mcm.menuId === menu.id
                      );

                      const category = menuCategories.find(
                        (category) =>
                          category.id === menuCategoryMenu?.menuCategoryId
                      );
                      return (
                        <Card
                          key={menu.name}
                          className="xl:w-[300px]  md:w-[full] bg-white"
                        >
                          <CardHeader className="relative rounded-xl h-40">
                            <Image
                              src={menu?.imageUrl || ""}
                              alt="Menu"
                              fill
                              className="object-cover object-center  max-h-40 rounded-xl "
                            />
                          </CardHeader>
                          <CardContent>
                            <CardTitle className="flex flex-col py-5 gap-2 justify-between text-secondary">
                              <p>{menu.name}</p>
                              <p key={menu.id}>
                                <Badge
                                  className="shadow-xl"
                                  variant={"destructive"}
                                >
                                  {category ? category.name : "?"}
                                </Badge>
                              </p>
                              <p className="text-sm font-normal">
                                {menu.description}
                              </p>
                            </CardTitle>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <p className="text-green-600 text-2xl">
                              {formatter.format(Number(menu.price))}
                            </p>
                            <Button
                              className="text-secondary"
                              onClick={() => handleAddToCart(menu)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <>
                                  <div className="flex items-center gap-x-2">
                                    <ShoppingCart size={15} />
                                    Add to Cart
                                  </div>
                                </>
                              )}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default Menu;
