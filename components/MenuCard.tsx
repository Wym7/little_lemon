import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Truck } from "lucide-react";
import Image from "next/image";

const menus = [
  {
    name: "Greek Salad",
    url: "/greeksalad.jpg",
    description:
      "A Greek salad is a fresh and vibrant dish featuring crisp lettuce, juicy tomatoes, tangy olives, creamy feta cheese, cucumbers, onions, and a zesty dressing, epitomizing Mediterranean flavors.",
    price: "12.99",
  },
  {
    name: "Bruchetta",
    url: "/bruchetta.svg",
    description:
      "Bruschetta: A classic Italian antipasto featuring toasted bread rubbed with garlic and topped with ripe tomatoes, fresh basil, olive oil, and a sprinkle of salt. Simple, flavorful, and irresistible.",
    price: "12.99",
  },
  {
    name: "Lemon Dessert",
    url: "/lemondessert.jpg",
    description:
      "Indulge in the zesty delight of lemon dessert, a tantalizing treat bursting with citrusy freshness. From tangy lemon bars to creamy lemon mousse, savor the perfect balance of sweet and sour bliss.",
    price: "12.99",
  },
];

const MenuCard = () => {
  return (
    <article className="items-center mt-20 flex justify-center">
      <div className="grid lg:grid-cols-3  md:grid-cols-3 grid-cols-1 gap-10">
        {menus.map((menu) => (
          <Card
            key={menu.description}
            className="xl:w-[300px]  md:w-[250px] bg-[#edefee]"
          >
            <CardHeader>
              <CardTitle className="flex justify-between text-secondary">
                <p>{menu.name}</p>
                <p className="text-emerald-500">${menu.price}</p>
              </CardTitle>
              <CardDescription>{menu.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={menu.url}
                alt="Menu"
                width={400}
                height={400}
                className="object-cover rounded-xl"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="text-secondary">Order a delivery</Button>
              <Truck className="text-secondary" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default MenuCard;
