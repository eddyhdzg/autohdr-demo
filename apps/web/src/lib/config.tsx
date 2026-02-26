import { BRAND, DOCS_URL, SOCIALS } from "@workspace/consts";
import { Icons } from "@/components/icons";

export const BLUR_FADE_DELAY = 0.15;

interface FooterLink {
    id: number;
    title: string;
    url: string;
    disabled?: boolean;
    external?: boolean;
    icon?: React.ReactNode;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

export const siteConfig = {
    name: BRAND.name,
    description: BRAND.description,
    cta: "Get Started",
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
            { id: 1, name: "Studio", href: "/studio", disabled: true },
            { id: 2, name: "Pricing", href: "/#pricing" },
            { id: 3, name: "Contact", href: "/#contact" },
            { id: 4, name: "FAQs", href: "/#faqs" },
        ],
    },
    hero: {
        badge: "Start for FREE \u2022 No credit card needed",
        title: "AI Photo Editing for Real Estate",
        description:
            "Powering 1 in 5 real estate listings in the U.S.",
        cta: {
            primary: {
                text: "Get Started",
                href: "#",
            },
            secondary: {
                text: "Book a Demo",
                href: "#",
            },
        },
    },
    companyShowcase: {
        companyLogos: [
            { id: 1, name: "Spiro", logo: <img src="/integrations/spiro.svg" alt="Spiro" className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 2, name: "HD PhotoHub", logo: <img src="/integrations/hdphotohub.svg" alt="HD PhotoHub" className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 3, name: "Tonomo", logo: <img src="/integrations/tonomo.svg" alt="Tonomo" className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 4, name: "Aryeo", logo: <img src="/integrations/aryeo.svg" alt="Aryeo" className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
            { id: 5, name: "Dropbox", logo: <img src="/integrations/dropbox.svg" alt="Dropbox" className="max-h-10 max-w-28 w-auto h-auto object-contain brightness-0 dark:invert" /> },
        ],
    },
    testimonialSection: {
        title: "Trusted by industry leaders",
        description: "Trusted to edit 20% of US listings",
        testimonials: [
            {
                id: "1",
                name: "Eli Jones",
                role: "#1 real estate photography coach in the world",
                img: "/testimonials/eli-jones.jpg",
                description: "I can't tell the difference",
                videoUrl: "https://www.youtube.com/watch?v=t-DOK1fOT0o",
            },
            {
                id: "2",
                name: "Todd Kivimaki",
                role: "Owner of Spiro Media and Wow Video Tours",
                img: "/testimonials/todd-kivimaki.jpeg",
                description: "We switched 90 shoots per day overnight",
                videoUrl: "https://www.youtube.com/watch?v=AgCK9SDhtr0&t=1290s",
            },
            {
                id: "3",
                name: "Brendan Hsu",
                role: "Scaled from $0 \u2192 $7M in two years",
                img: "/testimonials/brendan-hsu.png",
                description: "We cut our bill in half this year",
                videoUrl: "https://www.youtube.com/watch?v=BEFF7ABzi3A",
            },
            {
                id: "4",
                name: "Alex Coombs",
                role: "Owner at one of Canada's biggest real estate media companies",
                img: "/testimonials/alex-coombs.png",
                description: "We tried several AI Editors... nobody was even close",
                videoUrl: "https://www.youtube.com/watch?v=yrDtgKdSPoo&t",
            },
            {
                id: "5",
                name: "Ken Dono",
                role: "Industry expert trusted for critical reviews",
                img: "/testimonials/ken-dono.jpg",
                description: "I'm shooting handheld and it edits damn seamlessly",
                videoUrl: "https://www.youtube.com/watch?v=2_xdkitECLo",
            },
        ],
    },
    pricing: {
        title: "Pricing",
        description: "Only pay for what you download",
        volumeTiers: [
            { photos: 0, monthly: 0, perPhoto: 0, yearlyMonthly: 0, yearlyPerPhoto: 0, tier: "" },
            { photos: 50, monthly: 28.50, perPhoto: 0.57, yearlyMonthly: 22.80, yearlyPerPhoto: 0.46, tier: "Basic" },
            { photos: 500, monthly: 265.00, perPhoto: 0.53, yearlyMonthly: 225.25, yearlyPerPhoto: 0.45, tier: "Standard" },
            { photos: 1000, monthly: 500.00, perPhoto: 0.50, yearlyMonthly: 440.00, yearlyPerPhoto: 0.44, tier: "Pro" },
            { photos: 2000, monthly: 960.00, perPhoto: 0.48, yearlyMonthly: 864.00, yearlyPerPhoto: 0.43, tier: "" },
            { photos: 5000, monthly: 2250.00, perPhoto: 0.45, yearlyMonthly: 2025.00, yearlyPerPhoto: 0.41, tier: "" },
            { photos: 10000, monthly: 4000.00, perPhoto: 0.40, yearlyMonthly: 3600.00, yearlyPerPhoto: 0.36, tier: "" },
        ],
        pricingItems: [
            {
                name: "Free",
                href: "#",
                price: "$0",
                period: "month",
                yearlyPrice: "$0",
                features: [
                    "Up to 10 photos / month",
                    "Standard HDR processing",
                    "24-hour delivery",
                ],
                description: "Try AutoHDR with no commitment",
                buttonText: "Get Started",
                buttonColor: "bg-accent text-primary",
                isPopular: false,
            },
            {
                name: "Pro",
                href: "#",
                price: "$28.50",
                period: "month",
                yearlyPrice: "$22.80",
                features: [
                    "Unused credits roll over",
                    "Auto TV Blackout",
                    "Auto Add Fire",
                ],
                description: "For teams that need volume",
                buttonText: "Get Started",
                buttonColor: "bg-secondary text-white",
                isPopular: true,
            },
            {
                name: "Enterprise",
                href: "#",
                price: "Custom",
                period: "month",
                yearlyPrice: "Custom",
                features: [
                    "Everything in Pro",
                    "Walkthrough Re-ordering",
                    "Dedicated Slack Channel",
                ],
                description: "For brokerages and large teams",
                buttonText: "Contact Sales",
                buttonColor: "bg-primary text-primary-foreground",
                isPopular: false,
            },
        ],
    },
    faqSection: {
        title: "Frequently Asked Questions",
        description:
            "Answers to common questions about AutoHDR and its features. If you have any other questions, please don't hesitate to contact us.",
        faqLink: DOCS_URL
            ? { text: "See all FAQs", href: `${DOCS_URL}/faq` }
            : null,
        faQitems: [
            {
                id: 1,
                question: "What is AutoHDR?",
                answer:
                    "AutoHDR is an AI-powered photo editing service for real estate. Upload your photos and receive professionally enhanced images with HDR, sky replacement, object removal, and more.",
            },
            {
                id: 2,
                question: "How fast is the turnaround?",
                answer:
                    "Most photos are delivered within minutes. Free tier has 24-hour delivery, while Pro and Enterprise plans include priority processing.",
            },
            {
                id: 3,
                question: "How does pricing work?",
                answer:
                    "You only pay for what you download. Start with 10 free photos per month, then scale up with volume-based pricing starting at $0.57/photo.",
            },
            {
                id: 4,
                question: "Can I integrate AutoHDR with my workflow?",
                answer:
                    "Yes, AutoHDR integrates with popular platforms like Spiro, HD PhotoHub, Tonomo, Aryeo, and Dropbox for seamless delivery.",
            },
            {
                id: 5,
                question: "Is there a free plan?",
                answer:
                    "Yes, get up to 10 free photos per month with standard HDR processing. No credit card required.",
            },
        ],
    },
    ctaSection: {
        id: "contact",
        title: "Transform your photos with AutoHDR",
        backgroundImage: "/agent-cta-background.png",
        cta: {
            primary: {
                text: "Get Started",
                href: "#",
            },
            secondary: {
                text: "Book a Demo",
                href: "#",
            },
        },
        subtext: "Enhance your real estate photos with AutoHDR. Studio-quality results in seconds, start for free.",
    },
    footerLinks: [
        {
            title: "Pages",
            links: [
                { id: 1, title: "Home", url: "/" },
                { id: 2, title: "Studio", url: "/studio", disabled: true },
                { id: 3, title: "Pricing", url: "/#pricing" },
                { id: 4, title: "Contact", url: "/#contact" },
                { id: 5, title: "FAQs", url: "/#faqs" },
            ],
        },
        {
            title: "Resources",
            links: [
                ...(DOCS_URL ? [{ id: 6, title: "Docs", url: DOCS_URL, external: true }] : []),
                { id: 7, title: "Support", url: "/support", disabled: true },
                { id: 8, title: "Changelog", url: "/changelog", disabled: true },
            ],
        },
        {
            title: "Company",
            links: [
                { id: 9, title: "Blog", url: "/blog", disabled: true },
                { id: 10, title: "About Us", url: "/about", disabled: true },
                { id: 11, title: "Our Team", url: "/team", disabled: true },
                { id: 12, title: "Brand", url: "/brand" },
                { id: 13, title: "Terms", url: "/terms", disabled: true },
                { id: 14, title: "Privacy", url: "/privacy", disabled: true },
                { id: 15, title: "Request a Feature", url: "#", disabled: true },
                { id: 16, title: "Contact Sales", url: "#", disabled: true },
                { id: 17, title: "Partnerships", url: "#", disabled: true },
            ],
        },
        {
            title: "Social",
            links: [
                { id: 18, title: "Instagram", url: SOCIALS.instagram, external: true, icon: <Icons.instagram className="size-4" /> },
                { id: 19, title: "TikTok", url: SOCIALS.tiktok, external: true, icon: <Icons.tiktok className="size-4" /> },
                { id: 20, title: "LinkedIn", url: SOCIALS.linkedin, external: true, icon: <Icons.linkedin className="size-4" /> },
            ],
        },
    ] as FooterSection[],


};

export type SiteConfig = typeof siteConfig;
