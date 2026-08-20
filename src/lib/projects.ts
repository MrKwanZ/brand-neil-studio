import type { StaticImageData } from "next/image";
import companyImg from "@/assets/project-company.jpg";
import ecommerceImg from "@/assets/project-ecommerce.jpg";

export type TechKey =
  | "python"
  | "fastapi"
  | "langchain"
  | "langgraph"
  | "openai"
  | "typescript"
  | "react"
  | "nextjs"
  | "node"
  | "express"
  | "nestjs"
  | "mongodb"
  | "postgres"
  | "docker"
  | "graphql"
  | "paypal";

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
  githubUrl: string;
  galleryFolder?: string;
};

export const projects: Project[] = [
  {
    slug: "ncshop",
    title: "NCShop",
    category: "E-commerce",
    year: "2020",
    summary: "A full-featured e-commerce platform for selling products.",
    description:
      "A e-commerce platform for displaying and selling products online . I built the catalogue, cart and checkout from scratch, wired PayPal for one-off orders, and added an admin panel for stock, orders and shipping labels.",
    image: ecommerceImg,
    highlights: [
      "Custom cart and PayPal checkout support",
      "Real-time inventory sync between storefront and admin",
      "Order dashboard with fulfilment and refund flows",
    ],
    tech: ["react", "express", "node", "mongodb", "paypal"],
    githubUrl: "https://github.com/MrKwanZ/ncshop",
    galleryFolder: "ncshop",
  },
  {
    slug: "bestock-analyzer",
    title: "Bestock Analyzer",
    category: "Finance and Investment",
    year: "2026",
    summary: "A stock market analyzer for identifying top-performing NASDAQ stocks.",
    description:
      "A stock market analyzer that finds the best performance of NASDAQ stock of the day. By analyzing market data, performing sentiment analysis, drafting performance charts, it helps you to decide whether you should buy or sell the stock.",
    image: companyImg,
    highlights: [
      "Simple and intuitive user interface for easy navigation",
      "Email reporting for detailed stock analysis",
      "Basic and advanced stock analysis at your choice",
    ],
    tech: ["python", "fastapi", "langchain", "langgraph", "openai"],
    githubUrl: "https://github.com/MrKwanZ/bestock-analyzer",
    galleryFolder: "bestock",
  },
  // {
  //   slug: "socialogy",
  //   title: "Socialogy",
  //   category: "Social Media",
  //   year: "2025",
  //   summary: "A social media platform for sharing and discovering content.",
  //   description:
  //     "Cadence turns messy product events into dashboards a founder can read in a minute. I led the front-end architecture and a large part of the API: multi-tenant data isolation, role-based permissions, usage-based billing and streaming chart updates over websockets, all running on a horizontally scalable backend.",
  //   image: saasImg,
  //   highlights: [
  //     "Multi-tenant data isolation with row-level security",
  //     "Usage-based billing and self-serve plan upgrades",
  //     "Live dashboards streaming thousands of events per minute",
  //   ],
  //   tech: ["typescript", "react", "nestjs", "postgres", "graphql", "docker"],
  //   githubUrl: "https://github.com/MrKwanZ/socialogy",
  // },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
