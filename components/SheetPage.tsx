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
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "./Nav";

export function SheetPage() {
  const [isExpended, setIsExpended] = useState(false);
  const pathname = usePathname();

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
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
