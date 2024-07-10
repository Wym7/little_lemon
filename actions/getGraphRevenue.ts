import db from "@/lib/db";

interface GraphData {
  month: string;
  total: number;
}

export const getGraphRevenue = async () => {
  const paidOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          menu: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;
    for (const item of order.orderItems) {
      revenueForOrder += item.menu.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { month: "January", total: 0 },
    { month: "February", total: 0 },
    { month: "March", total: 0 },
    { month: "April", total: 0 },
    { month: "May", total: 0 },
    { month: "June", total: 0 },
    { month: "July", total: 0 },
    { month: "August ", total: 0 },
    { month: "September", total: 0 },
    { month: "October", total: 0 },
    { month: "November", total: 0 },
    { month: "December", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
