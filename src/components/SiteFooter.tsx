import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Neil. Built with care and coffee.</p>
        <div className="flex gap-6">
          <Link href="/projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Work with me
          </Link>
        </div>
      </div>
    </footer>
  );
}
