import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/hooks";
import { cn } from "@/lib/utils";
import { Menu, ShoppingBagIcon, UserRoundCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { navLinks } from "./Nav";

export function SheetPage({ userId }: any) {
  const [isExpended, setIsExpended] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.items);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="xl:hidden " variant="default">
          {isExpended ? <X /> : <Menu />}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <ul className={cn("flex flex-col gap-y-1 text-center mt-10")}>
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="flex group transition-all flex-col  "
            >
              <Link
                href={link.path}
                className={
                  pathname === link.path
                    ? "bg-yellow-400 text-[#495e57] p-5 transition-all"
                    : "btn-hover p-5 text-[#495e57]"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col mt-3 items-center justify-center">
          <Link href={"/cart"} className="flex items-center justify-center">
            <ShoppingBagIcon className="hover:text-yellow-400 w-8 h-8 transition " />
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
        </div>

        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
