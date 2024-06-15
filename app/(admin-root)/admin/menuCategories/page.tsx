"use client";

import { columns } from "@/app/(admin-root)/admin/menuCategories/components/MenuCategoryColumn";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useAppSelector } from "@/hooks";
import { format } from "date-fns";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const MenuCategories = () => {
  const router = useRouter();
  const menuCategories = useAppSelector((state) => state.menuCategory.items);

  const formattedMenuCategories = menuCategories.map((menuCategory) => ({
    id: menuCategory.id,
    name: menuCategory.name,
    createdAt: format(menuCategory.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <section className="grid grid-cols-1">
      <div className="flex items-start justify-start flex-col p-20">
        <h1 className="font-bold text-4xl">
          MenuCategories ({menuCategories.length})
        </h1>
        <p className="text-lg text-gray-500">
          Manage Menu Categories for the restaurant
        </p>
        <div className="mt-3 flex-col flex ">
          <Button
            className="w-fit"
            onClick={() => {
              router.push("/admin/menuCategories/new");
            }}
          >
            <PlusCircleIcon className=" w-5 h-5" />
            Create New
          </Button>
          <div className="w-[65vw] lg:w-[80vw] md:w-[80vw] xl:w-[90vw] ">
            <DataTable
              searchKey="name"
              columns={columns}
              data={formattedMenuCategories}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuCategories;
