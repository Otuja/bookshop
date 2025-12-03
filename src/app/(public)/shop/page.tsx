"use client";

import { useState, Suspense } from "react";
import { BookCard } from "@/components/ui/BookCard";
import { Filter, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { SearchInput } from "@/components/ui/SearchInput";

import { useBooks } from "@/context/BookContext";

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true
  });

  const { books, categories: contextCategories } = useBooks();
  const categories = ["All", ...contextCategories];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery) || 
                          book.author.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 md:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
           <div className="flex items-center justify-between gap-4">
             <button 
               onClick={() => setIsFiltersOpen(!isFiltersOpen)}
               className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-3 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all"
             >
               <Filter className="h-4 w-4" />
               {isFiltersOpen ? "Hide Filters" : "Filter Books"}
             </button>
             <div className="bg-muted px-4 py-3 rounded-xl text-sm font-medium">
               {filteredBooks.length} results
             </div>
           </div>
           
           {/* Mobile Collapsible Filters */}
           <AnimatePresence>
             {isFiltersOpen && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="overflow-hidden"
               >
                 <div className="pt-4 space-y-6 bg-card border rounded-xl p-4 mt-4 shadow-sm">
                    {/* Search */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Search</h4>
                      <SearchInput className="w-full" placeholder="Search by title or author..." />
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => toggleSection('categories')}
                        className="flex items-center justify-between w-full font-medium text-sm text-muted-foreground uppercase tracking-wider hover:text-primary transition-colors"
                      >
                        Categories
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedSections.categories && (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`text-left text-sm px-3 py-2 rounded-lg transition-all border ${
                                selectedCategory === category
                                  ? "bg-primary text-primary-foreground border-primary font-medium"
                                  : "hover:bg-accent hover:text-accent-foreground border-transparent bg-muted/50"
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 hidden md:flex">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            
            <div className="space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Search</h4>
                <SearchInput className="w-full" placeholder="Search by title or author..." />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <button 
                  onClick={() => toggleSection('categories')}
                  className="flex items-center justify-between w-full font-medium text-sm text-muted-foreground uppercase tracking-wider hover:text-primary transition-colors"
                >
                  Categories
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSections.categories && (
                  <div className="flex flex-col gap-1 pt-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-left text-sm px-3 py-2 rounded-md transition-all ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "hover:bg-accent hover:text-accent-foreground text-foreground/80"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Price Range */}
              <div className="space-y-2">
                <button 
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full font-medium text-sm text-muted-foreground uppercase tracking-wider hover:text-primary transition-colors"
                >
                  Price Range
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSections.price && (
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                      <span className="text-muted-foreground">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>
                    <button className="w-full bg-secondary text-secondary-foreground text-sm font-bold py-2 rounded-md hover:bg-secondary/90 transition-colors shadow-sm">
                      Apply Price
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold font-serif">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Shop All Books"}
            </h1>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <button className="flex items-center gap-1 text-sm font-medium border rounded-md px-3 py-1.5 hover:bg-accent bg-background">
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
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
              <p className="text-muted-foreground text-lg">No books found matching your criteria.</p>
              <button 
                onClick={() => setSelectedCategory("All")}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear Filters
              </button>
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
