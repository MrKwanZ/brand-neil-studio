import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";

const title = "Contact Neil";
const description = "Get in touch with Neil about building or improving your web application.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
