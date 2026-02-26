export const BRAND = {
  name: "AutoHDR",
  url: "https://autohdr.vercel.app",
  email: "delivery@autohdr.com",
  description: "AI-powered HDR image processing.",
} as const;

export const SOCIALS = {
  instagram: "https://www.instagram.com/auto.hdr/",
  tiktok: "https://www.tiktok.com/@auto.hdr",
  linkedin: "https://www.linkedin.com/company/autohdr/",
} as const;

export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "/docs";
