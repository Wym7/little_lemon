"use client";

import MenuCard from "@/components/MenuCard";
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
      </div>
      <div>
        <MenuCard />
      </div>
    </section>
  );
};

export default ThisWeekSpecials;
