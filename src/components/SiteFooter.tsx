import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Neil. Built with care and coffee.</p>
        <div className="flex gap-6">
          <Link
            href="https://github.com/MrKwanZ"
            className="transition-colors hover:text-foreground"
            target="_blank"
          >
            <Image src="/github.svg" alt="GitHub" width={20} height={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/neil-cheng/"
            className="transition-colors hover:text-foreground"
            target="_blank"
          >
            <Image src="/linkedin-in.svg" alt="LinkedIn" width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
