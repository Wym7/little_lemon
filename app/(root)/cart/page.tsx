"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { formatter } from "@/lib/utils";
import {
  clearItems,
  removeItem,
  updateQuantity,
} from "@/store/slice/CartSlice";
import axios from "axios";
import { MinusCircle, PlusCircle, ShoppingBag, XCircle } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const getTotal = () => {
    let totalPrice = 0;
    cartItems.forEach(
      (item) => (totalPrice += Number(item.price) * item.quantity)
    );
    return totalPrice;
  };

  const increaseQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const decreaseQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const clear = (id: any) => {
    dispatch(removeItem(id));
  };
  const removeAll = () => {
    dispatch(clearItems(cartItems));
  };

  useEffect(() => {
    if (searchParams.get("success")) {
      toast({ description: "Payment completed." });
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast({ description: "Something went wrong.", variant: "destructive" });
    }
  }, [searchParams]);

  const onCheckout = async () => {
    const res = await axios.post(`/api/checkout`, {
      menuIds: cartItems.map((item) => item.id),
    });
    window.location = res.data.url;
  };

  return (
    <>
      <div>
        {cartItems.length ? (
          <div>
            <h1 className="text-5xl items-center my-10 font-bold flex justify-center">
              Your Order Items
            </h1>
            {cartItems.map((item) => (
              <>
                <li className="flex m-10 items-center justify-center border-b p-5">
                  <div className="h-24 w-24 relative ">
                    <Image
                      fill
                      src={String(item.imageUrl)}
                      alt={item.name}
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-center">
                      <p className="text-lg font-semibold dark:text-white text-black">
                        {item.name}
                      </p>
                    </div>
                    <div className=" flex text- items-center justify-center gap-10">
                      <p className="text-gray-900 cursor-pointer ">
                        <MinusCircle
                          onClick={() => {
                            decreaseQuantity(item.id, item.quantity - 1);
                          }}
                        />
                      </p>
                      <span className="border-l border-r border-gray-500 px-2 ">
                        {item.quantity}
                      </span>
                      <p className="text-gray-900  cursor-pointer border-gray-200">
                        <PlusCircle
                          onClick={() => {
                            increaseQuantity(item.id, item.quantity + 1);
                          }}
                        />
                      </p>
                      <XCircle
                        onClick={() => {
                          clear(item.id);
                        }}
                        size={50}
                        className="cursor-pointer ml-20 border border-gray-500 p-3 rounded-sm"
                      />

                      <div>{formatter.format(Number(item.price))}</div>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </div>
        ) : (
          <div className="flex items-center mt-14 flex-col gap-5 justify-center">
            <ShoppingBag size={50} />
            <div className="text-5xl text-center ">Your Bag is empty.</div>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="flex items-center font-bold gap-5 flex-col justify-center ">
            <h1 className="text-3xl font-bold">Order Summary</h1>
            <div>Total Price - {formatter.format(getTotal())}</div>
            <Button className="w-40" onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </div>
      <Separator className="mt-14" />
    </>
  );
};

export default Cart;
