/* import db from "@/lib/db";
import { Menu } from "@prisma/client";

const getMenus = async (id: string): Promise<Menu> => {
  try {
    const res = await fetch(`/menu/${id}`);

    const men = await db.menuCategory.findMany({
      where: {
        id,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // rethrow the error to be caught by the caller
  }
};

export default getMenus;
 */
