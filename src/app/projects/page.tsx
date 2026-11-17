import type { Metadata } from "next";
import { ProjectsList } from "@/components/ProjectsList";
import { getProjectSummaries } from "@/lib/project-gallery";

const title = "Projects";
const description =
  "Personal products by Neil, including an online store and a stock analysis product.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsList variant="archive" projects={getProjectSummaries()} />;
}
