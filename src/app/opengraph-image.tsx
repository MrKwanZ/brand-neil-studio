import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Neil
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em" }}>
          Technical consultancy for products and codebases
        </div>
        <div style={{ fontSize: 28, color: "#555555", maxWidth: 860, lineHeight: 1.4 }}>
          Diagnosis, full stack delivery, and codebase refactoring.
        </div>
      </div>
    </div>,
    { ...size },
  );
}
