import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const menuCategoryMenus = await db.menuCategoryMenu.findMany();
    return NextResponse.json(menuCategoryMenus);
  } catch (error) {
    console.log("Menu [Post] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
