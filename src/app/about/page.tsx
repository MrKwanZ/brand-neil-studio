import type { Metadata } from "next";
import { AboutTimeline } from "@/components/AboutTimeline";

const title = "About Neil — full-stack developer";
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
