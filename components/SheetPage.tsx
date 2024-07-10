import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/hooks";
import { cn } from "@/lib/utils";
import { Menu, UserRoundCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SheetProps {
  userId?: any;
  navLinks: any;
}

export function SheetPage({ userId, navLinks }: SheetProps) {
  const [isExpended, setIsExpended] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.items);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex gap-x-1 ">
          <Button
            className="xl:hidden "
            onClick={() => setIsExpended(isExpended)}
            variant="default"
          >
            <Menu />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <ul className={cn("flex flex-col gap-y-1 text-center mt-10")}>
          {navLinks.map((link: any) => (
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
