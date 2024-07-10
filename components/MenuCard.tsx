import { ThisWeekSpecialsSkeleton } from "@/app/(root)/specials/loading";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/store/slice/CartSlice";
import { getMenus } from "@/store/slice/menuSlice";
import { Menu } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Card from "./Card";

const MenuCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const menus = useAppSelector((state) =>
    state.menu.items.filter(
      (menu) => menu.isFeatured === true && menu.isArchived === false
    )
  );

  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );

  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const cart = useAppSelector((state) => state.cart.items);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMenus())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch menus:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleAddToCart = async (menu: Menu) => {
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
  };

  if (!menus) {
    return null;
  }

  return (
    <article className="items-center mt-20 flex justify-center">
      {isLoading ? (
        <ThisWeekSpecialsSkeleton />
      ) : (
        <div className="grid lg:grid-cols-3  md:grid-cols-3 grid-cols-1 gap-10">
          {menus.map((menu: Menu) => {
            const menuCategoryMenu = menuCategoryMenus.find(
              (mcm) => mcm.menuId === menu.id
            );

            const category = menuCategories.find(
              (category) => category.id === menuCategoryMenu?.menuCategoryId
            );
            return (
              <>
                <Card
                  category={category}
                  menu={menu}
                  handleAddToCard={handleAddToCart}
                  isLoading={isLoading}
                />
              </>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default MenuCard;
