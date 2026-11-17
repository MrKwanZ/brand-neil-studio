import type { Metadata } from "next";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactContent } from "@/components/ContactContent";
import { ExperienceBand } from "@/components/ExperienceBand";
import { HomeHero } from "@/components/HomeHero";
import { ProjectsList } from "@/components/ProjectsList";
import { getProjectSummaries } from "@/lib/project-gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesSection />
      <ProjectsList variant="stories" projects={getProjectSummaries()} />
      <ExperienceBand />
      <ContactContent />
    </>
  );
}
