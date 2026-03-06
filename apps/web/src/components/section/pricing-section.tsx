"use client";

import { useQueryStates } from "nuqs";
import { useTranslations } from "next-intl";
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
import { SparklesIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

const { pricing } = siteConfig;

function formatPhotos(photos: number): string {
    return photos.toLocaleString("en-US");
}

function formatTickLabel(photos: number): string {
    if (photos >= 1000) return `${photos / 1000}K`;
    return String(photos);
}

const FEATURE_TRANSLATION_MAP: Record<string, string> = {
    "Unused credits roll over": "creditsRollOver",
    "Auto TV Blackout": "autoTvBlackout",
    "Auto Add Fire": "autoAddFire",
    "Walkthrough Re-ordering": "walkthroughReordering",
    "Dedicated Slack Channel": "dedicatedSlack",
    "Up to 10 photos / month": "upTo10Photos",
};

function PricingSlider({
    sliderIndex,
    onValueChange,
    tooltipRender,
}: {
    sliderIndex: number;
    onValueChange: (value: number) => void;
    tooltipRender: (val: number) => string;
}) {
    return (
        <>
            <Slider
                value={[sliderIndex]}
                onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    onValueChange(v);
                }}
                min={0}
                max={PRICING_TIERS.length - 1}
                step={1}
                tooltipRender={tooltipRender}
            />
            {/* Tick labels */}
            <span className="flex w-full items-center justify-between gap-1 px-2.5 text-xs text-muted-foreground tabular-nums">
                {PRICING_TIERS.map((tier, i) => (
                    <button
                        key={tier.photos}
                        type="button"
                        onClick={() => onValueChange(i)}
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
        </>
    );
}

export function PricingSection() {
    const [{ billing, tier }, setPricingParams] = useQueryStates(pricingSearchParams);
    const t = useTranslations("PricingSection");
    const tCommon = useTranslations("Common");
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

    const freePlan = pricing.pricingItems.find((p) => p.planKey === "free")!;
    const proPlan = pricing.pricingItems.find((p) => p.planKey === "pro")!;
    const enterprisePlan = pricing.pricingItems.find(
        (p) => p.planKey === "enterprise"
    )!;

    function translateFeature(feature: string): string {
        const key = FEATURE_TRANSLATION_MAP[feature];
        if (key) return t(`features.${key}`);
        return feature;
    }

    function tooltipRender(val: number): string {
        const photos = PRICING_TIERS[val].photos;
        return t("photosSliderTooltip", { count: formatPhotos(photos) });
    }

    return (
        <section id="pricing" className="relative w-full divide-y divide-border">
            {/* Header */}
            <div className="w-full px-6 py-8 md:p-16">
                <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
                    <TypographyH2>{t("title")}</TypographyH2>
                    <p className="text-lg text-muted-foreground text-balance">
                        {t("description")}
                    </p>
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
                        <h3 className="text-lg font-semibold shrink-0">{t("plans.free.name")}</h3>
                        {isFreeSelected && (
                            <div className="flex flex-wrap justify-end gap-2 ml-auto">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    <SparklesIcon className="size-3" />
                                    {tCommon("recommended")}
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
                                {tCommon("perMonth")}
                            </span>
                        </div>
                        <TypographyMuted className="mt-1">
                            {t("freePhotosLabel")}
                        </TypographyMuted>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={[
                        t("buyExtraCredits", { rate: EXTRA_CREDIT_RATE.toFixed(2) }),
                        t("unlimitedUploads"),
                        t("onlyPayDownloads"),
                    ]} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<Link href={freePlan.href} />}
                            variant={isFreeSelected ? "default" : "outline"}
                            className="w-full"
                        >
                            {t("plans.free.buttonText")}
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
                        <h3 className="text-lg font-semibold shrink-0">{t("plans.pro.name")}</h3>
                        {isProSelected && (
                            <div className="flex flex-wrap justify-end gap-2 ml-auto">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    <SparklesIcon className="size-3" />
                                    {tCommon("recommended")}
                                </span>
                            </div>
                        )}
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
                                {tCommon("perMonth")}
                            </span>
                        </div>
                        {/* Photos count */}
                        <TypographyMuted className="mt-1">
                            <NumberTicker
                                value={proTier.photos}
                                className="text-sm text-muted-foreground"
                            />{" "}
                            {t("photosPerMonthUnit")}
                        </TypographyMuted>
                        {/* Per photo */}
                        <div className="flex items-center gap-2 mt-1">
                            <span
                                className={cn(
                                    "text-sm",
                                    isYearly
                                        ? "text-green-700 dark:text-green-400"
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
                                            ? "text-green-700 dark:text-green-400"
                                            : "text-muted-foreground"
                                    )}
                                />{" "}
                                {tCommon("perPhoto")}
                            </span>
                            {isYearly && proTier.perPhoto > 0 && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ${proTier.perPhoto.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={[
                        t("buyExtraCredits", { rate: proPerPhoto.toFixed(2) }),
                        t("unlimitedUploads"),
                        t("onlyPayDownloads"),
                        ...proTier.features.map(translateFeature),
                    ]} />
                    <div className="mt-auto pt-8">
                        <Button
                            size="lg"
                            render={<Link href={proPlan.href} />}
                            variant={isProSelected ? "default" : "outline"}
                            className="w-full"
                        >
                            {isYearly ? t("getYearly") : t("getMonthly")}
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
                        <h3 className="text-lg font-semibold shrink-0">{t("plans.enterprise.name")}</h3>
                        {isEnterpriseSelected && (
                            <div className="flex flex-wrap justify-end gap-2 ml-auto">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    <SparklesIcon className="size-3" />
                                    {tCommon("recommended")}
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
                            {t("photosPerMonthUnit")}
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
                                {tCommon("perMonth")}
                            </span>
                        </div>
                        {/* Per photo */}
                        <div className="flex items-center gap-2 mt-1">
                            <span
                                className={cn(
                                    "text-sm",
                                    isYearly
                                        ? "text-green-700 dark:text-green-400"
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
                                            ? "text-green-700 dark:text-green-400"
                                            : "text-muted-foreground"
                                    )}
                                />{" "}
                                {tCommon("perPhoto")}
                            </span>
                            {isYearly && enterpriseTier.perPhoto > 0 && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ${enterpriseTier.perPhoto.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                    <hr className="border-border mb-6" />
                    <FeatureList features={[
                        t("buyExtraCredits", { rate: entPerPhoto.toFixed(2) }),
                        t("unlimitedUploads"),
                        t("onlyPayDownloads"),
                        ...enterpriseTier.features.map(translateFeature),
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
                            {t("plans.enterprise.buttonText")}
                        </Button>
                    </div>
                </div>
            </div>

        </section>
    );
}

export function PricingController() {
    const [{ billing, tier }, setPricingParams] = useQueryStates(pricingSearchParams);
    const t = useTranslations("PricingSection");
    const tCommon = useTranslations("Common");
    const isYearly = billing === "yearly";
    const sliderIndex = tier;
    const currentTier = PRICING_TIERS[sliderIndex];

    function tooltipRender(val: number): string {
        const photos = PRICING_TIERS[val].photos;
        return t("photosSliderTooltip", { count: formatPhotos(photos) });
    }

    return (
        <Card className="sticky bottom-2 z-40 py-4 my-8 select-none shadow-lg bg-card/40 backdrop-blur-3xl backdrop-saturate-200 max-w-lg w-[calc(100dvw-1rem)] ml-[50%] -translate-x-1/2">
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                        {currentTier.photos === 0
                            ? t("freeTierLabel")
                            : t("photosPerMo", { count: formatPhotos(currentTier.photos) })}
                    </span>
                    <div className="flex flex-col items-end gap-0.5">
                        <span className="font-semibold tabular-nums">
                            {currentTier.photos === 0
                                ? "$0"
                                : `$${(isYearly ? currentTier.yearlyMonthly : currentTier.monthly).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            <span className="text-muted-foreground font-normal">
                                {" "}
                                {tCommon("perMo")}
                            </span>
                        </span>
                        {currentTier.photos > 0 && (
                            <span className="flex items-center gap-1 text-xs tabular-nums">
                                <span className={cn(isYearly ? "text-green-700 dark:text-green-400" : "text-muted-foreground")}>
                                    ${(isYearly ? currentTier.yearlyPerPhoto : currentTier.perPhoto).toFixed(2)} {tCommon("perPhoto")}
                                </span>
                                {isYearly && (
                                    <span className="text-muted-foreground line-through">
                                        ${currentTier.perPhoto.toFixed(2)}
                                    </span>
                                )}
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
                        <TabsTrigger value="monthly">{tCommon("monthly")}</TabsTrigger>
                        <TabsTrigger value="yearly" className="gap-1.5">
                            {tCommon("yearly")}
                            <span className={cn(
                                "border px-1.5 py-0.5 text-[10px] font-medium",
                                isYearly
                                    ? "border-green-700 bg-green-700/8 text-green-700"
                                    : "border-green-600 bg-green-600/8 text-green-600 dark:border-green-400 dark:bg-green-400/8 dark:text-green-400"
                            )}>
                                {tCommon("yearlyDiscount")}
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <PricingSlider
                    sliderIndex={sliderIndex}
                    onValueChange={(v) => setPricingParams({ tier: v })}
                    tooltipRender={tooltipRender}
                />
            </CardContent>
        </Card>
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
                {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
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
