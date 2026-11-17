import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: { absolute: "Services" },
  description:
    "Technical discovery, full stack product development, and codebase refactoring with Neil.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function ServicesRoute() {
  redirect("/#services");
}
