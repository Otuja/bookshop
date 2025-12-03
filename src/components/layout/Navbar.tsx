"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ShoppingCart, User, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
            
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-accent rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/login" className="p-2 hover:bg-accent rounded-full transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent rounded-full transition-colors relative z-[60]"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Rendered via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99] bg-background/80 backdrop-blur-sm md:hidden cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-[100] w-3/4 max-w-sm bg-background border-l shadow-2xl md:hidden flex flex-col p-6 pt-6"
              >
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-accent rounded-full transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between text-lg font-medium py-4 px-4 rounded-xl transition-colors",
                          pathname === link.href 
                            ? "bg-primary/10 text-primary" 
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        {link.label}
                        <ChevronRight className={cn(
                          "h-5 w-5 transition-transform",
                          pathname === link.href ? "text-primary translate-x-1" : "text-muted-foreground"
                        )} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-3 mt-auto pt-8 border-t"
                >
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Cart ({totalItems})
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-secondary/20 active:scale-95 transition-all"
                  >
                    <User className="h-5 w-5" />
                    Login
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}
