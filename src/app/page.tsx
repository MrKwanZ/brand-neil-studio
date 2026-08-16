import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeHero />;
}
