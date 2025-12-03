"use client";

import { useState, Suspense } from "react";
import { BookCard } from "@/components/ui/BookCard";
import { books } from "@/lib/data";
import { Filter, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { SearchInput } from "@/components/ui/SearchInput";

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Computer Science", "Engineering", "Law", "Economics", "Medicine", "Arts"];

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery) || 
                          book.author.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Search</h4>
              <SearchInput className="w-full" placeholder="Search by title or author..." />
            </div>
            <div className="space-y-2 mt-6">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Categories</h4>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left text-sm px-2 py-1.5 rounded-md transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-8 space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <button className="w-full mt-2 bg-secondary text-secondary-foreground text-sm font-medium py-1.5 rounded-md hover:bg-secondary/90 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-serif">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Shop All Books"}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <button className="flex items-center gap-1 text-sm font-medium border rounded-md px-3 py-1.5 hover:bg-accent">
                Newest <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
