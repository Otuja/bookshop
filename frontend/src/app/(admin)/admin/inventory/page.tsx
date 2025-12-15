"use client";

import { useBooks, Book } from "@/context/BookContext";
import { Plus, Pencil, Trash2, Search, X, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DEFAULT_BOOK_IMAGE } from "@/lib/constants";

const InventoryImage = ({ src, alt, sizes = "32px" }: { src: string; alt: string; sizes?: string }) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_BOOK_IMAGE);
  return (
    <Image 
      src={imgSrc} 
      alt={alt} 
      fill 
      className="object-cover" 
      sizes={sizes}
      onError={() => setImgSrc(DEFAULT_BOOK_IMAGE)} 
      unoptimized
    />
  );
};

export default function InventoryPage() {
  const { books, categories, addBook, updateBook, deleteBook, addCategory } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  const [currentBook, setCurrentBook] = useState<Partial<Omit<Book, "image"> & { image?: File | string }>>({});
  const [newCategory, setNewCategory] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBook.title && currentBook.author && currentBook.price) {
      addBook({
        title: currentBook.title,
        author: currentBook.author,
        price: Number(currentBook.price),
        category: currentBook.category || "Computer Science",
        image: currentBook.image instanceof File ? currentBook.image : undefined,
        description: currentBook.description || "No description provided.",
        stock_quantity: Number(currentBook.stock_quantity) || 0,
        is_active: currentBook.is_active !== undefined ? currentBook.is_active : true,
      });
      setIsAddModalOpen(false);
      setCurrentBook({});
    }
  };

  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBook.id && currentBook.title) {
      updateBook(currentBook.id, {
        ...currentBook,
        image: currentBook.image instanceof File ? currentBook.image : undefined,
      });
      setIsEditModalOpen(false);
      setCurrentBook({});
    }
  };

  const handleDeleteBook = () => {
    if (currentBook.id) {
      deleteBook(currentBook.id);
      setIsDeleteModalOpen(false);
      setCurrentBook({});
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory) {
      addCategory(newCategory);
      setNewCategory("");
      setIsCategoryModalOpen(false);
    }
  };

  const openEditModal = (book: Book) => {
    setCurrentBook(book);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (book: Book) => {
    setCurrentBook(book);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-serif">Inventory Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-secondary text-secondary-foreground h-10 px-4 py-2 rounded-md font-medium hover:bg-secondary/80 transition-colors text-sm"
          >
            Add Category
          </button>
          <button 
            onClick={() => { setCurrentBook({}); setIsAddModalOpen(true); }}
            className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" /> Add New Book
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-9 w-full sm:w-auto rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option>All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-muted/50">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Book Title</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Author</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No books found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-8 bg-muted rounded overflow-hidden relative flex-shrink-0">
                          <InventoryImage src={book.image} alt="" />
                        </div>
                        <span className="line-clamp-1">{book.title}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{book.author}</td>
                    <td className="p-4 align-middle">
                      <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-xs whitespace-nowrap">
                        {book.category}
                      </span>
                    </td>
                    <td className="p-4 align-middle">₦{book.price.toLocaleString()}</td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(book)} className="p-2 hover:bg-accent rounded-md transition-colors">
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => openDeleteModal(book)} className="p-2 hover:bg-destructive/10 rounded-md transition-colors">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Book Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Book</h2>
              <button onClick={() => setIsAddModalOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddBook} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <input required className="w-full h-10 rounded-md border px-3" value={currentBook.title || ""} onChange={e => setCurrentBook({...currentBook, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Author</label>
                  <input required className="w-full h-10 rounded-md border px-3" value={currentBook.author || ""} onChange={e => setCurrentBook({...currentBook, author: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <input required type="number" className="w-full h-10 rounded-md border px-3" value={currentBook.price || ""} onChange={e => setCurrentBook({...currentBook, price: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full h-10 rounded-md border px-3 bg-background" value={currentBook.category || ""} onChange={e => setCurrentBook({...currentBook, category: e.target.value})}>
                    <option value="" disabled>Select Category</option>
                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ISBN</label>
                  <input className="w-full h-10 rounded-md border px-3" value={currentBook.isbn || ""} onChange={e => setCurrentBook({...currentBook, isbn: e.target.value})} placeholder="Optional" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Publisher</label>
                  <input className="w-full h-10 rounded-md border px-3" value={currentBook.publisher || ""} onChange={e => setCurrentBook({...currentBook, publisher: e.target.value})} placeholder="Optional" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Quantity</label>
                  <input required type="number" className="w-full h-10 rounded-md border px-3" value={currentBook.stock_quantity || ""} onChange={e => setCurrentBook({...currentBook, stock_quantity: Number(e.target.value)})} />
                </div>
                <div className="space-y-2 flex items-center pt-6 gap-2">
                  <input type="checkbox" id="is_active" className="h-4 w-4" checked={currentBook.is_active !== false} onChange={e => setCurrentBook({...currentBook, is_active: e.target.checked})} />
                  <label htmlFor="is_active" className="text-sm font-medium">Is Active</label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full h-20 rounded-md border px-3 py-2" value={currentBook.description || ""} onChange={e => setCurrentBook({...currentBook, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <input type="file" accept="image/*" className="w-full h-10 rounded-md border px-3 py-1.5" onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setCurrentBook({...currentBook, image: e.target.files[0]});
                  }
                }} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-accent">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Add Book</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Edit Book</h2>
              <button onClick={() => setIsEditModalOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleUpdateBook} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <input required className="w-full h-10 rounded-md border px-3" value={currentBook.title || ""} onChange={e => setCurrentBook({...currentBook, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Author</label>
                  <input required className="w-full h-10 rounded-md border px-3" value={currentBook.author || ""} onChange={e => setCurrentBook({...currentBook, author: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <input required type="number" className="w-full h-10 rounded-md border px-3" value={currentBook.price || ""} onChange={e => setCurrentBook({...currentBook, price: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full h-10 rounded-md border px-3 bg-background" value={currentBook.category || ""} onChange={e => setCurrentBook({...currentBook, category: e.target.value})}>
                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ISBN</label>
                  <input className="w-full h-10 rounded-md border px-3" value={currentBook.isbn || ""} onChange={e => setCurrentBook({...currentBook, isbn: e.target.value})} placeholder="Optional" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Publisher</label>
                  <input className="w-full h-10 rounded-md border px-3" value={currentBook.publisher || ""} onChange={e => setCurrentBook({...currentBook, publisher: e.target.value})} placeholder="Optional" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Quantity</label>
                  <input required type="number" className="w-full h-10 rounded-md border px-3" value={currentBook.stock_quantity || ""} onChange={e => setCurrentBook({...currentBook, stock_quantity: Number(e.target.value)})} />
                </div>
                <div className="space-y-2 flex items-center pt-6 gap-2">
                  <input type="checkbox" id="edit_is_active" className="h-4 w-4" checked={currentBook.is_active !== false} onChange={e => setCurrentBook({...currentBook, is_active: e.target.checked})} />
                  <label htmlFor="edit_is_active" className="text-sm font-medium">Is Active</label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full h-20 rounded-md border px-3 py-2" value={currentBook.description || ""} onChange={e => setCurrentBook({...currentBook, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex gap-2 items-center">
                   {typeof currentBook.image === 'string' && (
                       <div className="h-10 w-10 relative overflow-hidden rounded border">
                            <InventoryImage src={currentBook.image} alt="Current" />
                       </div>
                   )}
                   <input type="file" accept="image/*" className="flex-1 h-10 rounded-md border px-3 py-1.5" onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setCurrentBook({...currentBook, image: e.target.files[0]});
                      }
                   }} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-accent">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Delete Book</h2>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete "{currentBook.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-accent">Cancel</button>
                <button onClick={handleDeleteBook} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add Category</h2>
              <button onClick={() => setIsCategoryModalOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddCategory} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Name</label>
                <input required className="w-full h-10 rounded-md border px-3" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="e.g. Philosophy" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-accent">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
