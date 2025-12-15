"use client";

import { Hero } from "@/components/home/Hero";
import { BookOpen, GraduationCap, Truck, ShieldCheck, Mail, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LatestArrivalsSection from "@/components/home/LatestArrivalsSection";
import BackgroundGeometry from "@/components/ui/BackgroundGeometry";

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
    <div className="flex flex-col gap-12 md:gap-24 pb-16 overflow-hidden relative">
      <BackgroundGeometry />
      
      <Hero />

      {/* Featured Categories */}
      <section className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-4">Explore Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need for your course of study.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { name: "Engineering", icon: "⚙️", color: "bg-blue-100 text-blue-700" },
            { name: "Medical", icon: "🩺", color: "bg-red-100 text-red-700" },
            { name: "Sciences", icon: "🧬", color: "bg-green-100 text-green-700" },
            { name: "Arts", icon: "🎨", color: "bg-purple-100 text-purple-700" },
            { name: "Social Sciences", icon: "🌍", color: "bg-orange-100 text-orange-700" },
            { name: "Law", icon: "⚖️", color: "bg-yellow-100 text-yellow-700" },
            { name: "Management", icon: "📊", color: "bg-indigo-100 text-indigo-700" },
            { name: "General Studies", icon: "📚", color: "bg-gray-100 text-gray-700" },
          ].map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={`/shop?category=${cat.name}`} className="group block h-full">
                <div className="bg-white/80 backdrop-blur-sm border rounded-2xl p-6 text-center h-full shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${cat.color} flex items-center justify-center text-3xl shadow-inner`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{cat.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Arrivals */}
      <LatestArrivalsSection />

      {/* Why Choose Us */}
      <section className="bg-primary/5 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-4">Why Choose UNN Bookshop?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to supporting your academic journey with quality and convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Official & Authentic", 
                desc: "Directly from publishers and the university press. No counterfeits." 
              },
              { 
                icon: Truck, 
                title: "Campus Delivery", 
                desc: "Get your books delivered to your faculty or hostel within 24 hours." 
              },
              { 
                icon: Clock, 
                title: "24/7 Access", 
                desc: "Order anytime, anywhere. Our digital platform never sleeps." 
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
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
