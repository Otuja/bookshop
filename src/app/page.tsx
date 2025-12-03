"use client";

import { Hero } from "@/components/home/Hero";
import { BookCard } from "@/components/ui/BookCard";
import { books } from "@/lib/data";
import { BookOpen, GraduationCap, Truck, ShieldCheck, Star, Quote, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Animation variants for the container element.
 * Staggers the animation of children elements.
 */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Animation variants for individual items.
 * Fades in and moves up from 20px offset.
 */
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

/**
 * Home Page Component
 * 
 * Displays the landing page of the UNN Bookshop application.
 * Features:
 * - Hero section
 * - Featured Categories
 * - Latest Arrivals
 * - Why Choose Us section
 * - Newsletter subscription
 */

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16 overflow-hidden">
      <Hero />

      {/* Featured Categories */}
      <section className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold font-serif text-primary">Browse Categories</h2>
          <p className="text-muted-foreground mt-2">Find exactly what you need for your studies</p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { name: "Textbooks", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
            { name: "Research", icon: GraduationCap, color: "bg-green-100 text-green-600" },
            { name: "Merchandise", icon: Truck, color: "bg-yellow-100 text-yellow-600" },
            { name: "Past Questions", icon: ShieldCheck, color: "bg-purple-100 text-purple-600" },
          ].map((cat) => (
            <motion.div
              key={cat.name}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl border bg-card hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${cat.color.split(" ")[1]}`} />
              <div className={`p-5 rounded-full mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg font-serif">{cat.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Arrivals */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-serif text-primary">Latest Arrivals</h2>
            <p className="text-muted-foreground mt-2">New additions to our catalog</p>
          </motion.div>
          <motion.a 
            href="/shop" 
            className="text-primary font-medium hover:underline"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            View All
          </motion.a>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {books.map((book) => (
            <motion.div key={book.id} variants={item} className="h-full">
              <BookCard {...book} className="h-full hover:shadow-xl transition-shadow duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </section>



      {/* Why Choose Us */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-serif">Why Choose UNN Bookshop?</h2>
          </motion.div>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={item} className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Official & Authentic</h3>
              <p className="text-primary-foreground/80">
                Directly sourced from publishers and the university press. Guaranteed authenticity.
              </p>
            </motion.div>
            <motion.div variants={item} className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Fast Campus Delivery</h3>
              <p className="text-primary-foreground/80">
                Get your books delivered to your hostel or department within 24 hours.
              </p>
            </motion.div>
            <motion.div variants={item} className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Digital Resources</h3>
              <p className="text-primary-foreground/80">
                Access e-books and past question papers instantly from your dashboard.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Newsletter */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Stay Updated</h2>
            <p className="text-primary-foreground/80 text-lg">
              Subscribe to our newsletter for the latest book arrivals, academic resources, and campus news.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Enter your school email" 
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
