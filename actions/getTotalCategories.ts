import db from "@/lib/db";

export const getTotalCategories = async () => {
  const totalCategories = await db.menuCategory.count({
    orderBy: {
      createdAt: "desc",
    },
  });

  return totalCategories;
};
