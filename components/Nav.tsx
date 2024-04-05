"use client";
import { useAppSelector } from "@/hooks";
import { cn } from "@/lib/utils";
import { ShoppingBagIcon, UserRoundCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SheetPage } from "./SheetPage";
import { Button } from "./ui/button";

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "ThisWeekSpecials", path: "#specials" },
  { name: "Menu", path: "/menu" },
];

const Nav = ({ userId }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.items);

  return (
    <nav className="border-b">
      <div className="flex items-center justify-center xl:gap-x-80 lg:gap-x-[40rem] gap-x-40 md:gap-x-96 p-10">
        <Link href={"/"}>
          <Image
            src={"/Logo .svg"}
            alt="Little Lemon Logo"
            width={150}
            height={150}
          />
        </Link>
        <SheetPage navLinks={navLinks} userId={userId} />
        <ul className="xl:flex hidden gap-x-5">
          {navLinks.map((link) => (
            <li key={link.name} className="flex flex-col ">
              <Link
                href={link.path}
                className={
                  pathname === link.path
                    ? "bg-yellow-400 p-5 text-[#495e57]"
                    : "nav-hover text-[#495e57] p-5"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
          <div className="mt-5 ">
            <Link href={"/cart"} className="flex items-center justify-center">
              <ShoppingBagIcon className="hover:text-yellow-400 transition " />
              {cart.length > 0 && (
                <span
                  className={cn(
                    " text-sm bg-yellow-400  rounded-full font-medium text-black",
                    cart.length && "px-2 py-1"
                  )}
                >
                  {cart.length > 0 && cart.length}
                </span>
              )}
              {cart.length === 0 && ""}
            </Link>
          </div>
          {userId && (
            <Button
              onClick={() => {
                router.push("/admin");
              }}
              className="mt-3"
              variant={"ghost"}
            >
              <UserRoundCheck />
            </Button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
