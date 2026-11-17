"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { contactSection, observedSectionIds, pageSections, sectionHref } from "@/lib/sections";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [activeId, setActiveId] = useState<string | null>(null);
  const menuId = useId();
  const menuOpen = open && menuPath === pathname;
  const currentId = pathname === "/" ? activeId : null;

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const nodes = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id;
        if (nextId) {
          setActiveId(nextId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const onSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    closeMenu();

    if (pathname !== "/") {
      return;
    }

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", sectionHref(id));
    setActiveId(id);
  };

  const onHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    window.history.pushState(null, "", "/");
    setActiveId(null);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6">
      <div className="mx-auto flex max-w-300 justify-center">
        <div className="shadow-nav relative z-50 flex w-full items-center justify-between gap-4 rounded-full border border-white/80 bg-surface/80 px-3 py-2 backdrop-blur-md md:w-auto md:gap-8 md:px-5 md:py-2.5">
          <Link href="/" onClick={onHomeClick} aria-label="Neil, back to top" className="shrink-0">
            <Image
              src="/neil-notion.png"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {pageSections.map((section) => (
              <Link
                key={section.id}
                href={sectionHref(section.id)}
                onClick={(event) => onSectionClick(event, section.id)}
                className={
                  currentId === section.id
                    ? "text-base font-medium tracking-tight text-foreground"
                    : "text-base font-medium tracking-tight text-muted-foreground transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground"
                }
                aria-current={currentId === section.id ? "location" : undefined}
              >
                {section.label}
              </Link>
            ))}
            <Link
              href={sectionHref(contactSection.id)}
              onClick={(event) => onSectionClick(event, contactSection.id)}
              className="btn-primary px-4 py-2 text-sm"
              aria-current={currentId === contactSection.id ? "location" : undefined}
            >
              {contactSection.label}
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sand md:hidden"
            onClick={() => {
              setMenuPath(pathname);
              setOpen((value) => !value);
            }}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
          >
            <span
              className={`inline-flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "rotate-90" : ""}`}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          className="fixed inset-0 z-40 overflow-y-auto bg-background/95 px-6 pt-28 pb-10 backdrop-blur-xl md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-300 flex-col gap-2">
            {pageSections.map((section, index) => (
              <div
                key={section.id}
                className="rise-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Link
                  href={sectionHref(section.id)}
                  onClick={(event) => onSectionClick(event, section.id)}
                  className={
                    currentId === section.id
                      ? "block py-3 text-lg font-medium text-foreground"
                      : "block py-3 text-lg font-medium text-muted-foreground"
                  }
                  aria-current={currentId === section.id ? "location" : undefined}
                >
                  {section.label}
                </Link>
              </div>
            ))}
            <div className="rise-in" style={{ animationDelay: `${pageSections.length * 60}ms` }}>
              <Link
                href={sectionHref(contactSection.id)}
                onClick={(event) => onSectionClick(event, contactSection.id)}
                className="btn-primary mt-4"
                aria-current={currentId === contactSection.id ? "location" : undefined}
              >
                {contactSection.label}
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
