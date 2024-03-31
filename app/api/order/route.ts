import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const orders = await db.order.findMany({
      include: {
        orderItems: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("Order [GET] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
