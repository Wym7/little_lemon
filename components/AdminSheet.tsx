import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function AdminSheet({ navLinks }: any) {
  const [isExpended, setIsExpended] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="xl:hidden "
          onClick={() => setIsExpended(isExpended)}
          variant="default"
        >
          {isExpended ? <X /> : <Menu />}
        </Button>
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
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
