import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiPaypal,
  SiDocker,
  SiGraphql,
  SiPython,
  SiFastapi,
  SiLangchain,
  SiLanggraph
} from "react-icons/si";
import { BsOpenai } from "react-icons/bs";
import type { TechKey } from "@/lib/projects";

const registry: Record<TechKey, { label: string; Icon: React.ElementType }> = {
  typescript: { label: "TypeScript", Icon: SiTypescript },
  react: { label: "React", Icon: SiReact },
  nextjs: { label: "Next.js", Icon: SiNextdotjs },
  node: { label: "Node.js", Icon: SiNodedotjs },
  nestjs: { label: "NestJS", Icon: SiNestjs },
  express: { label: "Express", Icon: SiExpress },
  mongodb: { label: "MongoDB", Icon: SiMongodb },
  postgres: { label: "PostgreSQL", Icon: SiPostgresql },
  paypal: { label: "PayPal", Icon: SiPaypal },
  docker: { label: "Docker", Icon: SiDocker },
  graphql: { label: "GraphQL", Icon: SiGraphql },
  python: { label: "Python", Icon: SiPython },
  fastapi: { label: "FastAPI", Icon: SiFastapi },
  langchain: { label: "LangChain", Icon: SiLangchain },
  langgraph: { label: "LangGraph", Icon: SiLanggraph },
  openai: { label: "OpenAI", Icon: BsOpenai },
};

export function TechIcon({ tech }: { tech: TechKey }) {
  const { label, Icon } = registry[tech];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card text-primary transition-colors hover:bg-sand">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function techLabel(tech: TechKey) {
  return registry[tech].label;
}
