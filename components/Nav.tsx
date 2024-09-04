"use client";
import { UserRoundCheck } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./Loader";
import { SheetPage } from "./SheetPage";
import { Button } from "./ui/button";

const ShoppingBagSheet = dynamic(() => import("./ShoppingBagSheet"), {
  loading: () => <Loader />,
});
export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "Menu", path: "/menu" },
];

const Nav = ({ userId }: any) => {
  const pathname = usePathname();
  const router = useRouter();
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
        <div className="xl:hidden flex">
          <ShoppingBagSheet />
          <SheetPage navLinks={navLinks} userId={userId} />
        </div>
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
          <div className="xl:flex hidden">
            <ShoppingBagSheet />
          </div>
          <Button
            onClick={() => {
              router.push("/admin");
            }}
            className="mt-3"
            variant={"ghost"}
          >
            <UserRoundCheck />
          </Button>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
