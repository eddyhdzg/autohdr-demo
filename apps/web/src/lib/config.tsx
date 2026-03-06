import { BRAND, DOCS_URL, SOCIALS } from "@workspace/consts";
import {
    BookOpen,
    CircleHelp,
    Clapperboard,
    Handshake,
    Headset,
    House,
    Info,
    Newspaper,
    Palette,
    Phone,
    Scale,
    ScrollText,
    ShieldCheck,
    Sparkles,
    Tag,
    Users,
} from "lucide-react";
import { Icons } from "@/components/icons";
import Image from "next/image";

interface FooterLink {
    id: number;
    translationKey: string;
    url: string;
    disabled?: boolean;
    external?: boolean;
    icon?: React.ReactNode;
}

interface FooterSection {
    titleKey: string;
    links: FooterLink[];
}

// Scatter small dots around a city center using golden angle spiral.
// More dots = higher density = visually heavier cluster (like users/presence).
function scatter(
    lat: number,
    lng: number,
    count: number,
    spread = 0.5,
): { lat: number; lng: number; size: number }[] {
    const dotSize = 0.3;
    if (count <= 1) return [{ lat, lng, size: dotSize }];
    const cosLat = Math.cos((lat * Math.PI) / 180);
    return Array.from({ length: count }, (_, i) => {
        if (i === 0) return { lat, lng, size: dotSize };
        const angle = i * 2.39996323; // golden angle (radians)
        const r = spread * Math.sqrt(i / count);
        return {
            lat: lat + r * Math.sin(angle),
            lng: lng + (r * Math.cos(angle)) / cosLat,
            size: dotSize,
        };
    });
}

const usMapMarkers = [
    // ── HQ ───────────────────────────────────────────
    ...scatter(30.2672, -97.7431, 16, 0.65),  // Austin (HQ — pin overlay rendered separately)

    // ── Major metros (dense clusters) ──────────────
    ...scatter(40.7128, -74.006, 24, 0.8),     // New York
    ...scatter(34.0522, -118.2437, 20, 0.75),  // Los Angeles
    ...scatter(41.8781, -87.6298, 18, 0.7),    // Chicago
    ...scatter(29.7604, -95.3698, 16, 0.65),   // Houston
    ...scatter(37.7749, -122.4194, 16, 0.65),  // San Francisco

    // ── Strong markets (medium clusters) ───────────
    ...scatter(32.7767, -96.797, 14, 0.6),     // Dallas
    ...scatter(25.7617, -80.1918, 14, 0.6),    // Miami
    ...scatter(38.9072, -77.0369, 12, 0.55),   // Washington DC
    ...scatter(42.3601, -71.0589, 12, 0.55),   // Boston
    ...scatter(33.749, -84.388, 12, 0.55),     // Atlanta
    ...scatter(47.6062, -122.3321, 10, 0.5),   // Seattle
    ...scatter(33.4484, -112.074, 10, 0.5),    // Phoenix

    // ── Secondary cities (small clusters) ──────────
    ...scatter(39.7392, -104.9903, 8, 0.45),   // Denver
    ...scatter(36.1699, -115.1398, 8, 0.45),   // Las Vegas
    ...scatter(36.1627, -86.7816, 7, 0.4),     // Nashville
    ...scatter(44.9778, -93.265, 7, 0.4),      // Minneapolis
    ...scatter(45.5152, -122.6784, 7, 0.4),    // Portland
    ...scatter(32.7157, -117.1611, 7, 0.4),    // San Diego
    ...scatter(35.2271, -80.8431, 7, 0.4),     // Charlotte
    ...scatter(29.4241, -98.4936, 7, 0.4),     // San Antonio

    // ── Tertiary cities (light presence) ───────────
    ...scatter(39.9612, -82.9988, 5, 0.35),    // Columbus
    ...scatter(39.7684, -86.1581, 5, 0.35),    // Indianapolis
    ...scatter(27.9506, -82.4572, 5, 0.35),    // Tampa
    ...scatter(28.5383, -81.3792, 5, 0.35),    // Orlando
    ...scatter(40.7608, -111.891, 4, 0.3),     // Salt Lake City
    ...scatter(30.3322, -81.6557, 4, 0.3),     // Jacksonville
];

export const siteConfig = {
    name: BRAND.name,
    description: BRAND.description,
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    keywords: [
        "HDR Image Processing",
        "AI HDR",
        "Automatic HDR",
        "HDR Photo Enhancement",
    ],
    links: {
        email: BRAND.email,
        linkedin: SOCIALS.linkedin,
        instagram: SOCIALS.instagram,
        tiktok: SOCIALS.tiktok,
    },
    nav: {
        links: [
            { id: 1, translationKey: "studio", href: "/studio", disabled: true },
            { id: 2, translationKey: "pricing", href: "/pricing" },
            { id: 3, translationKey: "docs", href: DOCS_URL, external: true },
            { id: 4, translationKey: "faqs", href: "/faqs" },
        ],
    },
    hero: {
        cta: {
            primary: { href: "#" },
            secondary: { href: "#" },
        },
    },
    companyShowcase: {
        companyLogos: [
            { id: 1, name: "Spiro", logo: <Image src="/integrations/spiro.svg" alt="Spiro" width={112} height={40} className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 2, name: "HD PhotoHub", logo: <Image src="/integrations/hdphotohub.svg" alt="HD PhotoHub" width={112} height={40} className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 3, name: "Tonomo", logo: <Image src="/integrations/tonomo.svg" alt="Tonomo" width={112} height={40} className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 4, name: "Aryeo", logo: <Image src="/integrations/aryeo.svg" alt="Aryeo" width={112} height={40} className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 5, name: "Dropbox", logo: <Image src="/integrations/dropbox.svg" alt="Dropbox" width={112} height={40} className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
        ],
    },
    testimonialSection: {
        testimonials: [
            { id: "1", name: "Eli Jones", img: "/testimonials/eli-jones.jpg", videoUrl: "https://www.youtube.com/watch?v=t-DOK1fOT0o" },
            { id: "2", name: "Todd Kivimaki", img: "/testimonials/todd-kivimaki.jpeg", videoUrl: "https://www.youtube.com/watch?v=AgCK9SDhtr0&t=1290s" },
            { id: "3", name: "Brendan Hsu", img: "/testimonials/brendan-hsu.png", videoUrl: "https://www.youtube.com/watch?v=BEFF7ABzi3A" },
            { id: "4", name: "Alex Coombs", img: "/testimonials/alex-coombs.png", videoUrl: "https://www.youtube.com/watch?v=yrDtgKdSPoo&t" },
            { id: "5", name: "Ken Dono", img: "/testimonials/ken-dono.jpg", videoUrl: "https://www.youtube.com/watch?v=2_xdkitECLo" },
        ],
    },
    pricing: {
        pricingItems: [
            { href: "#", buttonColor: "bg-accent text-primary", isPopular: false, planKey: "free" as const },
            { href: "#", buttonColor: "bg-secondary text-white", isPopular: true, planKey: "pro" as const },
            { href: "#", buttonColor: "bg-primary text-primary-foreground", isPopular: false, planKey: "enterprise" as const },
        ],
    },
    ctaSection: {
        id: "contact",
        backgroundImage: "/agent-cta-background.png",
        cta: {
            primary: { href: "#" },
            secondary: { href: "#" },
        },
    },
    footerLinks: [
        {
            titleKey: "pages",
            links: [
                { id: 1, translationKey: "home", url: "/", icon: <House className="size-4" /> },
                { id: 2, translationKey: "studio", url: "/studio", disabled: true, icon: <Clapperboard className="size-4" /> },
                { id: 3, translationKey: "pricing", url: "/pricing", icon: <Tag className="size-4" /> },
                { id: 4, translationKey: "docs", url: DOCS_URL, external: true, icon: <BookOpen className="size-4" /> },
                { id: 5, translationKey: "faqs", url: "/faqs", icon: <CircleHelp className="size-4" /> },
            ],
        },
        {
            titleKey: "resources",
            links: [
                { id: 6, translationKey: "support", url: "/support", disabled: true, icon: <Headset className="size-4" /> },
                { id: 7, translationKey: "changelog", url: "/changelog", disabled: true, icon: <ScrollText className="size-4" /> },
            ],
        },
        {
            titleKey: "company",
            links: [
                { id: 9, translationKey: "blog", url: "/blog", disabled: true, icon: <Newspaper className="size-4" /> },
                { id: 10, translationKey: "aboutUs", url: "/about", disabled: true, icon: <Info className="size-4" /> },
                { id: 11, translationKey: "ourTeam", url: "/team", disabled: true, icon: <Users className="size-4" /> },
                { id: 12, translationKey: "brand", url: "/brand", icon: <Palette className="size-4" /> },
                { id: 13, translationKey: "terms", url: "/terms", disabled: true, icon: <Scale className="size-4" /> },
                { id: 14, translationKey: "privacy", url: "/privacy", disabled: true, icon: <ShieldCheck className="size-4" /> },
                { id: 15, translationKey: "requestFeature", url: "#", disabled: true, icon: <Sparkles className="size-4" /> },
                { id: 16, translationKey: "contactSales", url: "#", disabled: true, icon: <Phone className="size-4" /> },
                { id: 17, translationKey: "partnerships", url: "#", disabled: true, icon: <Handshake className="size-4" /> },
            ],
        },
        {
            titleKey: "social",
            links: [
                { id: 18, translationKey: "instagram", url: SOCIALS.instagram, external: true, icon: <Icons.instagram className="size-4" /> },
                { id: 19, translationKey: "tiktok", url: SOCIALS.tiktok, external: true, icon: <Icons.tiktok className="size-4" /> },
                { id: 20, translationKey: "linkedin", url: SOCIALS.linkedin, external: true, icon: <Icons.linkedin className="size-4" /> },
            ],
        },
    ] as FooterSection[],
    usMapSection: {
        region: {
            lat: { min: 21, max: 53 },
            lng: { min: -128, max: -64 },
        },
        countries: ["USA"],
        backgroundCountries: ["CAN", "MEX"],
        markers: usMapMarkers,
    },
    integrationsSection: {
        link: {
            href: `${DOCS_URL}/integrations/overview`,
        },
        integrations: [
            { id: 1, name: "Spiro", logo: "/integrations/spiro.svg", href: `${DOCS_URL}/integrations/spiro`, translationKey: "spiro" },
            { id: 2, name: "HD PhotoHub", logo: "/integrations/hdphotohub.svg", href: `${DOCS_URL}/integrations/hd-photohub`, translationKey: "hdphotohub" },
            { id: 3, name: "Tonomo", logo: "/integrations/tonomo.svg", href: `${DOCS_URL}/integrations/tonomo`, translationKey: "tonomo" },
            { id: 4, name: "Aryeo", logo: "/integrations/aryeo.svg", href: `${DOCS_URL}/integrations/aryeo`, translationKey: "aryeo" },
            { id: 5, name: "Dropbox", logo: "/integrations/dropbox.svg", href: `${DOCS_URL}/integrations/dropbox`, translationKey: "dropbox" },
        ],
        requestIntegration: { href: "#" },
    },
};

export type SiteConfig = typeof siteConfig;
