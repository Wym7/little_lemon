import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { menuCategoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.menuCategoryId) {
      return new NextResponse("MenuCategory Id is required", { status: 400 });
    }

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const isAdmin = await db.admin.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!isAdmin) return new NextResponse("Unauthenticated", { status: 401 });

    const body = await req.json();

    const { name } = body;

    const hasMenuCategory = await db.menuCategory.findUnique({
      where: { id: params.menuCategoryId },
    });

    if (!hasMenuCategory) {
      return new NextResponse("MenuCategory item not found", { status: 404 });
    }

    await db.menuCategory.update({
      data: { name },
      where: {
        id: hasMenuCategory.id,
      },
    });

    return NextResponse.json({
      message: "Menu Category updated successfully",
    });
  } catch (error) {
    console.log("MENU_PATCH", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { menuCategoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.menuCategoryId) {
      return new NextResponse("MenuCategory Id is required", { status: 400 });
    }

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const isAdmin = await db.admin.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!isAdmin) return new NextResponse("Unauthenticated", { status: 401 });

    const menuCategoryItem = await db.menuCategory.findUnique({
      where: { id: params.menuCategoryId },
    });

    if (!menuCategoryItem) {
      return new NextResponse("MenuCategory item not found", { status: 404 });
    }

    await db.menuCategory.delete({
      where: {
        id: menuCategoryItem.id,
      },
    });

    return NextResponse.json({
      message: "MenuCategory deleted successfully",
    });
  } catch (error) {
    console.log("MENU_DELETE", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}
