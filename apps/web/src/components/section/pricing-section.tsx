"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { PRICING_TIERS } from "@/lib/consts";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Slider } from "@workspace/ui/components/slider";
import { NumberTicker } from "@workspace/ui/components/number-ticker";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { Switch } from "@workspace/ui/components/switch";

const { pricing } = siteConfig;

function formatPhotos(photos: number): string {
    return photos.toLocaleString("en-US");
}

function formatTickLabel(photos: number): string {
    if (photos >= 1000) return `${photos / 1000}K`;
    return String(photos);
}

export function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);
    const [sliderIndex, setSliderIndex] = useState(1);

    const currentTier = PRICING_TIERS[sliderIndex];

    // Derive selected card from slider position
    const isFreeSelected = currentTier.photos === 0;
    const isProSelected =
        currentTier.photos > 0 && currentTier.photos <= 1000;
    const isEnterpriseSelected = currentTier.photos > 1000;

    // Each card gets its own tier data (shows relevant fallback when not selected)
    const proTier = isFreeSelected
        ? PRICING_TIERS[1]
        : isProSelected
          ? currentTier
          : PRICING_TIERS[3];
    const enterpriseTier = isEnterpriseSelected
        ? currentTier
        : PRICING_TIERS[4];

    // Pro card display values
    const proMonthly = isYearly ? proTier.yearlyMonthly : proTier.monthly;
    const proPerPhoto = isYearly
        ? proTier.yearlyPerPhoto
        : proTier.perPhoto;

    // Enterprise card display values
    const entMonthly = isYearly
        ? enterpriseTier.yearlyMonthly
        : enterpriseTier.monthly;
    const entPerPhoto = isYearly
        ? enterpriseTier.yearlyPerPhoto
        : enterpriseTier.perPhoto;

    const freePlan = pricing.pricingItems.find((p) => p.name === "Free")!;
    const proPlan = pricing.pricingItems.find((p) => p.name === "Pro")!;
    const enterprisePlan = pricing.pricingItems.find(
        (p) => p.name === "Enterprise"
    )!;

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

            {/* Header + Toggle + Slider */}
            <div className="border-b w-full p-8 md:p-16">
                <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
                    <h3 className="text-3xl font-medium tracking-tighter md:text-4xl">
                        {pricing.title}
                    </h3>
                    <p className="text-lg text-muted-foreground text-balance">
                        {pricing.description}
                    </p>
                    <div className="relative flex items-center gap-3">
                        <span
                            className={cn(
                                "text-sm font-medium transition-colors",
                                !isYearly
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            Monthly
                        </span>
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                        />
                        <span
                            className={cn(
                                "text-sm font-medium transition-colors",
                                isYearly
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            Yearly
                        </span>
                        <span className="border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            20% off
                        </span>
                    </div>

                    {/* Slider */}
                    <div className="w-full max-w-md space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                How many photos per month?
                            </span>
                            <span className="font-medium tabular-nums">
                                <NumberTicker
                                    value={currentTier.photos}
                                    className="font-medium"
                                />{" "}
                                photos / mo
                            </span>
                        </div>
                        <Slider
                            value={[sliderIndex]}
                            onValueChange={(val) => {
                                const v = Array.isArray(val)
                                    ? val[0]
                                    : val;
                                setSliderIndex(v);
                            }}
                            min={0}
                            max={PRICING_TIERS.length - 1}
                            step={1}
                            tooltipRender={(val) =>
                                `${formatPhotos(PRICING_TIERS[val].photos)} photos`
                            }
                        />
                        {/* Tick marks */}
                        <span
                            aria-hidden="true"
                            className="flex w-full items-center justify-between gap-1 px-2.5 text-xs text-muted-foreground tabular-nums"
                        >
                            {PRICING_TIERS.map((tier, i) => (
                                <span
                                    key={i}
                                    className="flex w-0 flex-col items-center justify-center gap-2"
                                >
                                    <span
                                        className={cn(
                                            "h-1 w-px",
                                            i === sliderIndex
                                                ? "bg-foreground"
                                                : "bg-muted-foreground/70"
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            i === sliderIndex &&
                                                "text-foreground font-medium"
                                        )}
                                    >
                                        {formatTickLabel(tier.photos)}
                                    </span>
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
                {/* Free */}
                <div
                    className={cn(
                        "flex flex-col p-8 md:p-10 transition-colors",
                        isFreeSelected && "bg-accent/50 ring-2 ring-inset ring-primary"
                    )}
                >
                    <h4 className="text-lg font-semibold">
                        {freePlan.name}
                    </h4>
                    <div className="mt-4 mb-6">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-semibold tracking-tight">
                                $0
                            </span>
                            <span className="text-sm text-muted-foreground">
                                /month
                            </span>
                        </div>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={["Up to 10 photos / month"]} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<a href={freePlan.href} />}
                            variant={isFreeSelected ? "default" : "outline"}
                            className="w-full"
                        >
                            {freePlan.buttonText}
                        </Button>
                    </div>
                </div>

                {/* Pro */}
                <div
                    className={cn(
                        "relative flex flex-col p-8 md:p-10 transition-[colors,opacity]",
                        isProSelected
                            ? "bg-accent/50 ring-2 ring-inset ring-primary"
                            : "opacity-50"
                    )}
                >
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Pro</h4>
                        <span className="border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wide">
                            Most Popular
                        </span>
                    </div>
                    {proTier.tier && (
                        <p className="text-sm text-muted-foreground mt-1">
                            {proTier.tier}
                        </p>
                    )}
                    <div className="mt-4 mb-6">
                        {/* Price */}
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-5xl font-semibold tracking-tight">
                                $
                            </span>
                            <NumberTicker
                                value={proMonthly}
                                decimalPlaces={2}
                                className="text-5xl font-semibold tracking-tight"
                            />
                            <span className="text-sm text-muted-foreground ml-1">
                                /month
                            </span>
                        </div>
                        {/* Photos count */}
                        <p className="text-sm text-muted-foreground mt-1">
                            <NumberTicker
                                value={proTier.photos}
                                className="text-sm text-muted-foreground"
                            />{" "}
                            photos / month
                        </p>
                        {/* Per photo */}
                        <div className="flex items-center gap-2 mt-1">
                            {isYearly && proTier.perPhoto > 0 && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ${proTier.perPhoto.toFixed(2)}
                                </span>
                            )}
                            <span
                                className={cn(
                                    "text-sm",
                                    isYearly
                                        ? "text-green-600"
                                        : "text-muted-foreground"
                                )}
                            >
                                $
                                <NumberTicker
                                    value={proPerPhoto}
                                    decimalPlaces={2}
                                    className={cn(
                                        "text-sm",
                                        isYearly
                                            ? "text-green-600"
                                            : "text-muted-foreground"
                                    )}
                                />{" "}
                                / photo
                            </span>
                        </div>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={proTier.features} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<a href={proPlan.href} />}
                            variant={isProSelected ? "default" : "outline"}
                            aria-disabled={!isProSelected}
                            className={cn("w-full", !isProSelected && "pointer-events-none")}
                        >
                            {isYearly ? "Get Yearly" : "Get Monthly"}
                        </Button>
                    </div>
                </div>

                {/* Enterprise */}
                <div
                    className={cn(
                        "flex flex-col p-8 md:p-10 transition-[colors,opacity]",
                        isEnterpriseSelected
                            ? "bg-accent/50 ring-2 ring-inset ring-primary"
                            : "opacity-50"
                    )}
                >
                    <h4 className="text-lg font-semibold">
                        {enterprisePlan.name}
                    </h4>
                    <div className="mt-4 mb-6">
                        {/* Photos count */}
                        <p className="text-sm text-muted-foreground">
                            <NumberTicker
                                value={enterpriseTier.photos}
                                className="text-sm text-muted-foreground"
                            />{" "}
                            photos / month
                        </p>
                        {/* Price */}
                        <div className="flex items-baseline gap-0.5 mt-1">
                            <span className="text-5xl font-semibold tracking-tight">
                                $
                            </span>
                            <NumberTicker
                                value={entMonthly}
                                decimalPlaces={2}
                                className="text-5xl font-semibold tracking-tight"
                            />
                            <span className="text-sm text-muted-foreground ml-1">
                                / month
                            </span>
                        </div>
                        {/* Per photo */}
                        <div className="flex items-center gap-2 mt-1">
                            {isYearly && enterpriseTier.perPhoto > 0 && (
                                <span className="text-sm text-muted-foreground line-through">
                                    $
                                    {enterpriseTier.perPhoto.toFixed(2)}
                                </span>
                            )}
                            <span
                                className={cn(
                                    "text-sm",
                                    isYearly
                                        ? "text-green-600"
                                        : "text-muted-foreground"
                                )}
                            >
                                $
                                <NumberTicker
                                    value={entPerPhoto}
                                    decimalPlaces={2}
                                    className={cn(
                                        "text-sm",
                                        isYearly
                                            ? "text-green-600"
                                            : "text-muted-foreground"
                                    )}
                                />{" "}
                                / photo
                            </span>
                        </div>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={enterpriseTier.features} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<a href={enterprisePlan.href} />}
                            variant={
                                isEnterpriseSelected ? "default" : "outline"
                            }
                            aria-disabled={!isEnterpriseSelected}
                            className={cn("w-full", !isEnterpriseSelected && "pointer-events-none")}
                        >
                            {enterprisePlan.buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureList({
    features,
    prefix,
}: {
    features: readonly string[];
    prefix?: string;
}) {
    return (
        <div className="flex flex-col gap-3">
            {prefix && (
                <p className="text-sm font-medium text-muted-foreground">
                    {prefix}
                </p>
            )}
            <ul className="space-y-2.5">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                        <svg
                            className="h-4 w-4 shrink-0 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
