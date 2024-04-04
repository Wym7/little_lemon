"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { formatter } from "@/lib/utils";
import { addToCart } from "@/store/slice/CartSlice";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const MenuDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const storeMenu = useAppSelector((state) => state.menu.items);
  const dispatch = useAppDispatch();
  const specificMenu = storeMenu.find((menu) => menu.id === params.menuId);

  //
  return (
    <section className="grid grid-cols-1 mt-14">
      <div className="flex items-center justify-center ">
        <Image
          className="object-cover object-center xl:w-80 xl:h-80 lg:w-80 lg:h-80 w-60 h-72"
          //@ts-ignore
          src={specificMenu?.imageUrl}
          //@ts-ignore
          alt={specificMenu?.name}
          width={800}
          height={800}
        />
        <div className="bg-gray-900 sm:rounded-br-xl sm:gap-20 lg:gap-10 md:gap-10  sm:rounded-tr-xl w-[40%] lg:h-80  grid p-8 flex-col xl:h-80 h-72 text-yellow-400">
          <div className="flex flex-col xl:gap-20 lg:flex-row lg:gap-[8rem] gap-0">
            <p className="xl:text-4xl lg:text-4xl text-xl">
              {specificMenu?.name}
            </p>
            <span className="xl:text-xl text-base">
              {formatter.format(Number(specificMenu?.price))}
            </span>
          </div>
          <p>{specificMenu?.description}</p>
          <Button
            className="w-fit xl:w-full"
            onClick={() => {
              dispatch(addToCart({ ...specificMenu, quantity: 1 }));
              router.push("/menu");
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuDetailPage;
