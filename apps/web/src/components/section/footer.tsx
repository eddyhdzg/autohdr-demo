"use client";

import { Emoji } from "react-apple-emojis";
import { ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { localizeDocsUrl } from "@/lib/localize-docs-url";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { siteConfig } from "@/lib/config";
import { TypographyH3, TypographyMuted } from "@workspace/ui/components/typography";

export function Footer() {
    const { footerLinks, name } = siteConfig;
    const pathname = usePathname();
    const locale = useLocale();
    const tFooter = useTranslations("Footer");
    const tCommon = useTranslations("Common");
    const isActive = (url: string) => {
        if (url.includes("#")) return false;
        return pathname === url;
    };

    return (
        <footer className="w-full border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                {footerLinks.map((section) => (
                    <div
                        key={section.titleKey}
                        className="flex flex-col gap-4 px-6 py-8 md:px-8 lg:pt-18"
                    >
                        <TypographyH3>{tFooter(`sections.${section.titleKey}`)}</TypographyH3>
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
                                            {tFooter(`links.${link.translationKey}`)}
                                        </Button>
                                    ) : link.external ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            render={
                                                <a
                                                    href={localizeDocsUrl(link.url, locale)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            }
                                            className="justify-start gap-1.5 px-2 h-auto text-foreground hover:bg-transparent"
                                        >
                                            {link.icon}
                                            {tFooter(`links.${link.translationKey}`)}
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
                                            {tFooter(`links.${link.translationKey}`)}
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-y border-border py-4 px-6 flex flex-wrap justify-between gap-x-4 gap-y-1">
                <TypographyMuted className="flex items-center gap-1.5">
                    <Emoji name="flag-united-states" width={16} />
                    {tCommon("builtInAustinTx")}
                </TypographyMuted>
                <TypographyMuted>
                    {tFooter("copyright", { year: new Date().getFullYear(), name })}{" "}
                    <span className="hidden md:inline">
                        {tCommon("allRightsReserved")}
                    </span>
                </TypographyMuted>
            </div>
        </footer>
    );
}
