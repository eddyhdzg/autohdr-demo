import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
    const { footerLinks, name } = siteConfig;

    return (
        <footer className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                {footerLinks.map((section) => (
                    <div
                        key={section.title}
                        className="flex flex-col gap-4 p-8 lg:pt-18"
                    >
                        <h3 className="text-sm font-semibold text-foreground">
                            {section.title}
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {section.links.map((link) => (
                                <li key={link.id}>
                                    {link.disabled ? (
                                        <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                                            {link.title}
                                        </span>
                                    ) : link.external ? (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                                        >
                                            {link.icon}
                                            {link.title}
                                            {!link.icon && (
                                                <ArrowUpRight className="size-3" />
                                            )}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.url}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-y border-border py-4">
                <p className="text-sm text-muted-foreground text-center">
                    © {new Date().getFullYear()} {name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
