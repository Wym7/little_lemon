import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const category = await db.menuCategory.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("Category [Post] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const allMenuCategory = await db.menuCategory.findMany();

    return NextResponse.json(allMenuCategory);
  } catch (error) {
    console.log("Menu [Post] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
