import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Brand Neil Studio" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl leading-none font-medium text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-medium text-foreground">Page not found.</h2>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
