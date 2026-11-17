import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: { absolute: "Experience" },
  description: "Neil's path from production software to independent technical consultancy.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function AboutPage() {
  redirect("/#experience");
}
