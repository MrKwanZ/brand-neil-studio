import fs from "node:fs";
import path from "node:path";
import type { StaticImageData } from "next/image";
import {
  evidenceLabel,
  projects,
  type Project,
  type ProjectAvailability,
  type ProjectKind,
} from "@/lib/projects";

const IMAGE_EXT = /\.(avif|gif|jpe?g|png|webp)$/i;

export type ProjectCard = {
  slug: string;
  title: string;
  category: string;
  year: string;
  kind: ProjectKind;
  evidence: string;
  summary: string;
  problem: string;
  outcome: string;
  image: StaticImageData | string;
  availability: ProjectAvailability;
};

export function getProjectGallery(folder: string): string[] {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/${folder}/${file}`);
}

export function getProjectSummaries(): ProjectCard[] {
  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    kind: project.kind,
    evidence: evidenceLabel(project.kind),
    summary: project.summary,
    problem: project.narrative.problem,
    outcome: project.narrative.outcome,
    image: getProjectCoverImage(project),
    availability: project.availability,
  }));
}

export function getProjectCoverImage(project: Project) {
  if (!project.galleryFolder) {
    return project.image;
  }

  const [first] = getProjectGallery(project.galleryFolder);
  return first ?? project.image;
}
