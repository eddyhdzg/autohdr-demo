import { siteConfig } from "@/lib/config";
import { PRICING_TIERS } from "@/lib/consts";
import { Button } from "@workspace/ui/components/button";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2 } from "@workspace/ui/components/typography";
import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const { pricing } = siteConfig;

const bestRate = PRICING_TIERS[PRICING_TIERS.length - 1].yearlyPerPhoto;

export function PricingCTA() {
    return (
        <section id="pricing" className="relative w-full">
            <CornerPlus
                position="top-left"
                className="text-muted-foreground/50"
            />
            <CornerPlus
                position="top-right"
                className="text-muted-foreground/50"
            />
            <div className="px-4 py-12 md:py-16 lg:py-24">
                <div className="flex flex-col items-center text-center space-y-6 max-w-xl mx-auto">
                    <Button
                        render={<Link href="/pricing" />}
                        variant="outline"
                        size="sm"
                    >
                        <Tag />
                        Simple, transparent pricing
                    </Button>
                    <TypographyH2>{pricing.title}</TypographyH2>
                    <p className="text-lg text-muted-foreground text-balance">
                        {pricing.description}
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                        <span className="text-muted-foreground line-through">
                            $0.80
                        </span>{" "}
                        <span>${bestRate.toFixed(2)}</span>{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                            / photo
                        </span>
                    </p>
                    <Button
                        render={<Link href="/pricing" />}
                        size="lg"
                        className="px-6 py-4 text-sm md:px-8 md:py-6 md:text-base font-medium"
                    >
                        View Pricing
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </section>
    );
}
