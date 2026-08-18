"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects as defaultProjects } from "@/lib/projects";

type ProjectListItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  image: StaticImageData | string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsList({ projects = defaultProjects }: { projects?: ProjectListItem[] }) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = reduceMotion === false;

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <motion.h1
        variants={fadeUp}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
        transition={{ duration: shouldAnimate ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl font-semibold md:text-5xl"
      >
        Projects
      </motion.h1>
      <motion.p
        variants={fadeUp}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
        transition={{
          duration: shouldAnimate ? 0.7 : 0,
          delay: shouldAnimate ? 0.15 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-4 max-w-xl text-muted-foreground"
      >
        A few web applications I have designed, built and shipped.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
        transition={{
          duration: shouldAnimate ? 0.7 : 0,
          delay: shouldAnimate ? 0.3 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-14 grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full bg-sand">
              <Image
                src={project.image}
                alt={`${project.title} landing page`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
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
      </motion.div>
    </div>
  );
}
