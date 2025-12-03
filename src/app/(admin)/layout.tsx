"use client";

import Link from "next/link";
import { LayoutDashboard, BookOpen, ShoppingBag, Users, Settings, LogOut, Bell, Search, Menu, X, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBooks } from "@/context/BookContext";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { notifications, markNotificationAsRead, clearNotifications } = useBooks();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/inventory", label: "Inventory", icon: BookOpen },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col fixed inset-y-0 z-50 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b">
          <Logo />
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          <div className="mb-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Menu
          </div>
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all group"
            >
              <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t bg-muted/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 hover:bg-accent rounded-md">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="h-9 w-64 rounded-md border border-input bg-muted/50 px-3 py-1 pl-9 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 hover:bg-accent rounded-full transition-colors"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background animate-pulse"></span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-background border rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      {notifications.length > 0 && (
                        <button onClick={clearNotifications} className="text-xs text-muted-foreground hover:text-primary">
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                          No new notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b last:border-0 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex gap-3 items-start">
                              <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                                notification.type === 'success' ? 'bg-green-500' : 
                                notification.type === 'warning' ? 'bg-yellow-500' : 
                                notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                              }`} />
                              <div>
                                <p className="text-sm font-medium leading-none mb-1">{notification.title}</p>
                                <p className="text-xs text-muted-foreground">{notification.message}</p>
                                <p className="text-[10px] text-muted-foreground mt-1 opacity-70">
                                  {new Date(notification.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-8 w-px bg-border mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@unn.edu.ng</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>

        {/* Admin Footer */}
        <footer className="border-t bg-background py-6 px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} UNN Bookshop Admin Portal. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
