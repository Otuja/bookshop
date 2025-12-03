import { DollarSign, ShoppingBag, BookOpen, Users, TrendingUp, ArrowUpRight } from "lucide-react";

// Dashboard Card Component
function DashboardCard({ title, value, icon: Icon, description, trend }: any) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-full">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium text-green-600 flex items-center gap-0.5 bg-green-100 px-1.5 py-0.5 rounded-full">
            <TrendingUp className="h-3 w-3" /> {trend}
          </span>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-serif">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
             Download Report
           </button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Revenue"
          value="₦4,231,000"
          icon={DollarSign}
          trend="+20.1%"
          description="from last month"
        />
        <DashboardCard
          title="Total Orders"
          value="2,350"
          icon={ShoppingBag}
          trend="+180.1%"
          description="from last month"
        />
        <DashboardCard
          title="Books in Stock"
          value="12,234"
          icon={BookOpen}
          trend="+12%"
          description="new books added"
        />
        <DashboardCard
          title="Active Students"
          value="573"
          icon={Users}
          trend="+5%"
          description="since last hour"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm col-span-2">
          <div className="p-6 flex items-center justify-between border-b">
            <div>
              <h3 className="font-semibold text-lg">Recent Orders</h3>
              <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
            </div>
            <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-muted/30">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Customer</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-6 text-right align-middle font-medium text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-6 align-middle font-medium">#ORD-001</td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">CO</div>
                        <span className="font-medium">Chinedu Okeke</span>
                      </div>
                    </td>
                    <td className="p-6 align-middle"><span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200">Paid</span></td>
                    <td className="p-6 align-middle text-right font-medium">₦12,500</td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-6 align-middle font-medium">#ORD-002</td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">AO</div>
                        <span className="font-medium">Amaka Obi</span>
                      </div>
                    </td>
                    <td className="p-6 align-middle"><span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-medium border border-yellow-200">Pending</span></td>
                    <td className="p-6 align-middle text-right font-medium">₦4,000</td>
                  </tr>
                   <tr className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-6 align-middle font-medium">#ORD-003</td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">EE</div>
                        <span className="font-medium">Emeka Eze</span>
                      </div>
                    </td>
                    <td className="p-6 align-middle"><span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200">Paid</span></td>
                    <td className="p-6 align-middle text-right font-medium">₦8,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
