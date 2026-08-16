import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

const title = "Contact Neil — web application development";
const description = "Get in touch with Neil about building or improving your web application.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-4xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr]">
      <div>
        <h1 className="text-3xl font-semibold md:text-4xl">Let&apos;s talk</h1>
        <p className="mt-4 text-muted-foreground">
          Whether you need a new web application, a rescue mission on an old one, or an extra pair
          of hands on your team — send a note and I&apos;ll reply personally.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
