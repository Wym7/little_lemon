import db from "@/lib/db";

export const getTotalCustomer = async () => {
  const totalCustomers = await db.customer.count({
    orderBy: {
      createdAt: "desc",
    },
  });

  return totalCustomers;
};
