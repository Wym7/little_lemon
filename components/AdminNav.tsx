"use client";

import { UserButton } from "@clerk/nextjs";
import { StoreIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminSheet } from "./AdminSheet";
import { Separator } from "./ui/separator";

const AdminNav = async () => {
  const router = useRouter();
  const pathname = usePathname();

  const nav_items = [
    { name: "Dashboard", path: "/admin" },
    { name: "Menus", path: "/admin/menus" },
    { name: "MenuCategories", path: "/admin/menuCategories" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
  ];

  return (
    <>
      <section>
        <nav className=" p-4 w-full text-3xl text-yellow-400 flex items-center justify-between ">
          <StoreIcon
            className="cursor-pointer text-black dark:text-white dark:hover:text-yellow-400 hover:text-yellow-400  transition"
            onClick={() => {
              router.push("/");
            }}
          />
          <ul className="xl:flex hidden gap-x-2 text-sm">
            {nav_items.map((link) => (
              <li key={link.name} className="flex flex-col ">
                <Link
                  href={link.path}
                  className={
                    pathname === link.path
                      ? "text-yellow-400 p-4"
                      : "hover:text-yellow-400 text-[#495e57] p-4"
                  }
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-x-2 items-center justify-center">
            <UserButton afterSignOutUrl="/" />
            <AdminSheet navLinks={nav_items} />
          </div>
        </nav>
        <Separator />
      </section>
    </>
  );
};

export default AdminNav;
