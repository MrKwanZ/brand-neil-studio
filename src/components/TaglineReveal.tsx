"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const lines = [
  "One-stop service.",
  "All based on your needs.",
];

export function TaglineReveal() {
  return (
    <section aria-label="Promise" className="bg-sand px-6 py-20 md:py-28">
      <div className="mx-auto max-w-170">
        {lines.map((line) => (
          <p
            key={line}
            className="text-4xl leading-10 font-medium text-balance md:text-5xl md:leading-none"
          >
            {line.split(" ").map((word, index) => (
              <Word key={`${word}-${index}`} delay={index * 50}>
                {word}
              </Word>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

function Word({ children, delay }: { children: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      data-active={active ? "true" : "false"}
      className="tagline-word"
      style={{ "--word-delay": `${delay}ms` } as CSSProperties}
    >
      {children}{" "}
    </span>
  );
}
