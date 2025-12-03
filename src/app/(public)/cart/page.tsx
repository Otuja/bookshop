"use client";

import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, subtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold font-serif mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any books yet.</p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    toast.success("Checkout functionality coming soon!");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold font-serif mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-6">
              <div className="relative aspect-[3/4] w-24 bg-muted rounded-md overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                    <p className="font-bold text-primary">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.author}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-accent transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-accent transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 h-fit bg-muted/50 p-6 rounded-lg space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-primary text-primary-foreground h-12 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
