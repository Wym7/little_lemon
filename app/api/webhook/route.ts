import db from "@/lib/db";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  console.log(body, "here is body");
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  const beforeData = await db.order.findFirst({
    where: {
      id: session?.metadata?.orderId,
    },
  });

  if (event.type === "checkout.session.completed") {
    await db.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
        name: session?.customer_details?.name || "",
      },
      include: {
        orderItems: true,
      },
    });

    const data = await db.order.findFirst({
      where: {
        id: session?.metadata?.orderId,
      },
    });

    console.log(event.type);

    console.log(beforeData, "beforeData");
    console.log(data, "data");

    /*   const menuIds = order.orderItems.map((orderItem) => orderItem.menuId);

    await db.menu.updateMany({
      where: {
        id: {
          in: [...menuIds],
        },
      },
      data: {
        isArchive: true,
      },
    });
   */
  }
  return new NextResponse(null, { status: 200 });
}
