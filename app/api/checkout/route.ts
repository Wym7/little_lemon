import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { menuIds } = await req.json();

  if (!menuIds || menuIds.length === 0) {
    return new NextResponse("Menu id required", { status: 400 });
  }

  const menus = await db.menu.findMany({
    where: {
      id: {
        in: menuIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  /* might have to change menu.quantity */
  menus.forEach((menu) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: menu.name,
        },
        unit_amount: menu.price.toNumber() * 100,
      },
    });
  });

  const order = await db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: menuIds.map((menuId: string) => ({
          menu: {
            connect: {
              id: menuId,
            },
          },
        })),
      },
    },
  });

  /*TODO: here might have to change id */
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
