import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { TechIcon } from "@/components/TechIcon";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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
    title: { absolute: `${project.title} — Project by Neil` },
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

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <p className="mt-10 text-xs tracking-widest text-clay uppercase">
        {project.category} · {project.year}
      </p>
      <h1 className="mt-3 text-3xl font-semibold md:text-5xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>

      <Image
        src={project.image}
        alt={`${project.title} landing page`}
        width={1280}
        height={800}
        priority
        sizes="(min-width: 896px) 896px, 100vw"
        className="mt-10 w-full rounded-xl border border-border object-cover"
      />

      <div className="mt-14 grid gap-12 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold">About the project</h2>
          <p className="mt-4 text-muted-foreground">{project.description}</p>

          <h2 className="mt-10 text-xl font-semibold">Highlights</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside>
          <h2 className="text-xl font-semibold">Built with</h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {project.tech.map((tech) => (
              <TechIcon key={tech} tech={tech} />
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-20 rounded-xl border border-border bg-sand p-8 text-center">
        <h2 className="text-2xl font-semibold">Have something similar in mind?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell me about it — I usually reply within a day.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
      </div>
    </article>
  );
}
