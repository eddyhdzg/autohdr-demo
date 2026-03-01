"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { siteConfig } from "@/lib/config";

export function Footer() {
    const { footerLinks, name } = siteConfig;
    const pathname = usePathname();
    const isActive = (url: string) => {
        if (url.includes("#")) return false;
        return pathname === url;
    };

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
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled
                                            className="justify-start gap-1.5 px-2 h-auto"
                                        >
                                            {link.icon}
                                            {link.title}
                                        </Button>
                                    ) : link.external ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            render={
                                                <Link
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            }
                                            className="justify-start gap-1.5 px-2 h-auto text-foreground hover:bg-transparent"
                                        >
                                            {link.icon}
                                            {link.title}
                                            <ArrowUpRight className="size-3" />
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            render={<Link href={link.url} />}
                                            className={cn(
                                                "justify-start gap-1.5 px-2 h-auto rounded-md",
                                                isActive(link.url)
                                                    ? "bg-accent text-accent-foreground"
                                                    : "text-foreground hover:bg-transparent"
                                            )}
                                        >
                                            {link.icon}
                                            {link.title}
                                        </Button>
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
