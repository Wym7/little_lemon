import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Testimonials {
  name: string;
  url: string;
  rating: (0.5 | 1)[];
  description: string;
}

const Testimonial: Testimonials[] = [
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

const TestimonialCard = () => {
  return (
    <article className="items-center rounded-b-2xl flex-col  mt-20 bg-gray-900 p-20 flex justify-center">
      <p
        className={cn(
          "text-yellow-400 text-6xl flex items-center justify-center"
        )}
      >
        What people say about us
      </p>
      <div className="grid lg:grid-cols-3 mt-20 md:grid-cols-2 grid-cols-1 gap-10">
        {Testimonial.map((item) => (
          <Card
            key={item.name}
            className="xl:w-[300px] bg-[#edefee] flex items-center justify-center flex-col border-none md:w-[250px]"
          >
            <CardHeader>
              <CardTitle className="text-secondary">{item.name}</CardTitle>
              <CardDescription className="text-secondary">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={item.url}
                alt="Menu"
                width={250}
                height={100}
                className="object-cover flex items-center justify-center  min-h-20"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default TestimonialCard;
