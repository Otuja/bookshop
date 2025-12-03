"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
        initial={{ rotate: -10, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: "backOut",
          repeat: Infinity, 
          repeatDelay: 3,
          repeatType: "reverse" 
        }}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <motion.path 
          d="M12 7v7" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="text-secondary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.path 
          d="M9 10h6" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="text-secondary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.svg>
      <span className="text-2xl font-bold font-serif text-primary">
        UNN<span className="text-secondary">Bookshop</span>
      </span>
    </div>
  );
}
