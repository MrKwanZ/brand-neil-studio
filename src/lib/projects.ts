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

export type ProjectKind = "personal-product" | "client-engagement";

export type ProjectAvailability = "live" | "open-source" | "coming-soon";

export const availabilityCopy: Record<
  ProjectAvailability,
  { label: string; tone: "live" | "soon" }
> = {
  live: { label: "Live", tone: "live" },
  "open-source": { label: "Open source", tone: "live" },
  "coming-soon": { label: "Coming soon", tone: "soon" },
};

export type ProjectNarrative = {
  problem: string;
  constraints: string;
  decisions: string;
  implementation: string;
  outcome: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  kind: ProjectKind;
  summary: string;
  description: string;
  image: StaticImageData;
  highlights: string[];
  narrative: ProjectNarrative;
  tech: TechKey[];
  githubUrl: string;
  galleryFolder?: string;
  availability: ProjectAvailability;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "ncshop",
    title: "NCShop",
    category: "E-commerce",
    year: "2020",
    kind: "personal-product",
    summary: "A full-featured e-commerce platform for selling products.",
    description:
      "A personal product for displaying and selling products online. The catalogue, cart, checkout, and admin were built from scratch.",
    image: ecommerceImg,
    highlights: [
      "Custom cart and PayPal checkout for one off orders",
      "Inventory stays in sync between the storefront and the admin",
      "Order dashboard with fulfilment and refund flows",
    ],
    narrative: {
      problem:
        "We need a storefront that could show products, take an order, and hand that order to an admin for fulfillment.",
      constraints:
        "The catalogue, cart, and checkout need to be built from scratch, including a 3rd party payment gateway for one off orders and secure channel for transactions.",
      decisions:
        "We designed and built an eCommerce platform with product catalog, search/pagination, shopping cart, and a multi-step checkout flow (sign-in → shipping → payment → place order).",
      implementation:
        "With the use of MERN stack (MongoDB, Express, React, Node) and PayPal API, we implemented product catalog, search/pagination, shopping cart, and a multi-step checkout flow (sign-in → shipping → payment → place order), as well as an admin dashboard for managing products, users, and orders.",
      outcome:
        "Shipped a complete eCommerce platform with a fully functional online store with checkout.",
    },
    tech: ["react", "express", "node", "mongodb", "paypal"],
    githubUrl: "https://github.com/MrKwanZ/ncshop",
    galleryFolder: "ncshop",
    availability: "live",
    liveUrl: "https://ncshop.onrender.com/",
  },
  {
    slug: "bestock-analyzer",
    title: "Bestock Analyzer",
    category: "Finance and investment",
    year: "2026",
    kind: "personal-product",
    summary: "A stock market analyzer for identifying top-performing NASDAQ stocks.",
    description:
      "A stock market analyzer that finds the best performance of NASDAQ stock of the day. By analyzing market data, performing sentiment analysis, drafting performance charts, it helps you to decide whether you should buy or sell the stock.",
    image: companyImg,
    highlights: [
      "Simple and intuitive user interface for easy navigation",
      "Email reporting for detailed stock analysis",
      "Basic and advanced stock analysis at your choice",
    ],
    narrative: {
      problem:
        "We need a stock analyzer that could find the best performance of NASDAQ stock of the day and help us decide whether to buy or sell the stock.",
      constraints:
        "It has to turn market data, sentiment, and charts into a choice between a basic and an advanced analysis, all from reliable sources.",
      decisions:
        "After considerations based on the reliability, accuracy, and low-latency, we chose Finnhub, YFinance, SerpAPI as our 3rd party API tools to fetch the data.",
      implementation:
        "With the use of Python, FastAPI, LangChain, LangGraph, and OpenAI, we implemented a multi-step AI agent to orchestrate market data fetching, news retrieval, LLM-based sentiment analysis, chart generation, and report delivery for the day's top performing NASDAQ stocks.",
      outcome:
        "Shipped a stock analyzer that could find the best performance of NASDAQ stock of the day with a simple and intuitive user interface for easy navigation.",
    },
    tech: ["python", "fastapi", "langchain", "langgraph", "openai"],
    githubUrl: "https://github.com/MrKwanZ/bestock-analyzer",
    galleryFolder: "bestock",
    availability: "open-source",
  },
];

export function evidenceLabel(kind: ProjectKind) {
  return kind === "client-engagement" ? "Client engagement" : "Personal product";
}

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export function getProjectNeighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
