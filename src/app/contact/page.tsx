import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: { absolute: "Start a project" },
  description: "Start a project with Neil.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function ContactPage() {
  redirect("/#contact");
}
