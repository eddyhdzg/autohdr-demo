import { BRAND, SOCIALS } from "@workspace/consts";

export const siteConfig = {
    name: BRAND.name,
    url: BRAND.url,
    description: BRAND.description,
    links: {
        instagram: SOCIALS.instagram,
        tiktok: SOCIALS.tiktok,
    },
};

export type SiteConfig = typeof siteConfig;
