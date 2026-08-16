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
        backgroundColor: "#f7f1e8",
        color: "#3d2b1f",
        padding: "72px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#b0724a",
        }}
      >
        Neil
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700 }}>Full-stack developer</div>
        <div style={{ fontSize: 28, color: "#6b5848", maxWidth: 820, lineHeight: 1.4 }}>
          Fast, considered web applications for companies, shops and SaaS teams.
        </div>
      </div>
    </div>,
    { ...size },
  );
}
