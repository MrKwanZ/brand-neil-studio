import type { Metadata } from "next";
import { AboutTimeline } from "@/components/AboutTimeline";

const title = "What's Neil";
const description =
  "Neil's journey from graduation in 2015 to building production web applications today.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutTimeline />;
}
