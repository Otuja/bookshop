"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src="/logo.png"
        alt="UNN Bookshop Logo"
        className="h-8 w-8 object-contain"
      />
      <span className="text-2xl font-bold font-serif text-primary">
        UNN<span className="text-secondary">Bookshop</span>
      </span>
    </div>
  );
}
