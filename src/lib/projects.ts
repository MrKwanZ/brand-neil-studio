import type { StaticImageData } from "next/image";
import companyImg from "@/assets/project-company.jpg";
import ecommerceImg from "@/assets/project-ecommerce.jpg";
import saasImg from "@/assets/project-saas.jpg";

export type TechKey =
  | "typescript"
  | "react"
  | "nextjs"
  | "node"
  | "mongodb"
  | "postgres"
  | "tailwind"
  | "stripe"
  | "docker"
  | "graphql";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  image: StaticImageData;
  highlights: string[];
  tech: TechKey[];
};

export const projects: Project[] = [
  {
    slug: "northwood-studio",
    title: "Northwood Studio",
    category: "Company website",
    year: "2024",
    summary:
      "A warm, editorial marketing site for an architecture consultancy, built for speed and search.",
    description:
      "Northwood Studio needed a website that felt like their craft: calm, tactile and unmistakably human. I designed and built a fully static-rendered marketing site with a lightweight CMS so the team can publish case studies without a developer. Core Web Vitals land in the green across every page.",
    image: companyImg,
    highlights: [
      "Server-rendered pages with a 98 Lighthouse performance score",
      "Editor-friendly content model for case studies and team profiles",
      "Accessible, keyboard-complete navigation and forms",
    ],
    tech: ["typescript", "react", "nextjs", "tailwind"],
  },
  {
    slug: "kiln-and-clay",
    title: "Kiln & Clay",
    category: "E-commerce",
    year: "2025",
    summary:
      "A handmade homeware store with a custom checkout, inventory sync and subscription boxes.",
    description:
      "A full storefront for a ceramics maker moving off a rented platform. I built the catalogue, cart and checkout from scratch, wired Stripe for one-off and subscription orders, and added an admin panel for stock, orders and shipping labels. Order processing time dropped by roughly 60%.",
    image: ecommerceImg,
    highlights: [
      "Custom cart and Stripe checkout with subscription support",
      "Real-time inventory sync between storefront and admin",
      "Order dashboard with fulfilment and refund flows",
    ],
    tech: ["typescript", "react", "node", "mongodb", "stripe"],
  },
  {
    slug: "cadence-analytics",
    title: "Cadence Analytics",
    category: "SaaS platform",
    year: "2026",
    summary:
      "A multi-tenant analytics platform with role-based access, billing and live dashboards.",
    description:
      "Cadence turns messy product events into dashboards a founder can read in a minute. I led the front-end architecture and a large part of the API: multi-tenant data isolation, role-based permissions, usage-based billing and streaming chart updates over websockets, all running on a horizontally scalable backend.",
    image: saasImg,
    highlights: [
      "Multi-tenant data isolation with row-level security",
      "Usage-based billing and self-serve plan upgrades",
      "Live dashboards streaming thousands of events per minute",
    ],
    tech: ["typescript", "react", "node", "postgres", "graphql", "docker"],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
