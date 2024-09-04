import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/store/slice/CartSlice";
import { getMenus } from "@/store/slice/menuSlice";
import { Menu } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Card from "./Card";

const MenuCard = () => {
  const [loading, setLoading] = useState(false);
  const menus = useAppSelector((state) =>
    state.menu.items.filter(
      (menu) => menu.isFeatured === true && menu.isArchived === false
    )
  );

  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );

  const menuCategories = useAppSelector((state) => state.menuCategory.items);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        await dispatch(getMenus()).unwrap();
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    };

    fetchMenus();
  }, [dispatch]);

  const handleAddToCart = async (menu: Menu) => {
    try {
      setLoading(true);
      dispatch(addToCart({ ...menu, quantity: 1 }));
      toast.success("Successfully added to the cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!menus) {
    return null;
  }

  return (
    <article className="items-center mt-20 flex justify-center">
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
                isLoading={loading}
              />
            </>
          );
        })}
      </div>
    </article>
  );
};

export default MenuCard;
