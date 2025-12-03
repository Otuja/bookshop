"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Search, BookOpen, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Hero Component
 * 
 * Displays the main hero section of the home page with a background image,
 * title, description, and call-to-action buttons.
 * Uses framer-motion for entrance animations.
 */
export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-secondary-foreground bg-secondary/10 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
                Official UNN Bookshop
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-serif text-foreground">
                Your Gateway to <br />
                <span className="text-primary">Academic Excellence</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Access thousands of textbooks, research materials, and university merchandise. 
                Delivered directly to your department or hostel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-sm"
            >
              <form
                onSubmit={handleSearch}
                className="flex w-full flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search by title, author, or ISBN..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Search
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Browse Catalog
              </Link>
               <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          
          {/* Hero Image/Illustration */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="hidden lg:flex justify-center"
          >
            <div className="relative w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl absolute -z-10" />
            <div className="relative grid grid-cols-2 gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border shadow-xl">
               <div className="space-y-4 mt-8">
                  <div className="bg-background p-4 rounded-xl shadow-sm border">
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-bold text-sm">Vast Library</h3>
                    <p className="text-xs text-muted-foreground">Over 10,000 titles available</p>
                  </div>
                  <div className="bg-background p-4 rounded-xl shadow-sm border">
                    <ShieldCheck className="h-8 w-8 text-secondary mb-2" />
                    <h3 className="font-bold text-sm">Authentic</h3>
                    <p className="text-xs text-muted-foreground">100% original copies</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="bg-background p-4 rounded-xl shadow-sm border">
                    <Truck className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-bold text-sm">Fast Delivery</h3>
                    <p className="text-xs text-muted-foreground">Campus-wide delivery</p>
                  </div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl font-bold">24/7</span>
                    <span className="text-xs opacity-90">Online Support</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
