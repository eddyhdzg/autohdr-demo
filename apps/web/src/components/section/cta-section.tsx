import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
import { CornerPlus } from "@workspace/ui/components/corner-plus";

export function CTASection() {
    const { ctaSection } = siteConfig;

    return (
        <section
            id={ctaSection.id}
            className="relative flex flex-col items-center justify-center px-4 py-20 md:py-32"
        >
            <CornerPlus position="top-left" className="text-muted-foreground/50" />
            <CornerPlus position="top-right" className="text-muted-foreground/50" />
            <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-balance">
                    {ctaSection.title}
                </h2>
                <p className="text-muted-foreground text-center text-balance font-medium max-w-2xl mx-auto">
                    {ctaSection.subtext}
                </p>

                <div className="pt-2">
                    <Button
                        render={<a href={ctaSection.button.href} />}
                        size="lg"
                        className="px-8 py-6 text-base font-medium"
                    >
                        {ctaSection.button.text}
                    </Button>
                </div>
            </div>
        </section>
    );
}