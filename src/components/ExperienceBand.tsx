import Image from "next/image";
import Link from "next/link";
import { PageSection } from "@/components/PageSection";
import { Reveal } from "@/components/Reveal";

const roles = [
  { period: "2015 to 2017", title: "Technical Associate", org: "PCCW Solutions Limited" },
  { period: "2017 to 2018", title: "Programmer", org: "Information Services Department, HKSARG" },
  { period: "2019 to 2020", title: "Analyst Programmer", org: "MGF Sourcing Far East, Limited" },
  { period: "2020 to 2026", title: "Technical Specialist", org: "A.S. Watson Group" },
];

export function ExperienceBand() {
  return (
    <PageSection id="experience" labelledBy="experience-heading">
      <span id="about" className="block scroll-mt-32" />
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h2
            id="experience-heading"
            className="mt-4 max-w-170 text-4xl leading-10 font-medium text-balance md:text-5xl md:leading-none"
          >
            Building scalable applications since 2015
          </h2>
          <p className="mt-4 max-w-170 text-pretty text-muted-foreground">
            I'm Neil Cheng. Over the decade, I built applications for various corporates, mainly
            enterprise systems. <br />
            Scalable architecture, clean code, favorable user experience. These are a few of my
            favorite things.
          </p>
          <Link
            href="https://github.com/MrKwanZ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            <Image
              src="/github.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden
              className="size-4 brightness-0 invert"
            />
            View My GitHub
          </Link>
        </Reveal>
        <ol className="grid gap-4 sm:grid-cols-2">
          {roles.map((role, index) => (
            <Reveal as="li" key={role.title} delay={index * 60}>
              <article className="h-full rounded-[40px] bg-card p-6">
                <p className="text-xs font-bold tracking-[0.04em] text-clay uppercase">
                  {role.period}
                </p>
                <h3 className="mt-3 text-xl leading-7 font-medium text-balance">{role.title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">{role.org}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </PageSection>
  );
}
