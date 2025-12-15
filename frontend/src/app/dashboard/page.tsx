"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Loader2, Package, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  id: string;
  book_title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  payment_status: string;
  items: OrderItem[];
}

export default function DashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const response = await api.get("/orders/");
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setIsLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Profile Card */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full overflow-hidden">
              {user.avatar ? (
                <Image src={user.avatar} alt={user.username} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User className="h-10 w-10" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold">{user.first_name} {user.last_name}</h2>
            <p className="text-muted-foreground text-sm mb-6">{user.email}</p>
            
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 text-destructive hover:bg-destructive/10 py-2 rounded-lg transition-colors font-medium"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content / Orders */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold font-serif">Order History</h1>

          {isLoadingOrders ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-muted/30 rounded-2xl p-12 text-center border border-dashed">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
              <Link href="/shop" className="text-primary font-bold hover:underline">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID: <span className="font-mono text-xs">{order.id}</span></p>
                      <p className="text-sm text-muted-foreground">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.payment_status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        order.payment_status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.payment_status}
                      </span>
                      <span className="font-bold text-lg">₦{order.total_amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.quantity}x {item.book_title}</span>
                        <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
