import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

const title = "Projects — Neil, full-stack developer";
const description =
  "Selected web applications by Neil: a company website, an e-commerce store and a SaaS analytics platform.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-semibold md:text-5xl">Projects</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        A few web applications I have designed, built and shipped.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <Image
              src={project.image}
              alt={`${project.title} landing page`}
              width={1280}
              height={800}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[16/10] w-full object-cover object-top"
            />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs tracking-widest text-clay uppercase">
                {project.category} · {project.year}
              </p>
              <h2 className="mt-2 flex items-center gap-1 text-xl font-semibold">
                {project.title}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
