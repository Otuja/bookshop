"use client";

import { Hero } from "@/components/home/Hero";
import { BookCard } from "@/components/ui/BookCard";
import { BookOpen, GraduationCap, Truck, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useBooks } from "@/context/BookContext";

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

function LatestArrivalsSection() {
  const { books } = useBooks();
  const latestBooks = books.slice(0, 4);

  return (
    <section className="container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary">Latest Arrivals</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">New additions to our catalog</p>
        </motion.div>
        <motion.a 
          href="/shop" 
          className="text-primary font-medium hover:underline text-sm md:text-base flex items-center gap-1"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          View All <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {latestBooks.map((book) => (
          <motion.div key={book.id} variants={item} className="h-full">
            <BookCard {...book} className="h-full hover:shadow-xl transition-shadow duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

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
    <div className="flex flex-col gap-12 md:gap-24 pb-16 overflow-hidden">
      <Hero />

      {/* Featured Categories */}
      <section className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary">Browse Categories</h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">Find exactly what you need for your studies</p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
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
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border bg-card hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${cat.color.split(" ")[1]}`} />
              <div className={`p-4 md:p-5 rounded-full mb-3 md:mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <h3 className="font-bold text-sm md:text-lg font-serif text-center">{cat.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Arrivals */}
      <LatestArrivalsSection />

      {/* Why Choose Us */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L 100 0 L 100 100 Z" fill="currentColor" />
           </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-serif">Why Choose UNN Bookshop?</h2>
          </motion.div>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center"
          >
            <motion.div variants={item} className="space-y-3 md:space-y-4">
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ShieldCheck className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold">Official & Authentic</h3>
              <p className="text-primary-foreground/80 text-sm md:text-base">
                Directly sourced from publishers and the university press. Guaranteed authenticity.
              </p>
            </motion.div>
            <motion.div variants={item} className="space-y-3 md:space-y-4">
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Truck className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold">Fast Campus Delivery</h3>
              <p className="text-primary-foreground/80 text-sm md:text-base">
                Get your books delivered to your hostel or department within 24 hours.
              </p>
            </motion.div>
            <motion.div variants={item} className="space-y-3 md:space-y-4">
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold">Digital Resources</h3>
              <p className="text-primary-foreground/80 text-sm md:text-base">
                Access e-books and past question papers instantly from your dashboard.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold font-serif">Stay Updated</h2>
            <p className="text-primary-foreground/80 text-base md:text-lg">
              Subscribe to our newsletter for the latest book arrivals, academic resources, and campus news.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Enter your school email" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button className="bg-white text-primary font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
