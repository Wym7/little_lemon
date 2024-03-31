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
  return (
    <section className="grid grid-cols-1 mt-14">
      <div className="flex items-center justify-center ">
        <Image
          className="object-cover object-center rounded-tl-xl w-80 h-80 rounded-bl-xl"
          //@ts-ignore
          src={specificMenu?.imageUrl}
          //@ts-ignore
          alt={specificMenu?.name}
          width={800}
          height={800}
        />
        <div className="bg-gray-900 rounded-br-xl rounded-tr-xl w-[40rem] grid p-8 flex-col h-80 text-yellow-400">
          <div className="flex gap-20">
            <p className="text-4xl">{specificMenu?.name}</p>
            <span className="text-xl">
              {formatter.format(Number(specificMenu?.price))}
            </span>
          </div>
          <p className="">{specificMenu?.description}</p>
          <Button
            className=" w-full"
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
