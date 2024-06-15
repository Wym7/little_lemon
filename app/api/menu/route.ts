import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      price,
      imageUrl,
      description,
      menuCategories,
      isFeatured,
      isArchived,
    } = body;

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("ImageUrl is required", { status: 400 });
    if (!description)
      return new NextResponse("Description is required", { status: 400 });

    const menu = await db.menu.create({
      data: { name, price, imageUrl, description, isArchived, isFeatured },
    });

    const newMenuCategoryMenu = menuCategories.map((item: number) => ({
      menuCategoryId: item,
      menuId: menu.id,
    }));

    await db.$transaction(
      newMenuCategoryMenu.map((item: any) =>
        db.menuCategoryMenu.create({
          data: { menuCategoryId: item.menuCategoryId, menuId: item.menuId },
        })
      )
    );

    return NextResponse.json(menu);
  } catch (error) {
    console.error("Menu [POST] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const menus = await db.menu.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(menus);
  } catch (error) {
    console.log("Menu [GET] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    if (!params.menuId) {
      return new NextResponse("Menu ID is required", { status: 400 });
    }

    const menuItem = await db.menu.findUnique({
      where: { id: params.menuId },
    });

    if (!menuItem) {
      return new NextResponse("Menu item not found", { status: 404 });
    }
    await db.menu.delete({
      where: { id: params.menuId },
    });

    return NextResponse.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.log("MENU_DELETE", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}
