/* import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { getTotalCategories } from "@/actions/getTotalCategories";
import { getTotalCustomer } from "@/actions/getTotalCustomer";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { Overview } from "@/components/OverView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { CreditCard, DollarSignIcon, Package, User2 } from "lucide-react";
import { redirect } from "next/navigation";

const AdminDashboard = async () => {
  const { userId } = auth();

  if (!userId) return;
  const isAdmin = await db.admin.findFirst({
    where: { userId: userId },
  });

  if (!isAdmin) {
    redirect("/onboarding");
  }

  const totalRevenue = await getTotalRevenue();
  const salesCount = await getSalesCount();
  const stockCount = await getStockCount();
  const totalCustomer = await getTotalCustomer();
  const totalCategories = await getTotalCategories();
  const graphRevenue = await getGraphRevenue();
  //
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h1 className="font-bold text-4xl">Dashboard</h1>
        <p className="text-lg text-gray-500">Overview of your store</p>
        <Separator />
        <div className="grid grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSignIcon className="h-4 text-muted-foreground w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 text-muted-foreground w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
              <Package className="h-4 text-muted-foreground w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Categories
              </CardTitle>
              <Package className="h-4 text-muted-foreground w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <User2 className="h-4 text-muted-foreground w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomer}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4 ">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
 */

const page = () => {
  return <div>page</div>;
};

export default page;
