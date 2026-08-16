import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiStripe,
  SiDocker,
  SiGraphql,
} from "react-icons/si";
import type { TechKey } from "@/lib/projects";

const registry: Record<TechKey, { label: string; Icon: React.ElementType }> = {
  typescript: { label: "TypeScript", Icon: SiTypescript },
  react: { label: "React", Icon: SiReact },
  nextjs: { label: "Next.js", Icon: SiNextdotjs },
  node: { label: "Node.js", Icon: SiNodedotjs },
  mongodb: { label: "MongoDB", Icon: SiMongodb },
  postgres: { label: "PostgreSQL", Icon: SiPostgresql },
  tailwind: { label: "Tailwind CSS", Icon: SiTailwindcss },
  stripe: { label: "Stripe", Icon: SiStripe },
  docker: { label: "Docker", Icon: SiDocker },
  graphql: { label: "GraphQL", Icon: SiGraphql },
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
