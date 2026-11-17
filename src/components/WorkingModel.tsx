import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/PageSection";
import { Reveal } from "@/components/Reveal";
import { contactSection, sectionHref } from "@/lib/sections";

const steps = [
  {
    title: "Diagnose",
    body: "Diagnose your constraints, and align on the outcome your business needs to achieve.",
  },
  {
    title: "Develop",
    body: "Build and construct the solution under your agreed scope.",
  },
  {
    title: "Deliver",
    body: "Complete your requested solution as your agreed timeline.",
  },
];

export function WorkingModel() {
  return (
    <PageSection id="process" labelledBy="process-heading" tone="lifted">
      <Reveal>
        <h2
          id="process-heading"
          className="mt-4 max-w-170 text-4xl leading-10 font-medium text-balance md:text-5xl md:leading-none"
        >
          My 3D Working Model
        </h2>
      </Reveal>
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 80}>
            <article className="h-full rounded-[40px] bg-background p-8">
              <p className="eyebrow">Step {index + 1}</p>
              <h3 className="mt-4 text-2xl leading-8 font-medium">{step.title}</h3>
              <p className="mt-3 text-sm leading-5 text-pretty text-muted-foreground">
                {step.body}
              </p>
            </article>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={240}>
        <Link href={sectionHref(contactSection.id)} className="btn-primary mt-8">
          Start a project <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </PageSection>
  );
}
