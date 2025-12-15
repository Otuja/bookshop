"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { toast } from "sonner";

export function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed to newsletter!");
  };

  return (
    <footer className="bg-muted text-muted-foreground pt-16 pb-8 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed">
              The official online bookshop for the University of Nigeria, Nsukka. Quality educational resources for every student.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>University of Nigeria, Nsukka,<br />Enugu State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>support@unnbookshop.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get updates on new arrivals and special offers.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} UNN Bookshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
