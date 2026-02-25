import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance">
                    {hero.title}
                </h1>
                <p className="text-secondary-foreground/70 text-base md:text-lg max-w-2xl">
                    {hero.description}
                </p>
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
