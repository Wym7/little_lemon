"use client";
import { cn } from "@/lib/utils";
import { Markazi_Text } from "next/font/google";
import Image from "next/image";

const markazi = Markazi_Text({ subsets: ["latin"] });

const About = () => {
  return (
    <>
      <div className="flex items-center mb-20 justify-center" id="about">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 ml-10 grid-cols-1  gap-x-40 items-center justify-center">
          <div className="flex items-start justify-center flex-col">
            <p
              className={cn(
                "heading text-6xl text-yellow-400",
                markazi.className
              )}
            >
              Little Lemon
            </p>
            <p className="text-2xl text-secondary">Chicago</p>
            <p className="text-secondary w-80">
              {" "}
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.The photo of the
              owners Mario and Adriano,Mario, with his experience as a chef in
              Italy, curates the menu using family recipes passed down through
              generations. Adrian, on the other hand, focuses on showcasing the
              diverse culinary landscape of the Mediterranean region, expanding
              the menu beyond classic Italian fare.
            </p>
          </div>
          <div>
            <Image
              src={"/Mario and Adrian A.jpg"}
              alt="About Photo"
              width={400}
              height={300}
              className="object-cover rounded-xl mt-20 mb-10"
            />
            <Image
              src={"/Mario and Adrian b.jpg"}
              alt="About Photo"
              width={400}
              height={300}
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
