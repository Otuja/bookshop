import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-9xl font-bold font-serif text-primary/20">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-foreground">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
    </div>
  );
}
