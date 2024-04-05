import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { OrderColumn, columns } from "./components/OrderColums";

const Orders = async () => {
  const orders = await db.order.findMany({
    include: {
      orderItems: {
        include: {
          menu: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    name: order.name,
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.menu.price);
      }, 0)
    ),
    menus: order.orderItems.map((item) => item.menu.name).join(", "),
    isPaid: order.isPaid,
    address: order.address,
    createdAt: format(order.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <section className="grid grid-cols-1">
      <div className="flex items-start justify-start flex-col p-20">
        <h1 className="font-bold text-4xl">Orders ({orders.length})</h1>
        <p className="text-lg text-gray-500">
          Manage orders for the restaurant
        </p>
        <div className="mt-3 flex-col flex ">
          <div className="w-[65vw] lg:w-[80vw] md:w-[80vw] xl:w-[90vw] ">
            <DataTable
              searchKey="name"
              columns={columns}
              data={formattedOrders}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
