"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BookCard } from "@/components/ui/BookCard";
import { useBooks } from "@/context/BookContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LatestArrivalsSection() {
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
