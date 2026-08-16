import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/projects";

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
  const summary = project?.summary ?? "Selected work by Neil.";
  const category = project ? `${project.category} · ${project.year}` : "Portfolio";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f7f1e8",
        color: "#3d2b1f",
        padding: "72px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span style={{ letterSpacing: "0.28em", textTransform: "uppercase", color: "#b0724a" }}>
          Neil
        </span>
        <span style={{ color: "#6b5848" }}>{category}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 26, color: "#6b5848", maxWidth: 860, lineHeight: 1.4 }}>
          {summary}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
