import { DollarSign, ShoppingBag, BookOpen, Users } from "lucide-react";

// Simple Card Component since we don't have the shadcn/ui one installed yet
function DashboardCard({ title, value, icon: Icon, description }: any) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-serif">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Revenue"
          value="₦4,231,000"
          icon={DollarSign}
          description="+20.1% from last month"
        />
        <DashboardCard
          title="Orders"
          value="+2350"
          icon={ShoppingBag}
          description="+180.1% from last month"
        />
        <DashboardCard
          title="Books in Stock"
          value="12,234"
          icon={BookOpen}
          description="+19 new books added"
        />
        <DashboardCard
          title="Active Students"
          value="+573"
          icon={Users}
          description="+201 since last hour"
        />
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex flex-col space-y-1.5">
          <h3 className="font-semibold leading-none tracking-tight">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
        </div>
        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">ORD001</td>
                  <td className="p-4 align-middle">Chinedu Okeke</td>
                  <td className="p-4 align-middle"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Paid</span></td>
                  <td className="p-4 align-middle text-right">₦12,500</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">ORD002</td>
                  <td className="p-4 align-middle">Amaka Obi</td>
                  <td className="p-4 align-middle"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Pending</span></td>
                  <td className="p-4 align-middle text-right">₦4,000</td>
                </tr>
                 <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">ORD003</td>
                  <td className="p-4 align-middle">Emeka Eze</td>
                  <td className="p-4 align-middle"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Paid</span></td>
                  <td className="p-4 align-middle text-right">₦8,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
