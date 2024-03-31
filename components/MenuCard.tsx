import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/store/slice/CartSlice";
import { getMenus } from "@/store/slice/menuSlice";
import { Menu } from "@prisma/client";
import { Truck } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "./ui/use-toast";

const MenuCard = () => {
  const menus = useAppSelector((state) =>
    state.menu.items.filter(
      (menu) => menu.isFeatured === true && menu.isArchived === false
    )
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMenus());
  }, []);

  if (menus === undefined) {
    return;
  }

  return (
    <article className="items-center mt-20 flex justify-center">
      <div className="grid lg:grid-cols-3  md:grid-cols-3 grid-cols-1 gap-10">
        {menus.map((menu: Menu) => (
          <Card
            key={menu.name}
            className="xl:w-[300px]  md:w-[250px] bg-[#edefee]"
          >
            <CardHeader>
              <CardTitle className="flex justify-between text-secondary">
                <p>{menu.name}</p>
                <p className="text-emerald-500">
                  {formatter.format(Number(menu.price))}
                </p>
              </CardTitle>
              <CardDescription>{menu.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={menu?.imageUrl || ""}
                alt="Menu"
                width={400}
                height={400}
                className="object-cover max-h-40  rounded-xl"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className="text-secondary"
                onClick={() => {
                  dispatch(addToCart({ ...menu, quantity: 1 }));
                  toast({ description: "Successfully added to the cart" });
                }}
              >
                Add to Cart
              </Button>
              <Truck className="text-secondary" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default MenuCard;
