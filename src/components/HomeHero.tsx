"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/neil-hero.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = reduceMotion === false;

  return (
    <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
      <div className="flex flex-col items-start">
        <motion.h1
          variants={fadeUp}
          initial={shouldAnimate ? "hidden" : false}
          animate="visible"
          transition={{ duration: shouldAnimate ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl leading-[1.05] font-semibold md:text-6xl"
        >
          Hey there! Neil here!
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
          className="mt-5 max-w-md text-lg text-muted-foreground"
        >
          I am a full-stack web developer, an automation specialist, and a coffee lover.
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
          className="mt-9 flex flex-wrap gap-3"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            See my work <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-sand"
          >
            Start a project
          </Link>
        </motion.div>

        {/* <motion.p
          variants={fadeUp}
          initial={shouldAnimate ? "hidden" : false}
          animate="visible"
          transition={{
            duration: shouldAnimate ? 0.7 : 0,
            delay: shouldAnimate ? 0.6 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 inline-flex items-center rounded-full border border-border bg-sand px-3 py-1 text-xs tracking-wide text-secondary-foreground uppercase"
        >
          Available for freelance work
        </motion.p> */}
      </div>

      <div className="relative">
        <div className="absolute inset-6 -z-10 rounded-full bg-sand blur-3xl" />
        <Image
          src={heroImg}
          alt="Illustration of Neil coding on a laptop with a cup of coffee"
          width={1024}
          height={1024}
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full"
        />
      </div>
    </section>
  );
}
