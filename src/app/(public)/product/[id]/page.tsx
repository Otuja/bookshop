"use client";

import { BookCard } from "@/components/ui/BookCard";
import { ShoppingCart, Heart, Share2, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { useBooks } from "@/context/BookContext";

export default function ProductPage() {
  const params = useParams();
  const { books } = useBooks();
  const book = books.find((b) => b.id === params.id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <p className="text-muted-foreground mt-2">The book you are looking for does not exist.</p>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      {/* Mobile Header Image */}
      <div className="md:hidden relative w-full aspect-[4/5] bg-muted">
         <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
            <span className="text-6xl font-serif font-bold opacity-20">UNN</span>
         </div>
         <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
         />
         <div className="absolute top-4 right-4">
            <button className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-background transition-colors">
               <Share2 className="h-5 w-5 text-foreground" />
            </button>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Desktop Image */}
          <div className="hidden md:block w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden relative shadow-xl">
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
                  <span className="text-6xl font-serif font-bold opacity-20">UNN</span>
               </div>
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
                sizes="33vw"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-6 md:space-y-8 -mt-6 md:mt-0 relative z-10 bg-background rounded-t-3xl md:bg-transparent md:rounded-none px-2 md:px-0 pt-6 md:pt-0">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {book.category}
                </span>
                <span className="text-green-600 text-xs font-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                  <Check className="h-3 w-3" /> In Stock
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold font-serif text-foreground leading-tight">{book.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground mt-2 font-medium">by {book.author}</p>
            </div>

            <div className="flex items-baseline gap-4 border-b border-border/50 pb-6">
              <span className="text-3xl md:text-4xl font-bold text-primary">₦{book.price.toLocaleString()}</span>
            </div>

            <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground">
              <h3 className="text-foreground font-serif font-bold text-lg mb-2">Description</h3>
              <p>
                This is a comprehensive textbook designed for students of {book.category}. 
                It covers all the fundamental concepts and provides in-depth analysis suitable for university-level study.
                Recommended by the University of Nigeria, Nsukka faculty.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">ISBN</span>
                <p className="font-medium">978-3-16-148410-0</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Publisher</span>
                <p className="font-medium">UNN Press</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Pages</span>
                <p className="font-medium">450</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Language</span>
                <p className="font-medium">English</p>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex gap-4 pt-4">
              <AddToCartButton book={book} />
              <button className="w-14 h-14 border border-input bg-background rounded-xl flex items-center justify-center hover:bg-accent transition-colors">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t md:hidden z-40 pb-safe">
        <div className="flex gap-3">
          <AddToCartButton book={book} />
        </div>
      </div>
    </div>
  );
}
