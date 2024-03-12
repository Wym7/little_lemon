"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetPage } from "./SheetPage";

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "Menu", path: "#menu" },
  { name: "Bookings", path: "/booking" },
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <div className="flex items-center justify-center xl:gap-x-80 lg:gap-x-[40rem] gap-x-40 md:gap-x-96 p-10">
        <Link href={"/"}>
          <Image
            src={"/Logo .svg"}
            alt="Little Lemon Logo"
            width={150}
            height={150}
          />
        </Link>
        <SheetPage />
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
          <div className="mt-5">
            <UserButton afterSignOutUrl="/" />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
