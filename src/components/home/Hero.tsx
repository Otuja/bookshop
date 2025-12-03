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
    <section className="relative overflow-hidden bg-background pt-10 pb-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Mobile Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 md:hidden" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 md:hidden" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 flex flex-col items-center lg:items-start"
            >
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-secondary-foreground bg-secondary/10 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                Official UNN Bookshop
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-serif text-foreground">
                Your Gateway to <br className="hidden sm:block" />
                <span className="text-primary relative">
                  Academic Excellence
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                Access thousands of textbooks, research materials, and university merchandise. 
                Delivered directly to your department or hostel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
              <form
                onSubmit={handleSearch}
                className="flex w-full flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <div className="relative w-full group">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="search"
                    placeholder="Search by title, author, or ISBN..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 pl-10 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  />
                </div>
                <button type="submit" className="inline-flex h-12 items-center justify-center rounded-xl bg-secondary px-8 text-sm font-bold text-secondary-foreground shadow-lg shadow-secondary/20 transition-all hover:bg-secondary/90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Search
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Browse Catalog
              </Link>
               <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-input bg-background/50 backdrop-blur-sm px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
                  <div className="bg-background p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-bold text-sm">Vast Library</h3>
                    <p className="text-xs text-muted-foreground">Over 10,000 titles available</p>
                  </div>
                  <div className="bg-background p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <ShieldCheck className="h-8 w-8 text-secondary mb-2" />
                    <h3 className="font-bold text-sm">Authentic</h3>
                    <p className="text-xs text-muted-foreground">100% original copies</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="bg-background p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <Truck className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-bold text-sm">Fast Delivery</h3>
                    <p className="text-xs text-muted-foreground">Campus-wide delivery</p>
                  </div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-sm flex flex-col justify-center items-center text-center hover:scale-105 transition-transform">
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
