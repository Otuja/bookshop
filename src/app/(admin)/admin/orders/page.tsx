import { Search, Eye } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    { id: "ORD-001", customer: "Chinedu Okeke", date: "2023-10-25", total: 12500, status: "Completed" },
    { id: "ORD-002", customer: "Amaka Obi", date: "2023-10-26", total: 4000, status: "Pending" },
    { id: "ORD-003", customer: "Emeka Eze", date: "2023-10-26", total: 8500, status: "Processing" },
    { id: "ORD-004", customer: "Ngozi Uche", date: "2023-10-27", total: 15000, status: "Completed" },
    { id: "ORD-005", customer: "Tunde Bakare", date: "2023-10-27", total: 6000, status: "Cancelled" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif">Order Management</h1>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search orders..."
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <select className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option>All Statuses</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-muted/50">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {orders.map((order) => (
                <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{order.id}</td>
                  <td className="p-4 align-middle">{order.customer}</td>
                  <td className="p-4 align-middle">{order.date}</td>
                  <td className="p-4 align-middle">₦{order.total.toLocaleString()}</td>
                  <td className="p-4 align-middle">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <button className="p-2 hover:bg-accent rounded-md transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
