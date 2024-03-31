"use client";

import MenuCard from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Markazi_Text } from "next/font/google";

const markazi = Markazi_Text({ subsets: ["latin"] });

const ThisWeekSpecials = () => {
  return (
    <section className="grid-cols-1 grid" id="specials">
      <div className="flex items-center xl:gap-x-96 gap-x-5 md:gap-x-[16rem] lg:gap-x-[30rem] justify-center ">
        <p className={cn("heading xl:text-6xl text-4xl", markazi.className)}>
          This weeks specials
        </p>
        <Button className="text-secondary flex items-center justify-center rounded-none mt-10 xl:p-8 p-5 xl:text-2xl text-lg">
          Order Online
        </Button>
      </div>
      <div>
        <MenuCard />
      </div>
    </section>
  );
};

export default ThisWeekSpecials;
