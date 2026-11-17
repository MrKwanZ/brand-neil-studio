"use client";

import { ContactForm } from "@/components/ContactForm";
import { PageSection } from "@/components/PageSection";
import { Reveal } from "@/components/Reveal";

export function ContactContent() {
  return (
    <PageSection id="contact" labelledBy="contact-heading" tone="sand">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2
            id="contact-heading"
            className="mt-4 max-w-170 text-4xl leading-10 font-medium text-balance md:text-5xl md:leading-none"
          >
            Start a conversation
          </h2>
          <div className="mt-4 max-w-170 space-y-4 text-pretty text-muted-foreground">
            <p>
              Share your name, the kind of work, and the current challenge you are facing.
            </p>
            <p>
              I read every note and reply.
            </p>
          </div>
        </Reveal>
        <ContactForm />
      </div>
    </PageSection>
  );
}
