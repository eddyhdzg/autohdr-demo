import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { Sparkles } from "lucide-react";

export function HeroSection() {
    const { hero } = siteConfig;

    return (
        <section
            id="hero"
            className="relative px-4 py-16 md:py-24"
        >
            <CornerPlus position="bottom-left" className="text-muted-foreground/50" />
            <CornerPlus position="bottom-right" className="text-muted-foreground/50" />
            <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6 max-w-3xl">
                <Button
                    render={<a href={hero.cta.primary.href} />}
                    variant="outline"
                    size="sm"
                >
                    <Sparkles />
                    {hero.badge}
                </Button>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance">
                    {hero.title}
                </h1>
                <p className="text-secondary-foreground/70 text-lg max-w-2xl">
                    {hero.description}
                </p>
                <div className="flex items-center gap-3">
                    <Button
                        render={<a href={hero.cta.secondary.href} />}
                        variant="outline"
                        size="lg"
                        className="px-8 py-6 text-base font-medium"
                    >
                        {hero.cta.secondary.text}
                    </Button>
                    <Button
                        render={<a href={hero.cta.primary.href} />}
                        size="lg"
                        className="px-8 py-6 text-base font-medium"
                    >
                        {hero.cta.primary.text}
                    </Button>
                </div>
            </div>
        </section>
    );
}
