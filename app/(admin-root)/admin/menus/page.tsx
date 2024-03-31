"use client";
import { columns } from "@/app/(admin-root)/admin/menus/components/Columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useAppSelector } from "@/hooks";
import { format } from "date-fns";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Menus = () => {
  const router = useRouter();
  const menus = useAppSelector((state) => state.menu.items);

  const formattedMenus = menus.map((menu) => ({
    id: menu.id,
    name: menu.name,
    price: menu.price,
    isFeatured: menu.isFeatured,
    isArchived: menu.isArchived,
    description: menu.description,
    createdAt: format(menu.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <section className="grid grid-cols-1">
      <div className="flex items-start justify-start flex-col p-20">
        <h1 className="font-bold text-4xl">Menu ({menus.length})</h1>
        <p className="text-lg text-gray-500">Manage menus for the restaurant</p>
        <div className="mt-3 flex-col flex ">
          <Button
            className="w-fit"
            onClick={() => {
              router.push("/admin/menus/new");
            }}
          >
            <PlusCircleIcon className=" w-5 h-5" />
            Create New
          </Button>
          <div className="w-[90vw]">
            <DataTable
              searchKey="name"
              columns={columns}
              data={formattedMenus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menus;
