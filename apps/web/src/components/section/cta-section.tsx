import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";

export function CTASection() {
    const { ctaSection } = siteConfig;

    return (
        <section
            id={ctaSection.id}
            className="relative flex flex-col items-center justify-center px-4 py-12 md:py-20 lg:py-32"
        >
            <CornerPlus position="top-left" className="text-muted-foreground/50" />
            <CornerPlus position="top-right" className="text-muted-foreground/50" />
            <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
                <TypographyH2>{ctaSection.title}</TypographyH2>
                <TypographyP className="text-center max-w-2xl mx-auto">
                    {ctaSection.subtext}
                </TypographyP>

                <div className="flex items-center gap-3 pt-2">
                    <Button
                        render={<a href={ctaSection.cta.secondary.href} />}
                        variant="outline"
                        size="lg"
                        className="px-6 py-4 text-sm md:px-8 md:py-6 md:text-base font-medium"
                    >
                        {ctaSection.cta.secondary.text}
                    </Button>
                    <Button
                        render={<a href={ctaSection.cta.primary.href} />}
                        size="lg"
                        className="px-6 py-4 text-sm md:px-8 md:py-6 md:text-base font-medium"
                    >
                        {ctaSection.cta.primary.text}
                    </Button>
                </div>
            </div>
        </section>
    );
}