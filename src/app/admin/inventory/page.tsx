import { books } from "@/lib/data";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Image from "next/image";

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif">Inventory Management</h1>
        <button className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add New Book
        </button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search inventory..."
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <select className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option>All Categories</option>
          <option>Computer Science</option>
          <option>Engineering</option>
          <option>Law</option>
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
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {books.map((book) => (
                <tr key={book.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-8 bg-muted rounded overflow-hidden relative">
                        <Image src={book.image} alt="" fill className="object-cover" sizes="32px" />
                      </div>
                      {book.title}
                    </div>
                  </td>
                  <td className="p-4 align-middle">{book.author}</td>
                  <td className="p-4 align-middle">
                    <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-xs">
                      {book.category}
                    </span>
                  </td>
                  <td className="p-4 align-middle">₦{book.price.toLocaleString()}</td>
                  <td className="p-4 align-middle">45</td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-accent rounded-md transition-colors">
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-destructive/10 rounded-md transition-colors">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
