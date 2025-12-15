"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Search, BookOpen, ShieldCheck, Truck, Sparkles } from "lucide-react";
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
    <section className="relative overflow-visible pt-10 pb-20 md:py-32">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 flex flex-col items-center lg:items-start"
            >
              <div className="inline-flex items-center rounded-full border border-green-200 px-3 py-1 text-sm font-medium text-green-800 bg-green-50 backdrop-blur-sm shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2 animate-pulse"></span>
                Official UNN Bookshop
              </div>
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-serif text-gray-900">
                Your Gateway to <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] relative">
                  Academic Excellence
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#FFD700]/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl mx-auto lg:mx-0 leading-relaxed">
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
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#1B5E20] transition-colors" />
                  <input
                    type="search"
                    placeholder="Search by title, author, or ISBN..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl px-4 py-2 pl-12 text-base shadow-lg shadow-gray-200/50 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E20] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  />
                </div>
                <button type="submit" className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#1B5E20] px-8 text-base font-bold text-white shadow-xl shadow-green-900/20 transition-all hover:bg-[#144a18] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
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
                className="inline-flex items-center justify-center rounded-2xl bg-[#FFD700] px-8 py-4 text-base font-bold text-[#0d4d1d] shadow-lg shadow-yellow-500/20 transition-all hover:bg-[#ffdf33] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Browse Catalog
              </Link>
               <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-medium shadow-sm transition-colors hover:bg-white hover:text-[#1B5E20] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
             className="hidden lg:flex justify-center relative"
          >
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-10 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 transform rotate-6"
            >
              <BookOpen className="h-12 w-12 text-[#1B5E20]" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-10 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 transform -rotate-6"
            >
              <Sparkles className="h-10 w-10 text-[#FFD700]" />
            </motion.div>

            <div className="relative w-[500px] h-[600px] bg-gradient-to-br from-green-100 to-blue-50 rounded-[3rem] transform rotate-[-3deg] border border-white/50 shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center shadow-inner">
                      <Image src="/logo.png" alt="UNN" width={80} height={80} className="object-contain" />
                    </div>
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-xs mx-auto">
                      <h3 className="font-bold text-lg text-gray-900">Student Essentials</h3>
                      <div className="flex -space-x-2 justify-center mt-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                            {i}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">Join 30,000+ students</p>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
