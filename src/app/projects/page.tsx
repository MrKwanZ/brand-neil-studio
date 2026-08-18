import type { Metadata } from "next";
import { ProjectsList } from "@/components/ProjectsList";
import { projects } from "@/lib/projects";
import { getProjectCoverImage } from "@/lib/project-gallery";

const title = "Neil Projects";
const description =
  "Selected web applications by Neil: a company website, an e-commerce store and a SaaS analytics platform.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const items = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    summary: project.summary,
    image: getProjectCoverImage(project),
  }));

  return <ProjectsList projects={items} />;
}
