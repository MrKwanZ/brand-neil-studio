import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/neil-hero.png";
import { contactSection, sectionHref } from "@/lib/sections";

export function HomeHero() {
  return (
    <section className="mx-auto grid w-full max-w-300 items-center gap-12 px-6 pt-8 pb-16 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
      <div className="flex max-w-170 flex-col items-start">
        <h1 className="rise-in mt-6 text-4xl leading-10 font-medium tracking-[-0.02em] text-balance md:text-5xl md:leading-none lg:text-6xl">
          Technical Consultant
          <br />
          for your business
        </h1>
        <p
          className="rise-in mt-6 max-w-170 text-base leading-6 font-[450] text-pretty text-muted-foreground"
          style={{ animationDelay: "150ms" }}
        >
          I diagnose problems, build full stack products, and refactor the code that is getting in
          the way.
        </p>
        <div
          className="rise-in mt-8 flex flex-wrap items-center gap-6"
          style={{ animationDelay: "300ms" }}
        >
          <Link href={sectionHref(contactSection.id)} className="btn-primary">
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={sectionHref("work")} className="btn-text">
            View selected works
          </Link>
        </div>
        <p
          className="rise-in mt-8 text-sm font-medium text-clay"
          style={{ animationDelay: "450ms" }}
        >
          Based in Hong Kong. Shipping production work since 2015.
        </p>
      </div>

      <div className="rise-in relative" style={{ animationDelay: "200ms" }}>
        <div className="shadow-lift relative overflow-hidden rounded-[40px] bg-transparent">
          <Image
            src={heroImage}
            alt="Illustrated portrait of Neil working at a laptop"
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="aspect-4/3 w-full object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
}
