import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
import { TypographyH1, TypographyLead } from "@workspace/ui/components/typography";
import { Sparkles } from "lucide-react";

export function HeroSection() {
    const { hero } = siteConfig;

    return (
        <section
            id="hero"
            className="relative px-4 py-12 md:py-16 lg:py-24"
        >
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                <Button
                    render={<a href={hero.cta.primary.href} />}
                    variant="outline"
                    size="sm"
                >
                    <Sparkles />
                    {hero.badge}
                </Button>
                <TypographyH1>{hero.title}</TypographyH1>
                <TypographyLead className="max-w-2xl">
                    {hero.description}
                </TypographyLead>
                <div className="flex items-center gap-3">
                    <Button
                        render={<a href={hero.cta.secondary.href} />}
                        variant="outline"
                        size="lg"
                        className="px-6 py-4 text-sm md:px-8 md:py-6 md:text-base font-medium"
                    >
                        {hero.cta.secondary.text}
                    </Button>
                    <Button
                        render={<a href={hero.cta.primary.href} />}
                        size="lg"
                        className="px-6 py-4 text-sm md:px-8 md:py-6 md:text-base font-medium"
                    >
                        {hero.cta.primary.text}
                    </Button>
                </div>
            </div>
        </section>
    );
}
