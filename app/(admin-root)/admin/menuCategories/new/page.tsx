"use client";
import MenuCategoryForm from "@/app/(admin-root)/admin/menuCategories/components/MenuCategoryForm";
import { Separator } from "@/components/ui/separator";

const NewMenuCategory = () => {
  return (
    <section className="p-20 ">
      <h1 className="text-4xl font-bold">Create New Menu Category</h1>
      <p className="text-lg">Add a new Menu Category</p>
      <Separator className="mt-2" />
      <MenuCategoryForm />
    </section>
  );
};

export default NewMenuCategory;
