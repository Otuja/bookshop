"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

/**
 * Props for the BookCard component.
 */
interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  className?: string;
}

/**
 * BookCard Component
 * 
 * Displays a single book item with its image, details, and an "Add to Cart" button.
 * Handles adding the book to the global cart context.
 */
import { DEFAULT_BOOK_IMAGE } from "@/lib/constants";

export function BookCard({ id, title, author, price, image, category, className }: BookCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      title,
      author,
      price,
      image,
    });
    toast.success("Added to cart!");
  };

  const [imgSrc, setImgSrc] = useState(image || DEFAULT_BOOK_IMAGE);

  return (
    <div className={cn("group relative bg-card rounded-lg border shadow-sm transition-all hover:shadow-md", className)}>
      <div className="aspect-[3/4] w-full overflow-hidden rounded-t-lg bg-muted relative">
        {/* Placeholder for image if real image fails or is not provided */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
           <span className="text-4xl font-serif font-bold opacity-20">UNN</span>
        </div>
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc(DEFAULT_BOOK_IMAGE)}
          unoptimized
        />
        <div className="absolute top-2 right-2">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                {category}
            </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          <Link href={`/product/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{author}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-primary">₦{price.toLocaleString()}</p>
          <button 
            onClick={handleAddToCart}
            className="relative z-20 cursor-pointer rounded-full bg-secondary p-2 text-secondary-foreground transition-colors hover:bg-secondary/90"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
