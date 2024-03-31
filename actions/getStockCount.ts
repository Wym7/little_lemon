import db from "@/lib/db";

export const getStockCount = async () => {
  const stockCount = await db.menu.count({
    where: {
      isArchived: false,
    },
  });

  return stockCount;
};
