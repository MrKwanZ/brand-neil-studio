import { ImageResponse } from "next/og";
import { evidenceLabel, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Project";
  const summary = project?.summary ?? "Public work by Neil.";
  const category = project ? `${evidenceLabel(project.kind)} · ${project.year}` : "Public work";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F3F0EE",
        color: "#141413",
        padding: "72px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
          Neil
        </span>
        <span style={{ color: "#555555" }}>{category}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 26, color: "#555555", maxWidth: 860, lineHeight: 1.4 }}>
          {summary}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
