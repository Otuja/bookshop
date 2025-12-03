import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { CartProvider } from "@/context/CartContext";
import { BookProvider } from "@/context/BookContext";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "UNN Bookshop",
  description: "Official Bookshop of the University of Nigeria, Nsukka",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable,
          playfair.variable
        )}
      >
        <CartProvider>
          <BookProvider>
            {children}
            <Toaster />
          </BookProvider>
        </CartProvider>
      </body>
    </html>
  );
}
