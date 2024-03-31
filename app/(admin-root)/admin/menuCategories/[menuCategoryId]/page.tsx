"use client";

import MenuCategoryForm from "@/app/(admin-root)/admin/menuCategories/components/MenuCategoryForm";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks";

const MenuCategoryPage = ({
  params,
}: {
  params: { menuCategoryId: string };
}) => {
  const storeMenuCategory = useAppSelector((state) => state.menuCategory.items);
  const menuCategory = storeMenuCategory.filter(
    (menuCat) => menuCat.id === params.menuCategoryId
  );
  const heading = "Edit the Menu Category";
  const name = "Edit ";
  return (
    <section className="p-20 ">
      <h1 className="text-4xl font-bold">{heading}</h1>
      <p className="text-lg">{name}</p>
      <Separator className="mt-2" />
      <MenuCategoryForm initialData={menuCategory} />
    </section>
  );
};

export default MenuCategoryPage;
