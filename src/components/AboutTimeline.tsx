"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const timeline = [
  {
    period: "2013 - 2015",
    title: "Higher Diploma in Computer Systems Administration",
    org: "Hong Kong Institute of Vocational Education",
    body: "Graduated with a collaborative project on a web application development about wedding planning with a stubborn love for clean interfaces.",
  },
  {
    period: "2015 — 2017",
    title: "Technical Associate",
    org: "PCCW Solutions Limited",
    body: "Built a high-traffic online examination registration system and a banking application for government and private sectors. Learned to ship, test and take feedback without ego.",
  },
  {
    period: "2017 — 2018",
    title: "Programmer",
    org: "Information Services Department, HKSARG",
    body: "Maintained and developed government websites for various government departments. Optimized page accessibility and sustained a 99+ website uptime.",
  },
  {
    period: "2019 — 2020",
    title: "Analyst Programmer",
    org: "MGF Sourcing Far East, Limited",
    body: "Built and maintain a web application and an ERP system for a global sourcing company. Streamlined business processes and improved system efficiency.",
  },
  {
    period: "2020 — 2026",
    title: "System Analyst",
    org: "A.S. Watson Group",
    body: "Delivered RPA solutions for multiple business units, supported Kong API Gateway and Confluent Kafka platforms for microservices architecture, and championed the adoption of GitHub Copilot. Improved manual document processing, ensured platform stability, and fostered a culture of AI-driven efficiency.",
  },
];

export function AboutTimeline() {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = reduceMotion === false;

  const scrollToTimeline = () => {
    const timelineSection = document.getElementById("timeline");
    timelineSection?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <motion.h1
          initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldAnimate ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-center text-3xl leading-tight font-semibold md:text-5xl"
        >
          Greetings! I'm Neil.
        </motion.h1>
        <motion.p
          initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldAnimate ? 0.7 : 0,
            delay: shouldAnimate ? 0.15 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 max-w-xl text-center text-muted-foreground"
        >
          I have spent the last decade turning rough ideas into web applications and automation
          solutions that people actually use — from government websites, corporate web systems,
          to automation solutions for business operations. I care about clarity, performance and
          code that is easy to maintain.
        </motion.p>

        <motion.button
          type="button"
          initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldAnimate ? 0.6 : 0,
            delay: shouldAnimate ? 0.4 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={scrollToTimeline}
          aria-label="Scroll to timeline"
          className="mt-10 inline-flex cursor-pointer flex-col items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="tracking-widest uppercase">
            SCROLL DOWN TO SEE MY ROAD OF DEVELOPMENT
          </span>
          <ChevronDown className="h-7 w-7 animate-bounce text-clay motion-reduce:animate-none" />
        </motion.button>
      </section>

      <section id="timeline" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20">
        <ScrollFadeIn>
          <h2 className="mb-12 text-2xl font-semibold">My Road of Development</h2>
        </ScrollFadeIn>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2" />
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ScrollFadeIn({ children }: { children: ReactNode }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion === false ? { opacity: 0, y: 24 } : false}
      animate={visible || reduceMotion !== false ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: reduceMotion === false ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TimelineItem({ item, index }: { item: (typeof timeline)[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const reduceMotion = useReducedMotion();
  const left = index % 2 === 0;

  return (
    <div
      ref={ref}
      data-visible={visible || reduceMotion !== false ? "true" : "false"}
      className="reveal relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
    >
      <span className="absolute top-2 left-2.5 h-3 w-3 rounded-full border-2 border-background bg-accent md:left-1/2 md:-translate-x-1/2" />
      <div className={left ? "md:col-start-1 md:text-right" : "md:col-start-2 md:row-start-1"}>
        <p className="text-xs tracking-widest text-accent-foreground/70 uppercase">{item.period}</p>
        <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-clay">{item.org}</p>
        <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
      </div>
    </div>
  );
}
