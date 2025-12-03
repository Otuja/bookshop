"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { books as initialBooks } from "@/lib/data";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  description?: string;
  isbn?: string;
  pages?: number;
  language?: string;
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
  categories: string[];
  notifications: Notification[];
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (id: string, updatedBook: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addCategory: (category: string) => void;
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "Computer Science",
    "Engineering",
    "Law",
    "Economics",
    "Medicine",
    "Arts",
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    const storedCategories = localStorage.getItem("categories");
    const storedNotifications = localStorage.getItem("notifications");

    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      setBooks(initialBooks);
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }

    if (storedNotifications) {
      // Need to revive dates
      const parsed = JSON.parse(storedNotifications);
      setNotifications(parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) })));
    }

    setIsInitialized(true);
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

  const addBook = (bookData: Omit<Book, "id">) => {
    const newBook: Book = {
      ...bookData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBooks((prev) => [newBook, ...prev]);
    addNotification({
      title: "Book Added",
      message: `"${newBook.title}" has been added to inventory.`,
      type: "success",
    });
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
    addNotification({
      title: "Book Updated",
      message: "Book details have been updated successfully.",
      type: "info",
    });
  };

  const deleteBook = (id: string) => {
    const book = books.find((b) => b.id === id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (book) {
      addNotification({
        title: "Book Deleted",
        message: `"${book.title}" has been removed from inventory.`,
        type: "warning",
      });
    }
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
      addNotification({
        title: "Category Added",
        message: `Category "${category}" has been created.`,
        type: "success",
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
