"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, PageSection } from "@/components/PageSection";
import { Reveal } from "@/components/Reveal";
import { availabilityCopy, type ProjectAvailability, type ProjectKind } from "@/lib/projects";

export type ProjectListItem = {
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

export function ProjectsList({
  projects,
  variant = "archive",
}: {
  projects: ProjectListItem[];
  variant?: "stories" | "archive";
}) {
  const isStories = variant === "stories";

  return (
    <PageSection id={isStories ? "work" : "project"} labelledBy="project-heading">
      <div className="mx-auto w-full max-w-300">
        <Reveal>
          <h2
            id="project-heading"
            className="mt-4 max-w-170 text-4xl leading-10 font-medium text-balance md:text-5xl md:leading-none"
          >
            {isStories ? "Selected Works" : "Projects"}
          </h2>
          {isStories ? (
            <p className="mt-4 max-w-170 text-base leading-6 text-pretty text-muted-foreground">
              Things that I have worked.
            </p>
          ) : null}
        </Reveal>

        <ProjectGroup title="Projects" projects={projects} variant={variant} />

        <Reveal delay={120}>
          <Link href="/projects" className="btn-text mt-8">
            Browse the full archive
          </Link>
        </Reveal>
      </div>
    </PageSection>
  );
}

function ProjectGroup({
  title,
  projects,
  variant,
}: {
  title: string;
  projects: ProjectListItem[];
  variant: "stories" | "archive";
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      {variant === "stories" ? (
        <div className="mt-8 space-y-10">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <article className="rounded-[40px] bg-card p-6 md:p-8">
                <div className="flex justify-end">
                  <ProjectAvailabilityMark status={project.availability} />
                </div>
                <div className="mt-4 grid items-center gap-8 md:grid-cols-[220px_1fr]">
                  <div className="relative mx-auto size-52 overflow-hidden rounded-full bg-sand">
                    <Image
                      src={project.image}
                      alt={`${project.title} product screen`}
                      fill
                      sizes="208px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="eyebrow">
                      {project.evidence} · {project.year}
                    </p>
                    <h3 className="mt-3 text-2xl leading-8 font-medium">{project.title}</h3>
                    <p className="mt-3 text-pretty text-sm text-muted-foreground">
                      {project.outcome}
                    </p>
                    <Link href={`/projects/${project.slug}`} className="btn-text mt-4">
                      Read the build
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <Link
                href={`/projects/${project.slug}`}
                className="group shadow-lift flex h-full flex-col overflow-hidden rounded-[40px] bg-card transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
              >
                <div className="relative aspect-16/10 w-full bg-sand">
                  <Image
                    src={project.image}
                    alt={`${project.title} product screen`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-card px-3 py-2">
                    <ProjectAvailabilityMark status={project.availability} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow">
                    {project.evidence} · {project.year}
                  </p>
                  <h3 className="mt-3 flex items-center gap-1 text-2xl leading-8 font-medium">
                    {project.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-3 text-pretty text-sm text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectAvailabilityMark({ status }: { status: ProjectAvailability }) {
  const { label, tone } = availabilityCopy[status];
  return <Eyebrow tone={tone}>{label}</Eyebrow>;
}
