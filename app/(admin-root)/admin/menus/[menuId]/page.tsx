"use client";

import MenuForm from "@/app/(admin-root)/admin/menus/components/MenuForm";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks";

const MenuPage = ({ params }: { params: { menuId: string } }) => {
  const storeMenu = useAppSelector((state) => state.menu.items);
  const menu = storeMenu.filter((menu) => menu.id === params.menuId);

  const menuCategoryMenu = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );
  const heading = "Edit the menu";
  const name = "Edit";

  const validMenuId = menu.map((menu) => menu.id);

  if (!menu) return;
  const data = menuCategoryMenu.filter((ele) => ele.menuId === validMenuId[0]);

  return (
    <div>
      <section className="p-20 ">
        <h1 className="text-4xl font-bold">{heading}</h1>
        <p className="text-lg">{name}</p>
        <Separator className="mt-2" />
        <MenuForm initialData={menu} menuCategoryIds={data} />
      </section>
    </div>
  );
};

export default MenuPage;
