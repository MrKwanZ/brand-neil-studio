"use client";

import {
  createElement,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function Reveal({ as = "div", children, className, delay = 0, id }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>(0.18);

  return createElement(
    as,
    {
      id,
      ref: ref as Ref<HTMLElement>,
      "data-visible": visible ? "true" : "false",
      className: cn("reveal", className),
      style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
