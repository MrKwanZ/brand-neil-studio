const FALLBACK_SITE_URL = "http://localhost:3000";

function trimTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  if (process.env["SITE_URL"]) {
    return trimTrailingSlash(process.env["SITE_URL"]);
  }

  // Preview and production fallback when SITE_URL is not set in Vercel.
  if (process.env["VERCEL_URL"]) {
    return `https://${trimTrailingSlash(process.env["VERCEL_URL"])}`;
  }

  return FALLBACK_SITE_URL;
}

export const site = {
  name: "Neil",
  author: "Neil",
  title: "Brand Neil Studio",
  titleTemplate: "%s — Neil Studio",
  description:
    "Neil builds various applications — corporate websites, e-commerce stores and agentic AIs.",
};
