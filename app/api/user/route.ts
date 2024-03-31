import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const existingUser = await db.admin.findFirst({ where: { id: userId } });
    if (!existingUser) {
      const createdUser = await db.admin.create({
        data: {
          name,
          userId,
        },
      });
      console.log(createdUser);
    }
    return NextResponse.json(userId);
  } catch (error) {
    console.log("user [POST] error");

    return new NextResponse("Internal error", { status: 500 });
  }
}
