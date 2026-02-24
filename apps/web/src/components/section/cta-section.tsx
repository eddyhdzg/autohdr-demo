import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export function CTASection() {
    const { ctaSection } = siteConfig;

    return (
        <section
            id={ctaSection.id}
            className="relative flex flex-col items-center justify-center px-4 py-20 md:py-32 overflow-hidden"
        >
            <div className="absolute inset-0 -z-1 h-full w-full bg-radial-[at_45%_85%] from-[#2DD4BF]/40 via-[#0F766E]/4 mask-[linear-gradient(to_bottom,transparent,black_100%)]" />
            <div className="absolute inset-0 -z-1 h-full w-full bg-radial-[at_45%_68%] from-[#2DD4BF]/68 via-[#0F766E]/3 mask-[linear-gradient(to_bottom,transparent,black_100%)] blur-[50px]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter    text-balance">
                    {ctaSection.title}
                </h2>
                <p className="text-muted-foreground text-center text-balance font-medium max-w-2xl mx-auto">
                    {ctaSection.subtext}
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                    <Button
                        render={<a href={ctaSection.button.href} />}
                        size="lg"
                        className={cn(
                            "rounded-lg px-8 py-6 text-base font-medium text-primary-foreground",
                            "bg-linear-to-b from-teal-500 to-teal-600",
                            "shadow-[0px_1px_2px_0px_#00000016,0px_2px_4px_0px_#00000006,inset_0px_0px_1.5px_#0D9488,inset_0px_2.5px_0px_#ffffff16,inset_0px_0px_2.5px_#ffffff08] ring-2 ring-teal-600 hover:from-teal-600 hover:to-teal-700",
                        )}
                    >
                        {ctaSection.button.text}
                    </Button>
                </div>
            </div>
        </section>
    );
}