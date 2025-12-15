"use client";

import { Search, Eye, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Order {
  id: string;
  email: string;
  created_at: string;
  total_amount: number;
  payment_status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || order.payment_status === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option>All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium text-xs font-mono">{order.id}</td>
                    <td className="p-4 align-middle">{order.email}</td>
                    <td className="p-4 align-middle">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4 align-middle">₦{order.total_amount.toLocaleString()}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.payment_status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : order.payment_status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <button className="p-2 hover:bg-accent rounded-md transition-colors">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
