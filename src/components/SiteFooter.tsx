import Link from "next/link";
import Image from "next/image";
import { contactSection, sectionHref } from "@/lib/sections";

const columns = [
  {
    title: "Practice",
    links: [
      { href: sectionHref("services"), label: "Services" },
    ],
  },
  {
    title: "Work",
    links: [
      { href: sectionHref("work"), label: "Selected Works" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: sectionHref(contactSection.id), label: "Start an inquiry" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="mx-auto w-full max-w-300 px-6 pt-16 pb-24 md:px-12 md:pt-24">
        <h2 className="max-w-170 text-3xl leading-10 font-medium text-balance md:text-5xl md:leading-none">
          Brand Neil Studio
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-bold tracking-[0.04em] text-white/60 uppercase">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm font-[450] text-white transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70"
                    >
                      {link.label}
                      {"external" in link && link.external ? (
                        <span aria-hidden="true"> ↗</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/30 pt-6 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Brand Neil Studio. Based in Hong Kong.</p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/MrKwanZ"
              aria-label="GitHub"
              className="inline-flex size-11 items-center justify-center rounded-full transition-opacity duration-300 hover:opacity-70"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/neil-cheng/"
              aria-label="LinkedIn"
              className="inline-flex size-11 items-center justify-center rounded-full transition-opacity duration-300 hover:opacity-70"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/linkedin-in.svg"
                alt="LinkedIn"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
