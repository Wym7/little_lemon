/* import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import { CustomerColumn, columns } from "./components/CustomerColumn";

const Customers = async () => {
  const customers = await db.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomers: CustomerColumn[] = customers.map((customer) => ({
    id: customer.id,
    phone: customer.phone,
    name: customer.name,
    email: customer.email,
    address: customer.address,
  }));

  return (
    <section className="grid grid-cols-1">
      <div className="flex items-start justify-start flex-col p-20">
        <h1 className="font-bold text-4xl">Customers ({customers.length})</h1>
        <p className="text-lg text-gray-500">
          Manage Customers for the restaurant
        </p>
        <div className="mt-3 flex-col flex ">
          <div className="w-[90vw]">
            <DataTable
              searchKey="name"
              columns={columns}
              data={formattedCustomers}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
 */

const page = () => {
  return <div>page</div>;
};

export default page;
