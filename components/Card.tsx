import { Button } from "@/components/ui/button";
import {
  CardContent,
  Card as CardDiv,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { Menu } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";

const Card = ({
  menu,
  category,
  handleAddToCard,
  isLoading,
}: {
  menu: Menu;
  category: any;
  handleAddToCard: any;
  isLoading: boolean;
}) => {
  return (
    <CardDiv key={menu.name} className="xl:w-[300px]  md:w-[full] bg-white">
      <CardHeader className="relative rounded-xl h-40">
        <Image
          src={menu?.imageUrl || ""}
          alt="Menu"
          fill
          className="object-cover object-center  max-h-40 rounded-xl "
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="flex flex-col py-5 gap-2 justify-between text-secondary">
          <p>{menu.name}</p>
          <p key={menu.id}>
            <Badge className="shadow-xl" variant={"destructive"}>
              {category ? category.name : "?"}
            </Badge>
          </p>
          <p className="text-sm font-normal">{menu.description}</p>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-green-600 text-2xl">
          {formatter.format(Number(menu.price))}
        </p>
        <Button
          className="text-secondary flex items-center gap-x-2"
          onClick={() => handleAddToCard(menu)}
          disabled={isLoading}
        >
          <ShoppingCart size={15} />
          Add to Cart
        </Button>
      </CardFooter>
    </CardDiv>
  );
};

export default Card;
