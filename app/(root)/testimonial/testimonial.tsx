import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const menus = [
  {
    name: "Julie",
    url: "/Julie.jpg",
    rating: [1, 1, 1, 1, 0.5],
    description:
      "Can't recommend Little Lemon enough. Amazing Mediterranean food, fresh ingredients, and friendly staff. A delightful experience!    ",
  },
  {
    name: "John",
    url: "/John.jpg",
    rating: [1, 1, 1, 1, 1],
    description:
      " Craving delicious, authentic Mediterranean food? Look no further than Little Lemon. Amazing flavors, great service, highly recommend!    ",
  },
  {
    name: "Zed",
    url: "/Zed.jpg",
    rating: [1, 1, 1, 1, 1],
    description:
      "Little Lemon is a hidden gem. Authentic flavors, friendly service - a must-try for Mediterranean food lovers.",
  },
];
const ratingLevels = { 0.5: faStarHalfStroke, 1: faStar };

const Testimonial = () => {
  return (
    <article className="items-center flex-col  mt-20 bg-[#1e1e1e] p-20 flex justify-center">
      <p
        className={cn(
          "text-yellow-400 text-6xl flex items-center justify-center"
        )}
      >
        What people say about us
      </p>
      <div className="grid lg:grid-cols-3 mt-20 md:grid-cols-2 grid-cols-1 gap-10">
        {menus.map((menu) => (
          <Card
            key={menu.name}
            className="xl:w-[300px] bg-[#edefee] flex items-center justify-center flex-col border-none md:w-[250px]"
          >
            <CardHeader>
              <CardTitle className="text-secondary">{menu.name}</CardTitle>
              <CardDescription className="text-secondary">
                {menu.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={menu.url}
                alt="Menu"
                width={250}
                height={100}
                className="object-cover flex items-center justify-center rounded-xl min-h-20"
              />
            </CardContent>
            <CardFooter className="flex justify-start">
              {/*   {menu.rating.map((rate) => (
                <FontAwesomeIcon
                  key={rate}
                  icon={ratingLevels[rate]}
                  size="xs"
                  className="text-yellow-400"
                />
              ))} */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default Testimonial;
