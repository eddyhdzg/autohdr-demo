"use client";

import { useQueryStates } from "nuqs";
import { pricingSearchParams, type BillingPeriod } from "@/lib/pricing-searchparams";
import { siteConfig } from "@/lib/config";
import { EXTRA_CREDIT_RATE, PRICING_TIERS } from "@/lib/consts";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Slider } from "@workspace/ui/components/slider";
import { NumberTicker } from "@workspace/ui/components/number-ticker";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { TypographyH2, TypographyMuted } from "@workspace/ui/components/typography";
import { Card, CardContent } from "@workspace/ui/components/card";
import { FlameIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

const { pricing } = siteConfig;

function formatPhotos(photos: number): string {
    return photos.toLocaleString("en-US");
}

function formatTickLabel(photos: number): string {
    if (photos >= 1000) return `${photos / 1000}K`;
    return String(photos);
}

export function PricingSection() {
    const [{ billing, tier }, setPricingParams] = useQueryStates(pricingSearchParams);
    const isYearly = billing === "yearly";
    const sliderIndex = tier;

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
        <section id="pricing" className="relative w-full divide-y divide-border">
            {/* Header + Toggle + Slider */}
            <div className="w-full px-6 py-8 md:p-16">
                <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
                    <TypographyH2>{pricing.title}</TypographyH2>
                    <p className="text-lg text-muted-foreground text-balance">
                        {pricing.description}
                    </p>
                    <Tabs
                        value={billing}
                        onValueChange={(v) =>
                            setPricingParams({ billing: v as BillingPeriod })
                        }
                        className="hidden lg:flex"
                    >
                        <TabsList>
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="yearly" className="gap-1.5">
                                Yearly
                                <span className={cn(
                                    "border px-2 py-0.5 text-xs font-medium",
                                    isYearly
                                        ? "border-green-700 bg-green-700/8 text-green-700"
                                        : "border-green-600 bg-green-600/8 text-green-600 dark:border-green-400 dark:bg-green-400/8 dark:text-green-400"
                                )}>
                                    ~20% off
                                </span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Slider (desktop only — mobile uses fixed bottom bar) */}
                    <div className="hidden lg:block w-full max-w-md space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground">
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
                                setPricingParams({ tier: v });
                            }}
                            min={0}
                            max={PRICING_TIERS.length - 1}
                            step={1}
                            tooltipRender={(val) => {
                                const photos = PRICING_TIERS[val].photos;
                                return photos === 0
                                    ? "0-10 photos"
                                    : `${formatPhotos(photos)} photos`;
                            }}
                        />
                        {/* Tick labels */}
                        <span className="flex w-full items-center justify-between gap-1 px-2.5 text-xs text-muted-foreground tabular-nums">
                            {PRICING_TIERS.map((tier, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setPricingParams({ tier: i })}
                                    className={cn(
                                        "flex w-0 flex-col items-center justify-center gap-2 cursor-pointer",
                                        i === sliderIndex
                                            ? "text-foreground font-medium"
                                            : "hover:text-foreground/70"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "h-1 w-px",
                                            i === sliderIndex
                                                ? "bg-foreground"
                                                : "bg-muted-foreground/70"
                                        )}
                                    />
                                    <span>
                                        {formatTickLabel(tier.photos)}
                                    </span>
                                </button>
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
                        "flex flex-col px-6 py-8 md:p-10 transition-colors",
                        isFreeSelected && "bg-accent/50 ring-2 ring-inset ring-primary"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold shrink-0">{freePlan.name}</h3>
                        {isFreeSelected && (
                            <div className="lg:hidden flex flex-wrap justify-end gap-2 ml-auto">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    <SparklesIcon className="size-3" />
                                    Recommended
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 mb-6">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-semibold tracking-tight">
                                $0
                            </span>
                            <span className="text-sm text-muted-foreground">
                                /month
                            </span>
                        </div>
                        <TypographyMuted className="mt-1">
                            10 photos / month for free
                        </TypographyMuted>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={[
                        `Buy extra credits at $${EXTRA_CREDIT_RATE.toFixed(2)} each`,
                        "Unlimited uploads",
                        "Only pay for downloads",
                    ]} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<Link href={freePlan.href} />}
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
                        "relative flex flex-col px-6 py-8 md:p-10 transition-colors",
                        isProSelected && "bg-accent/50 ring-2 ring-inset ring-primary"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold shrink-0">{proPlan.name}</h3>
                        <div className="flex flex-wrap justify-end gap-2 ml-auto">
                            {isProSelected && (
                                <span className="lg:hidden inline-flex items-center gap-1.5 whitespace-nowrap border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    <SparklesIcon className="size-3" />
                                    Recommended
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                <FlameIcon className="size-3" />
                                Most Popular
                            </span>
                        </div>
                    </div>
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
                        <TypographyMuted className="mt-1">
                            <NumberTicker
                                value={proTier.photos}
                                className="text-sm text-muted-foreground"
                            />{" "}
                            photos / month
                        </TypographyMuted>
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
                                        ? "text-green-700 dark:text-green-500"
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
                                            ? "text-green-700 dark:text-green-500"
                                            : "text-muted-foreground"
                                    )}
                                />{" "}
                                / photo
                            </span>
                        </div>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={[
                        `Buy extra credits at $${proPerPhoto.toFixed(2)} each`,
                        "Unlimited uploads",
                        "Only pay for downloads",
                        ...proTier.features,
                    ]} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<Link href={proPlan.href} />}
                            variant={isProSelected ? "default" : "outline"}
                            className="w-full"
                        >
                            {isYearly ? "Get Yearly" : "Get Monthly"}
                        </Button>
                    </div>
                </div>

                {/* Enterprise */}
                <div
                    className={cn(
                        "flex flex-col px-6 py-8 md:p-10 transition-colors",
                        isEnterpriseSelected && "bg-accent/50 ring-2 ring-inset ring-primary"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold shrink-0">{enterprisePlan.name}</h3>
                        {isEnterpriseSelected && (
                            <div className="lg:hidden flex flex-wrap justify-end gap-2 ml-auto">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    <SparklesIcon className="size-3" />
                                    Recommended
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 mb-6">
                        {/* Photos count */}
                        <TypographyMuted>
                            <NumberTicker
                                value={enterpriseTier.photos}
                                className="text-sm text-muted-foreground"
                            />{" "}
                            photos / month
                        </TypographyMuted>
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
                                        ? "text-green-700 dark:text-green-500"
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
                                            ? "text-green-700 dark:text-green-500"
                                            : "text-muted-foreground"
                                    )}
                                />{" "}
                                / photo
                            </span>
                        </div>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={[
                        `Buy extra credits at $${entPerPhoto.toFixed(2)} each`,
                        "Unlimited uploads",
                        "Only pay for downloads",
                        ...enterpriseTier.features,
                    ]} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<Link href={enterprisePlan.href} />}
                            variant={
                                isEnterpriseSelected ? "default" : "outline"
                            }
                            className="w-full"
                        >
                            {enterprisePlan.buttonText}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile: Fixed bottom bar */}
            <Card className="fixed bottom-0 left-0 right-0 z-40 border-x-0 border-b-0 py-4 lg:hidden select-none">
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                            {currentTier.photos === 0
                                ? "Free · 10 photos"
                                : `${formatPhotos(currentTier.photos)} photos / mo`}
                        </span>
                        <div className="flex flex-col items-end gap-0.5">
                            <span className="font-semibold tabular-nums">
                                {currentTier.photos === 0
                                    ? "$0"
                                    : `$${(isYearly ? currentTier.yearlyMonthly : currentTier.monthly).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                <span className="text-muted-foreground font-normal">
                                    {" "}
                                    /mo
                                </span>
                            </span>
                            {currentTier.photos > 0 && (
                                <span className="flex items-center gap-1 text-xs tabular-nums">
                                    {isYearly && (
                                        <span className="text-muted-foreground line-through">
                                            ${currentTier.perPhoto.toFixed(2)}
                                        </span>
                                    )}
                                    <span className={cn(isYearly ? "text-green-700 dark:text-green-500" : "text-muted-foreground")}>
                                        ${(isYearly ? currentTier.yearlyPerPhoto : currentTier.perPhoto).toFixed(2)} / photo
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                    <Tabs
                        value={billing}
                        onValueChange={(v) =>
                            setPricingParams({ billing: v as BillingPeriod })
                        }
                    >
                        <TabsList className="w-full">
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="yearly" className="gap-1.5">
                                Yearly
                                <span className={cn(
                                    "border px-1.5 py-0.5 text-[10px] font-medium",
                                    isYearly
                                        ? "border-green-700 bg-green-700/8 text-green-700"
                                        : "border-green-600 bg-green-600/8 text-green-600 dark:border-green-400 dark:bg-green-400/8 dark:text-green-400"
                                )}>
                                    ~20% off
                                </span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Slider
                        value={[sliderIndex]}
                        onValueChange={(val) => {
                            const v = Array.isArray(val)
                                ? val[0]
                                : val;
                            setPricingParams({ tier: v });
                        }}
                        min={0}
                        max={PRICING_TIERS.length - 1}
                        step={1}
                        tooltipRender={(val) => {
                            const photos = PRICING_TIERS[val].photos;
                            return photos === 0
                                ? "0-10 photos"
                                : `${formatPhotos(photos)} photos`;
                        }}
                    />
                    {/* Tick labels */}
                    <span className="flex w-full items-center justify-between gap-1 px-2.5 text-xs text-muted-foreground tabular-nums">
                        {PRICING_TIERS.map((tier, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setPricingParams({ tier: i })}
                                className={cn(
                                    "flex w-0 flex-col items-center justify-center gap-2 cursor-pointer",
                                    i === sliderIndex
                                        ? "text-foreground font-medium"
                                        : "hover:text-foreground/70"
                                )}
                            >
                                <span
                                    className={cn(
                                        "h-1 w-px",
                                        i === sliderIndex
                                            ? "bg-foreground"
                                            : "bg-muted-foreground/70"
                                    )}
                                />
                                <span>
                                    {formatTickLabel(tier.photos)}
                                </span>
                            </button>
                        ))}
                    </span>
                </CardContent>
            </Card>
        </section>
    );
}

function FeatureList({
    features,
    prefix,
}: {
    features: string[] | readonly string[];
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
