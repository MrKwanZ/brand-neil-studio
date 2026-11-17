import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageSection({
  id,
  labelledBy,
  label,
  children,
  className,
  tone = "canvas",
}: {
  id?: string;
  labelledBy?: string;
  label?: string;
  children: ReactNode;
  className?: string;
  tone?: "canvas" | "lifted" | "sand";
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(
        "scroll-mt-32 py-16 md:py-24",
        tone === "lifted" && "bg-card",
        tone === "sand" && "bg-sand",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-300 px-6 md:px-12">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "arc",
}: {
  children: ReactNode;
  tone?: "arc" | "live" | "soon";
}) {
  return (
    <p className="eyebrow">
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "arc" && "bg-arc",
          tone === "live" && "bg-live",
          tone === "soon" && "bg-soon",
        )}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
