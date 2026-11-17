import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/PageSection";
import { Reveal } from "@/components/Reveal";
import { ProjectGallery } from "@/components/ProjectGallery";
import { TechIcon } from "@/components/TechIcon";
import {
  availabilityCopy,
  getProject,
  getProjectNeighbors,
  projects,
} from "@/lib/projects";
import { getProjectGallery } from "@/lib/project-gallery";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const narrativeOrder = [
  ["problem", "Problem"],
  ["constraints", "Constraints"],
  ["decisions", "Decisions"],
  ["implementation", "Implementation"],
  ["outcome", "Outcome"],
] as const;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { absolute: `${project.title} — Neil` },
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const gallery = project.galleryFolder ? getProjectGallery(project.galleryFolder) : [];
  const { previous, next } = getProjectNeighbors(project.slug);

  return (
    <article className="mx-auto w-full max-w-300 px-6 py-10 md:px-12 md:py-16">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors duration-300 hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/projects" className="transition-colors duration-300 hover:text-foreground">
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground" aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      <Reveal>
        <Link href="/projects" className="btn-text mt-8">
          <ArrowLeft className="h-4 w-4" /> All public work
        </Link>
        <div className="mt-6">
          <Eyebrow tone={availabilityCopy[project.availability].tone}>
            {availabilityCopy[project.availability].label}
          </Eyebrow>
        </div>
        <h1 className="mt-4 max-w-170 text-4xl leading-10 font-medium text-balance md:text-6xl md:leading-none">
          {project.title}
        </h1>
        <p className="mt-4 max-w-170 text-pretty text-muted-foreground">{project.summary}</p>
      </Reveal>

      {gallery.length > 0 ? (
        <ProjectGallery images={gallery} alt={`${project.title} product screen`} />
      ) : (
        <Image
          src={project.image}
          alt={`${project.title} product screen`}
          width={1280}
          height={800}
          priority
          sizes="(min-width: 1200px) 1104px, 100vw"
          className="shadow-lift mt-10 aspect-16/10 w-full rounded-[40px] bg-sand object-cover object-top"
        />
      )}

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-10">
          {narrativeOrder.map(([key, label], index) => (
            <Reveal key={key} delay={index * 60}>
              <h2 className="text-2xl leading-8 font-medium">{label}</h2>
              <p className="mt-3 max-w-170 text-pretty text-muted-foreground">
                {project.narrative[key]}
              </p>
            </Reveal>
          ))}
          <Reveal delay={300}>
            <h2 className="text-2xl leading-8 font-medium">What shipped</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-pretty text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal as="aside" delay={120}>
          <h2 className="text-2xl leading-8 font-medium">Built with</h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {project.tech.map((tech) => (
              <TechIcon key={tech} tech={tech} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                See it in Action
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Image src="/github.svg" alt="" width={20} height={20} aria-hidden />
              View source
            </Link>
          </div>
        </Reveal>
      </div>

      <nav aria-label="More work" className="mt-16 grid gap-4 sm:grid-cols-2">
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className="rounded-[40px] bg-card p-6">
            <span className="text-sm text-muted-foreground">Previous</span>
            <span className="mt-2 flex items-center gap-2 text-xl font-medium">
              <ArrowLeft className="h-4 w-4" /> {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="rounded-[40px] bg-card p-6 sm:text-right"
          >
            <span className="text-sm text-muted-foreground">Next</span>
            <span className="mt-2 flex items-center gap-2 text-xl font-medium sm:justify-end">
              {next.title} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ) : null}
      </nav>

      <Reveal>
        <div className="mt-12 rounded-[40px] bg-sand px-6 py-10 text-center">
          <h2 className="text-3xl leading-9 font-medium text-balance">
            Have a system that needs this kind of work?
          </h2>
          <Link href="/#contact" className="btn-primary mt-6">
            Start here
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
