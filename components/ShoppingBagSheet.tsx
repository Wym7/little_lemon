"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { cn, formatter } from "@/lib/utils";
import {
  clearItems,
  removeItem,
  updateQuantity,
} from "@/store/slice/CartSlice";
import axios from "axios";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

type CartItem = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  quantity: number;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};
const ShoppingBagSheet = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const cart = useAppSelector((state) => state.cart.items);

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
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams]);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/checkout`, {
        menuIds: cartItems.map((item) => item.id),
      });
      window.location = res.data.url;
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const combinedItems = cartItems.reduce<CartItem[]>((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item, price: Number(item.price) });
    }
    return acc;
  }, []);
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} className="relative">
          <ShoppingCart />
          {cart.length > 0 && (
            <span
              className={cn(
                " text-xs bg-yellow-400 absolute right-0 top-0 rounded-full font-medium text-black",
                cart.length && " px-2 py-1"
              )}
            >
              {cart.length > 0 && cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex  overflow-auto justify-between  backdrop-blur-xl flex-col">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-medium">My Cart</h1>
        </div>
        {combinedItems.length > 0 ? (
          <div className="space-y-4 ">
            {combinedItems.map((item) => (
              <>
                <div
                  key={item.id}
                  className="flex relative gap-4 items-start justify-between"
                >
                  <div className="flex  gap-4">
                    <Image
                      src={item.imageUrl || "/placeholder-image.png"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20 rounded-lg"
                    />
                    <div className="truncate flex flex-col gap-4">
                      <p className="font-semibold">{item.name}</p>{" "}
                      <div className="flex-1 ">
                        <div className="flex justify-between  items-center mb-2"></div>
                        <p className="text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-col gap-4">
                    <p>${Number(item.price)} USD</p>
                    <div className="flex items-center border gap-2 border-black rounded-full p-2 px-4">
                      <Plus
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => {
                          increaseQuantity(item.id, item.quantity + 1);
                        }}
                      />
                      <span className="mx-2 ">{item.quantity}</span>
                      <Minus
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => {
                          decreaseQuantity(item.id, item.quantity - 1);
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      clear(item.id);
                    }}
                    className="absolute top-0 rounded-full p-1 bg-gray-300"
                  >
                    <Image src="/x.svg" alt="Remove" width={14} height={14} />
                  </button>
                </div>
                <hr />
              </>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center flex-col gap-4">
              <ShoppingCart size={50} />
              <p className="text-center">Your cart is currently empty.</p>
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="uppercase">Total</p>
            <p>{formatter.format(getTotal())}</p>
          </div>
          <Button
            onClick={onCheckout}
            disabled={cartItems.length <= 0 || loading}
            className="uppercase w-full rounded-none text-black"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Checkout"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingBagSheet;
