import { books } from "@/lib/data";
import { BookCard } from "@/components/ui/BookCard";
import { ShoppingCart, Heart, Share2, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/product/AddToCartButton";

// This is a server component
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col md:flex-row gap-12 mb-16">
        {/* Product Image */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden relative shadow-lg">
             {/* Placeholder for image if real image fails or is not provided */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
                <span className="text-6xl font-serif font-bold opacity-20">UNN</span>
            </div>
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover relative z-10"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                {book.category}
              </span>
              <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> In Stock
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground">{book.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">by {book.author}</p>
          </div>

          <div className="flex items-baseline gap-4 border-b pb-6">
            <span className="text-3xl font-bold text-primary">₦{book.price.toLocaleString()}</span>
          </div>

          <div className="prose max-w-none text-muted-foreground">
            <p>
              This is a comprehensive textbook designed for students of {book.category}. 
              It covers all the fundamental concepts and provides in-depth analysis suitable for university-level study.
              Recommended by the University of Nigeria, Nsukka faculty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <AddToCartButton book={book} />
            <button className="w-12 h-12 border border-input bg-background rounded-md flex items-center justify-center hover:bg-accent transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">ISBN</span>
              <span className="text-muted-foreground">978-3-16-148410-0</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Publisher</span>
              <span className="text-muted-foreground">UNN Press</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Pages</span>
              <span className="text-muted-foreground">450</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Language</span>
              <span className="text-muted-foreground">English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
