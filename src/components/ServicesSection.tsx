import Image, { type StaticImageData } from "next/image";
import consultancyImage from "@/assets/consultancy.jpg";
import developmentImage from "@/assets/development.jpg";
import refactorImage from "@/assets/refactor.jpg";
import { PageSection } from "@/components/PageSection";
import { Reveal } from "@/components/Reveal";
import { ServiceOrbit } from "@/components/ServiceOrbit";
import { TaglineReveal } from "@/components/TaglineReveal";
import { WorkingModel } from "@/components/WorkingModel";

const services: {
  key: string;
  eyebrow: string;
  title: string;
  intervention: string;
  image: StaticImageData;
  imageAlt: string;
}[] = [
  {
    key: "discovery",
    eyebrow: "Discovery",
    title: "Technical Consultation",
    intervention:
      "Need an advice on digital transformation? I can help you sort out your problems and provide a solution.",
    image: consultancyImage,
    imageAlt: "People reviewing a product sketch across laptops and paper",
  },
  {
    key: "build",
    eyebrow: "Build",
    title: "Website or Application Development",
    intervention:
      "Need a website or an application? I can help you design the path and build the agreed scope across interface and service.",
    image: developmentImage,
    imageAlt: "Application code open in an editor",
  },
  {
    key: "refactor",
    eyebrow: "Refactor",
    title: "Codebase Audit and Refactoring",
    intervention:
      "Need a diagnosis of your codebase? I can help you audit the risky parts and refactor them without widening the job.",
    image: refactorImage,
    imageAlt: "A hand holding a lens that brings one patch of blurred lights into focus",
  },
];

export function ServicesSection() {
  return (
    <>
      <PageSection id="services" labelledBy="services-heading">
        <Reveal>
          <h2
            id="services-heading"
            className="mt-4 max-w-170 text-4xl leading-10 font-medium text-balance md:text-5xl md:leading-none"
          >
            Services
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <ServiceOrbit />
          <ul className="relative grid gap-16 lg:grid-cols-3 lg:items-start">
            {services.map((item, index) => {
              return (
                <li
                  key={item.key}
                  className={index === 1 ? "lg:mt-24" : index === 2 ? "lg:mt-8" : ""}
                >
                  <Reveal delay={index * 80} className="flex flex-col items-start">
                    <div className="relative">
                      <div
                        data-service-portrait
                        className="relative size-56 overflow-hidden rounded-full bg-sand md:size-64"
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="256px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                    <p className="eyebrow mt-8">{item.eyebrow}</p>
                    <h3 className="mt-3 max-w-xs text-2xl leading-8 font-medium text-balance">
                      {item.title}
                    </h3>
                    <dl className="mt-4 max-w-xs space-y-3 text-sm leading-5 text-muted-foreground">
                      <dd className="text-pretty">{item.intervention}</dd>
                    </dl>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </PageSection>
      <TaglineReveal />
      <WorkingModel />
    </>
  );
}
