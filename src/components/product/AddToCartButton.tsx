"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
  };
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(book);
    toast.success("Added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-primary text-primary-foreground h-12 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
    >
      <ShoppingCart className="h-5 w-5" />
      Add to Cart
    </button>
  );
}
