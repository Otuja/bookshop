"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";
import { books as initialBooks } from "@/lib/data";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string; // Keeping as string (name) for display, but we might need ID for updates
  categoryId?: string; // Add ID for internal use
  stock_quantity: number;
  is_active: boolean;
  rating?: number;
  reviews?: number;
  description?: string;
  isbn?: string;
  publisher?: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: Date;
};

type BookContextType = {
  books: Book[];
  categories: Category[];
  notifications: Notification[];
  addBook: (book: Omit<Book, "id" | "image"> & { image?: File }) => void;
  updateBook: (id: string, updatedBook: Partial<Omit<Book, "image"> & { image?: File }>) => void;
  deleteBook: (id: string) => void;
  addCategory: (category: string) => void;
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, categoriesRes] = await Promise.all([
          api.get('/books/'),
          api.get('/categories/')
        ]);

        const mappedCategories = categoriesRes.data.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug
        }));
        setCategories(mappedCategories);

const DEFAULT_BOOK_IMAGE = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800";

        const mappedBooks = booksRes.data.map((b: any) => ({
          id: b.id,
          title: b.title,
          author: b.author,
          price: parseFloat(b.price),
          image: b.cover_image, // Let components handle default fallback
          category: b.category.name,
          categoryId: b.category.id,
          stock_quantity: b.stock_quantity,
          is_active: b.is_active,
          description: b.description,
          rating: 4.5, // Mock rating for now
          reviews: 0,
          isbn: b.isbn || "N/A",
          publisher: b.publisher || "UNN Press"
        }));

        console.log("Fetched books from backend:", mappedBooks);
        setBooks(mappedBooks);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications, isInitialized]);

  const addBook = async (bookData: Omit<Book, "id" | "image"> & { image?: File }) => {
    try {
      // Find category ID
      const categoryObj = categories.find(c => c.name === bookData.category);
      if (!categoryObj) {
        throw new Error("Invalid category");
      }

      const formData = new FormData();
      formData.append('title', bookData.title);
      formData.append('author', bookData.author);
      formData.append('price', bookData.price.toString());
      formData.append('description', bookData.description || "");
      formData.append('stock_quantity', bookData.stock_quantity.toString());
      formData.append('is_active', bookData.is_active ? 'true' : 'false');
      formData.append('category_id', categoryObj.id);
      if (bookData.isbn) formData.append('isbn', bookData.isbn);
      if (bookData.publisher) formData.append('publisher', bookData.publisher);
      
      if (bookData.image) {
        formData.append('cover_image', bookData.image);
      }

      const response = await api.post('/books/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const newBook: Book = { 
        ...bookData, 
        id: response.data.id,
        image: response.data.cover_image, // Use returned image URL
        categoryId: response.data.category.id,
        // Ensure we have the correct types for the state
      } as Book;

      setBooks((prev) => [newBook, ...prev]);
      
      addNotification({
        title: "Book Added",
        message: `"${newBook.title}" has been added to inventory.`,
        type: "success",
      });
    } catch (error) {
      console.error("Failed to add book", error);
      addNotification({
        title: "Error",
        message: "Failed to add book.",
        type: "error",
      });
    }
  };

  const updateBook = async (id: string, updatedBook: Partial<Omit<Book, "image"> & { image?: File }>) => {
    try {
      const formData = new FormData();
      if (updatedBook.title) formData.append('title', updatedBook.title);
      if (updatedBook.author) formData.append('author', updatedBook.author);
      if (updatedBook.price) formData.append('price', updatedBook.price.toString());
      if (updatedBook.description) formData.append('description', updatedBook.description);
      if (updatedBook.stock_quantity !== undefined) formData.append('stock_quantity', updatedBook.stock_quantity.toString());
      if (updatedBook.is_active !== undefined) formData.append('is_active', updatedBook.is_active ? 'true' : 'false');
      if (updatedBook.isbn) formData.append('isbn', updatedBook.isbn);
      if (updatedBook.publisher) formData.append('publisher', updatedBook.publisher);
      
      if (updatedBook.category) {
         const categoryObj = categories.find(c => c.name === updatedBook.category);
         if (categoryObj) formData.append('category_id', categoryObj.id);
      }

      if (updatedBook.image) {
        formData.append('cover_image', updatedBook.image);
      }

      const response = await api.patch(`/books/${id}/`, formData, {
         headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setBooks((prev) =>
        prev.map((book) => {
            if (book.id === id) {
                return {
                    ...book,
                    ...updatedBook,
                    image: response.data.cover_image || book.image, // Update image if returned
                } as Book;
            }
            return book;
        })
      );
      addNotification({
        title: "Book Updated",
        message: "Book details have been updated successfully.",
        type: "info",
      });
    } catch (error) {
      console.error("Failed to update book", error);
      addNotification({
        title: "Error",
        message: "Failed to update book.",
        type: "error",
      });
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await api.delete(`/books/${id}/`);
      const book = books.find((b) => b.id === id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      if (book) {
        addNotification({
          title: "Book Deleted",
          message: `"${book.title}" has been removed from inventory.`,
          type: "warning",
        });
      }
    } catch (error) {
      console.error("Failed to delete book", error);
      addNotification({
        title: "Error",
        message: "Failed to delete book.",
        type: "error",
      });
    }
  };

  const addCategory = async (categoryName: string) => {
    try {
      const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
      const response = await api.post('/categories/', { name: categoryName, slug });
      
      const newCategory = {
        id: response.data.id,
        name: response.data.name,
        slug: response.data.slug
      };

      if (!categories.some(c => c.id === newCategory.id)) {
        setCategories((prev) => [...prev, newCategory]);
        addNotification({
          title: "Category Added",
          message: `Category "${categoryName}" has been created.`,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Failed to add category", error);
       addNotification({
        title: "Error",
        message: "Failed to add category.",
        type: "error",
      });
    }
  };

  const addNotification = (notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        categories,
        notifications,
        addBook,
        updateBook,
        deleteBook,
        addCategory,
        addNotification,
        markNotificationAsRead,
        clearNotifications,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
}
