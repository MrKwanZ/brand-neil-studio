import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/lib/projects";

const IMAGE_EXT = /\.(avif|gif|jpe?g|png|webp)$/i;

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

export function getProjectCoverImage(project: Project) {
  if (!project.galleryFolder) {
    return project.image;
  }

  const [first] = getProjectGallery(project.galleryFolder);
  return first ?? project.image;
}
