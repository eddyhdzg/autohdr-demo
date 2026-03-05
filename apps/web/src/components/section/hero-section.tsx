import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
import { TypographyH1, TypographyLead } from "@workspace/ui/components/typography";
import { Sparkles } from "lucide-react";

export function HeroSection() {
    const t = useTranslations("Hero");
    const tCommon = useTranslations("Common");
    const { hero } = siteConfig;

    return (
        <section
            id="hero"
            className="relative px-6 py-12 md:py-16 lg:py-24"
        >
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                <Button
                    render={<a href={hero.cta.primary.href} />}
                    variant="outline"
                    size="sm"
                >
                    <Sparkles />
                    {t("badge")}
                </Button>
                <TypographyH1>{t("title")}</TypographyH1>
                <TypographyLead className="max-w-2xl">
                    {t("description")}
                </TypographyLead>
                <div className="flex items-center gap-3">
                    <Button
                        render={<a href={hero.cta.secondary.href} />}
                        variant="outline"
                        size="lg"
                        className="px-6 py-4 text-sm md:px-8 md:py-6 md:text-base font-medium"
                    >
                        {tCommon("bookDemo")}
                    </Button>
                    <Button
                        render={<a href={hero.cta.primary.href} />}
                        size="lg"
                        className="px-6 py-4 text-sm md:px-8 md:py-6 md:text-base font-medium"
                    >
                        {tCommon("getStarted")}
                    </Button>
                </div>
            </div>
        </section>
    );
}
