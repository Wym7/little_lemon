"use client";
import { Separator } from "@/components/ui/separator";
import MenuForm from "../components/MenuForm";

const NewMenu = () => {
  return (
    <section className="p-20 ">
      <h1 className="text-4xl font-bold">Create new menu</h1>
      <p className="text-lg">Add a new menu</p>
      <Separator className="mt-2" />
      <MenuForm />
    </section>
  );
};

export default NewMenu;
