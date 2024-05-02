import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Markazi_Text } from "next/font/google";
import Link from "next/link";

const markazi = Markazi_Text({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main>
        <div className="w-full grid grid-cols-2 xl:gap-x-60  justify-between 2xl:h-[35rem] md:h-[35rem] xl:h-[30rem] sm:h-[30rem] lg:h-[45rem] bg-gray-900">
          <div className="flex xl:ml-[18rem] ml-10 xl:gap-y-1 gap-y-5 items-start xl:justify-start justify-center flex-col">
            <p className={cn("heading text-yellow-400  text-6xl", markazi.className)}>
              Little Lemon
            </p>
            <p className="text-2xl text-white">Chicago</p>
            <p className="text-white">
              {" "}
              We are a family owned <br /> Mediterranean restaurant,
              <br /> focused on traditional recipes <br /> served with a modern
              twist.
            </p>
            <Link href={"/menu"}>
              <Button className="text-secondary xl:0 rounded-none xl:mt-20 p-8 xl:text-2xl text-base">
                Order Online
              </Button>
            </Link>
          </div>
          <img
            src={"/restaurantfood.jpg"}
            alt="Hero Image"
            className="xl:w-[65%] sm:w-[100%] lg:w-[100%] md:w-[100%] xl:h-[90%]  h-[50%] sm:h-[50%] md:h-[70%] xl:m-0 m-auto rounded-2xl object-cover"
          />
        </div>
      </main>
    </>
  );
}
