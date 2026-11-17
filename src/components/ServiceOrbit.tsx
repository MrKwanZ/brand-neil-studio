"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

type Point = { x: number; y: number };

export function ServiceOrbit() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);
  const svgRef = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");

  useEffect(() => {
    const node = ref.current;
    const svg = svgRef.current;
    const parent = node?.parentElement;
    if (!node || !svg || !parent) {
      return;
    }

    const update = () => {
      const portraits = parent.querySelectorAll<HTMLElement>("[data-service-portrait]");
      if (portraits.length < 3) {
        return;
      }

      const bounds = svg.getBoundingClientRect();
      const centers = [...portraits].map((portrait) => {
        const box = portrait.getBoundingClientRect();
        return {
          x: box.left - bounds.left + box.width / 2,
          y: box.top - bounds.top + box.height / 2,
        };
      });
      const [start, middle, end] = centers as [Point, Point, Point];
      setPath(
        `M ${start.x} ${start.y} C ${start.x + 120} ${start.y - 72}, ${middle.x - 110} ${middle.y - 36}, ${middle.x} ${middle.y} C ${middle.x + 120} ${middle.y + 48}, ${end.x - 90} ${end.y + 64}, ${end.x} ${end.y}`,
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className="service-orbit reveal pointer-events-none absolute inset-0 hidden lg:block"
      style={{ "--reveal-delay": "0ms" }}
    >
      <svg ref={svgRef} className="h-full w-full" aria-hidden="true">
        <path d={path} pathLength="1" stroke="var(--arc)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}
