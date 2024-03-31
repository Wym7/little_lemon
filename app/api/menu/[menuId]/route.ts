import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.menuId) {
      return new NextResponse("Menu Id is required", { status: 400 });
    }
    console.log(userId);

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const isAdmin = await db.admin.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!isAdmin) return new NextResponse("Unauthenticated", { status: 401 });

    const body = await req.json();

    const {
      name,
      description,
      price,
      menuCategories,
      imageUrl,
      isFeatured,
      isArchived,
    } = body;

    const hasMenu = await db.menu.findUnique({
      where: { id: params.menuId },
    });

    if (!hasMenu) {
      return new NextResponse("Menu item not found", { status: 404 });
    }

    await db.menuCategoryMenu.deleteMany({
      where: { menuId: hasMenu.id },
    });

    await db.menu.updateMany({
      data: { name, description, price, imageUrl, isArchived, isFeatured },
      where: {
        id: hasMenu.id,
      },
    });
    console.log(
      menuCategories.map((item: any) => item),
      "here......"
    );

    const newMenuCategoryMenu = menuCategories.map((item: number) => ({
      menuCategoryId: item,
      menuId: hasMenu.id,
    }));

    await db.$transaction(
      newMenuCategoryMenu.map((item: any) =>
        db.menuCategoryMenu.create({
          data: { menuCategoryId: item.menuCategoryId, menuId: item.menuId },
        })
      )
    );

    return NextResponse.json({ message: "Menu updated successfully" });
  } catch (error) {
    console.log("MENU_PATCH", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.menuId) {
      return new NextResponse("Menu Id is required", { status: 400 });
    }

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const isAdmin = await db.admin.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!isAdmin) return new NextResponse("Unauthenticated", { status: 401 });

    const menuItem = await db.menu.findUnique({
      where: { id: params.menuId },
    });

    await db.menuCategoryMenu.findMany({
      where: { menuId: params.menuId },
    });

    console.log(menuItem);

    if (!menuItem) {
      return new NextResponse("Menu item not found", { status: 404 });
    }

    await db.menuCategoryMenu.deleteMany({
      where: { menuId: params.menuId },
    });

    await db.menu.delete({
      where: { id: params.menuId },
    });

    return NextResponse.json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.log("MENU_DELETE", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}
