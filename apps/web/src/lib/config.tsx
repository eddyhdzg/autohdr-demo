import { Icons } from "@/components/icons";
import { cn } from "@workspace/ui/lib/utils";

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "bg-radial from-gradient-primary to-gradient-secondary/40 bg-clip-text text-transparent",
                className,
            )}
        >
            {children}
        </span>
    );
};

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
    name: "AutoHDR",
    description: "AI-powered HDR image processing.",
    cta: "Get Started",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    keywords: [
        "HDR Image Processing",
        "AI HDR",
        "Automatic HDR",
        "HDR Photo Enhancement",
    ],
    links: {
        email: "delivery@autohdr.com",
        linkedin: "https://www.linkedin.com/company/autohdr/",
        instagram: "https://www.instagram.com/auto.hdr/",
        tiktok: "https://www.tiktok.com/@auto.hdr",
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
        badge: {
            icon: (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground"
                >
                    <path
                        d="M4 4C3.44772 4 3 4.44772 3 5V7C3 7.55228 3.44772 8 4 8H5V10C5 10.5523 5.44772 11 6 11H7C7.55228 11 8 10.5523 8 10V5C8 4.44772 7.55228 4 7 4H4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H12V10C12 10.5523 12.4477 11 13 11H14C14.5523 11 15 10.5523 15 10V5C15 4.44772 14.5523 4 14 4H11Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            text: "Scale",
        },
        title: (<>Hear from our <Highlight>developer</Highlight> community</>),
        description: "Thousands of engineers trust our AI agents daily. Discover how teams accelerate development while maintaining code quality and standards.",
        testimonials: [
            {
                id: "1",
                name: "Alex Rivera",
                role: "CTO at InnovateTech",
                img: "https://randomuser.me/api/portraits/men/91.jpg",
                description: (
                    <p>
                        The AI-driven analytics from #QuantumInsights have revolutionized our
                        product development cycle.
                        Insights are now more accurate and faster than ever.
                        A game-changer for tech companies.
                    </p>
                ),
            },
            {
                id: "2",
                name: "Samantha Lee",
                role: "Marketing Director at NextGen Solutions",
                img: "https://randomuser.me/api/portraits/women/12.jpg",
                description: (
                    <p>
                        Implementing #AIStream&apos;s customer prediction model has
                        drastically improved our targeting strategy.
                        Seeing a 50% increase in conversion rates!
                        Highly recommend their solutions.
                    </p>
                ),
            },
            {
                id: "3",
                name: "Raj Patel",
                role: "Founder & CEO at StartUp Grid",
                img: "https://randomuser.me/api/portraits/men/45.jpg",
                description: (
                    <p>
                        As a startup, we need to move fast and stay ahead. #CodeAI&apos;s
                        automated coding assistant helps us do just that.
                        Our development speed has doubled.
                        tool for any startup.
                    </p>
                ),
            },
            {
                id: "4",
                name: "Emily Chen",
                role: "Product Manager at Digital Wave",
                img: "https://randomuser.me/api/portraits/women/83.jpg",
                description: (
                    <p>
                        #VoiceGen&apos;s AI-driven voice synthesis has made creating global
                        products a breeze.
                        Localization is now seamless and efficient.
                        must-have for global product teams.
                    </p>
                ),
            },
            {
                id: "5",
                name: "Michael Brown",
                role: "Data Scientist at FinTech Innovations",
                img: "https://randomuser.me/api/portraits/men/1.jpg",
                description: (
                    <p>
                        Leveraging #DataCrunch&apos;s AI for our financial models has given us
                        an edge in predictive accuracy.
                        Our investment strategies are now powered by real-time data
                        analytics.
                        Transformative for the finance industry.
                    </p>
                ),
            },
            {
                id: "6",
                name: "Linda Wu",
                role: "VP of Operations at LogiChain Solutions",
                img: "https://randomuser.me/api/portraits/women/5.jpg",
                description: (
                    <p>
                        #LogiTech&apos;s supply chain optimization tools have drastically
                        reduced our operational costs.
                        <Highlight>
                            Efficiency and accuracy in logistics have never been better.
                        </Highlight>{" "}
                    </p>
                ),
            },
            {
                id: "7",
                name: "Carlos Gomez",
                role: "Head of R&D at EcoInnovate",
                img: "https://randomuser.me/api/portraits/men/14.jpg",
                description: (
                    <p>
                        By integrating #GreenTech&apos;s sustainable energy solutions,
                        we&apos;ve seen a significant reduction in carbon footprint.
                        <Highlight>
                            Leading the way in eco-friendly business practices.
                        </Highlight>{" "}
                        Pioneering change in the industry.
                    </p>
                ),
            },
            {
                id: "8",
                name: "Aisha Khan",
                role: "Chief Marketing Officer at Fashion Forward",
                img: "https://randomuser.me/api/portraits/women/56.jpg",
                description: (
                    <p>
                        #TrendSetter&apos;s market analysis AI has transformed how we approach
                        fashion trends.
                        <Highlight>
                            Our campaigns are now data-driven with higher customer engagement.
                        </Highlight>{" "}
                        Revolutionizing fashion marketing.
                    </p>
                ),
            },
            {
                id: "9",
                name: "Tom Chen",
                role: "Director of IT at HealthTech Solutions",
                img: "https://randomuser.me/api/portraits/men/18.jpg",
                description: (
                    <p>
                        Implementing #MediCareAI in our patient care systems has improved
                        patient outcomes significantly.
                        <Highlight>
                            Technology and healthcare working hand in hand for better health.
                        </Highlight>{" "}
                        A milestone in medical technology.
                    </p>
                ),
            },
            {
                id: "10",
                name: "Sofia Patel",
                role: "CEO at EduTech Innovations",
                img: "https://randomuser.me/api/portraits/women/73.jpg",
                description: (
                    <p>
                        #LearnSmart&apos;s AI-driven personalized learning plans have doubled
                        student performance metrics.
                        <Highlight>
                            Education tailored to every learner&apos;s needs.
                        </Highlight>{" "}
                        Transforming the educational landscape.
                    </p>
                ),
            },
            {
                id: "11",
                name: "Jake Morrison",
                role: "CTO at SecureNet Tech",
                img: "https://randomuser.me/api/portraits/men/25.jpg",
                description: (
                    <p>
                        With #CyberShield&apos;s AI-powered security systems, our data
                        protection levels are unmatched.
                        <Highlight>
                            Ensuring safety and trust in digital spaces.
                        </Highlight>{" "}
                        Redefining cybersecurity standards.
                    </p>
                ),
            },
            {
                id: "12",
                name: "Nadia Ali",
                role: "Product Manager at Creative Solutions",
                img: "https://randomuser.me/api/portraits/women/78.jpg",
                description: (
                    <p>
                        #DesignPro&apos;s AI has streamlined our creative process, enhancing
                        productivity and innovation.
                        <Highlight>Bringing creativity and technology together.</Highlight> A
                        game-changer for creative industries.
                    </p>
                ),
            },
            {
                id: "13",
                name: "Omar Farooq",
                role: "Founder at Startup Hub",
                img: "https://randomuser.me/api/portraits/men/54.jpg",
                description: (
                    <p>
                        #VentureAI&apos;s insights into startup ecosystems have been
                        invaluable for our growth and funding strategies.
                        <Highlight>
                            Empowering startups with data-driven decisions.
                        </Highlight>{" "}
                        A catalyst for startup success.
                    </p>
                ),
            },
        ],
    },
    pricing: {
        title: "Pricing that scales with you",
        description:
            "Whichever plan you pick, it's free until you love your docs. That's our promise.",
        pricingItems: [
            {
                name: "Startup",
                href: "#",
                price: "$12",
                period: "month",
                yearlyPrice: "$120",
                features: [
                    "Custom domain",
                    "SEO-optimizations",
                    "Auto-generated API docs",
                    "Built-in components library",
                    "E-commerce integration",
                    "User authentication system",
                    "Multi-language support",
                    "Real-time collaboration tools",
                ],
                description: "Ideal for professionals and small teams",
                buttonText: "Upgrade to Pro",
                buttonColor: "bg-secondary text-white",
                isPopular: true,
            },
            {
                name: "Free",
                href: "#",
                price: "$0",
                period: "month",
                yearlyPrice: "$0",
                features: [
                    "Custom domain",
                    "SEO-optimizations",
                    "Auto-generated API docs",
                    "Built-in components library",
                ],
                description: "Perfect for individual users",
                buttonText: "Start Free",
                buttonColor: "bg-accent text-primary",
                isPopular: false,
            },
            {
                name: "Enterprise",
                href: "#",
                price: "$24",
                period: "month",
                yearlyPrice: "$240",
                features: [
                    "Custom domain",
                    "SEO-optimizations",
                    "Auto-generated API docs",
                    "Built-in components librarys",
                    "Real-time collaboration tools",
                ],
                description: "Best for large teams and enterprise-level organizations",
                buttonText: "Contact Sales",
                buttonColor: "bg-primary text-primary-foreground",
                isPopular: false,
            },
        ],
    },
    faqSection: {
        title: "Frequently Asked Questions",
        description:
            "Answers to common questions about SkyAgent and its features. If you have any other questions, please don't hesitate to contact us.",
        faQitems: [
            {
                id: 1,
                question: "What is an AI Agent?",
                answer:
                    "An AI Agent is an intelligent software program that can perform tasks autonomously, learn from interactions, and make decisions to help achieve specific goals. It combines artificial intelligence and machine learning to provide personalized assistance and automation.",
            },
            {
                id: 2,
                question: "How does SkyAgent work?",
                answer:
                    "SkyAgent works by analyzing your requirements, leveraging advanced AI algorithms to understand context, and executing tasks based on your instructions. It can integrate with your workflow, learn from feedback, and continuously improve its performance.",
            },
            {
                id: 3,
                question: "How secure is my data?",
                answer:
                    "We implement enterprise-grade security measures including end-to-end encryption, secure data centers, and regular security audits. Your data is protected according to industry best practices and compliance standards.",
            },
            {
                id: 4,
                question: "Can I integrate my existing tools?",
                answer:
                    "Yes, SkyAgent is designed to be highly compatible with popular tools and platforms. We offer APIs and pre-built integrations for seamless connection with your existing workflow tools and systems.",
            },
            {
                id: 5,
                question: "Is there a free trial available?",
                answer:
                    "Yes, we offer a 14-day free trial that gives you full access to all features. No credit card is required to start your trial, and you can upgrade or cancel at any time.",
            },
            {
                id: 6,
                question: "How does SkyAgent save me time?",
                answer:
                    "SkyAgent automates repetitive tasks, streamlines workflows, and provides quick solutions to common challenges. This automation and efficiency can save hours of manual work, allowing you to focus on more strategic activities.",
            },
        ],
    },
    ctaSection: {
        id: "contact",
        title: "Transform your photos with AutoHDR",
        backgroundImage: "/agent-cta-background.png",
        button: {
            text: "Start for free",
            href: "#",
        },
        subtext: "Enhance your images with AI-powered HDR processing. Get studio-quality results in seconds, completely free.",
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
                { id: 6, title: "Docs", url: "https://knowledge.autohdr.com/", external: true },
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
                { id: 18, title: "Instagram", url: "https://www.instagram.com/auto.hdr/", external: true, icon: <Icons.instagram className="size-4" /> },
                { id: 19, title: "TikTok", url: "https://www.tiktok.com/@auto.hdr", external: true, icon: <Icons.tiktok className="size-4" /> },
                { id: 20, title: "LinkedIn", url: "https://www.linkedin.com/company/autohdr/", external: true, icon: <Icons.linkedin className="size-4" /> },
            ],
        },
    ] as FooterSection[],


};

export type SiteConfig = typeof siteConfig;
