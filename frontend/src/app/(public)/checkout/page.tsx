"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          book_id: item.id,
          quantity: item.quantity
        })),
        email: formData.email,
        // Add other fields if required by backend
      };

      const response = await api.post("/checkout/initiate/", orderData);
      
      if (response.data.payment_url) {
        // Clear cart before redirecting? Maybe better to clear after success.
        // For now, let's clear it to avoid stale state if they come back.
        // Or better, keep it until webhook confirms.
        // Let's just redirect.
        window.location.href = response.data.payment_url;
      } else {
        toast.error("Failed to initiate payment. No payment URL returned.");
      }

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.detail || "Failed to process checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-8">Complete your order details.</p>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@unn.edu.ng"
                  className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₦${subtotal.toLocaleString()}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-muted/30 p-8 rounded-2xl border h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 aspect-[3/4] bg-muted rounded overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
