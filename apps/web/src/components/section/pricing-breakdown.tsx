"use client";

import { useQueryStates } from "nuqs";
import { useTranslations } from "next-intl";
import { pricingSearchParams } from "@/lib/pricing-searchparams";
import { EXTRA_CREDIT_RATE, PRICING_TIERS, type PricingTier } from "@/lib/consts";
import { cn } from "@workspace/ui/lib/utils";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { Check } from "lucide-react";

const FEATURE_ROWS = [
    { labelKey: "priorityProcessing", key: "priority" },
    { labelKey: "creditsRollOver", key: "Unused credits roll over" },
    { labelKey: "autoTvBlackout", key: "Auto TV Blackout" },
    { labelKey: "autoAddFire", key: "Auto Add Fire" },
    { labelKey: "walkthroughReordering", key: "Walkthrough Re-ordering" },
    { labelKey: "dedicatedSlack", key: "Dedicated Slack Channel" },
] as const;

function formatColumnHeader(tier: PricingTier, freeLabel: string): string {
    if (tier.photos === 0) return freeLabel;
    const photosLabel =
        tier.photos >= 1000
            ? `${(tier.photos / 1000).toLocaleString("en-US")}K`
            : tier.photos.toLocaleString("en-US");
    if (!tier.tier) return photosLabel;
    const abbrev = tier.tier === "Standard" ? "Std" : tier.tier;
    return `${photosLabel} (${abbrev})`;
}

function formatPrice(value: number): string {
    if (value === 0) return "$0";
    return `$${value.toLocaleString("en-US")}`;
}

function hasFeature(tier: PricingTier, key: string): boolean {
    if (key === "priority") return tier.photos > 0;
    return (tier.features as readonly string[]).includes(key);
}

const stickyLabelCell =
    "sticky left-0 z-[1] group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 transition-colors font-medium text-sm whitespace-nowrap min-w-[180px]";

const groupHeaderCell =
    "bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

const stripe = "bg-neutral-50 dark:bg-[#101010]";
const dataRow = "group border-0 hover:bg-neutral-200 dark:hover:bg-neutral-800";
const dataRowStriped = `${dataRow} ${stripe}`;

const selectedSides =
    "shadow-[inset_2px_0_var(--color-primary),inset_-2px_0_var(--color-primary)]";
const selectedTop =
    "shadow-[inset_2px_0_var(--color-primary),inset_-2px_0_var(--color-primary),inset_0_2px_var(--color-primary)]";
const selectedBottom =
    "shadow-[inset_2px_0_var(--color-primary),inset_-2px_0_var(--color-primary),inset_0_-2px_var(--color-primary)]";

export function PricingBreakdownTable() {
    const [{ billing, tier }] = useQueryStates(pricingSearchParams);
    const t = useTranslations("PricingBreakdown");
    const tCommon = useTranslations("Common");
    const isYearly = billing === "yearly";

    return (
        <section id="pricing-breakdown" className="relative w-full">
            <CornerPlus
                position="top-left"
                className="text-muted-foreground/50"
            />
            <CornerPlus
                position="top-right"
                className="text-muted-foreground/50"
            />
            <div className="px-4 py-8 lg:p-16">
                <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-4 mb-8 md:mb-12">
                    <TypographyH2>{t("title")}</TypographyH2>
                    <TypographyP>
                        {t("description")}
                    </TypographyP>
                </div>

                <ScrollArea className="w-full" orientation="horizontal">
                    <table className="w-full caption-bottom text-sm">
                    <TableHeader className="[&_tr]:border-0">
                        <TableRow className="hover:bg-transparent border-0">
                            <TableHead
                                className={`${stickyLabelCell} bg-background`}
                            />
                            {PRICING_TIERS.map((tierData, i) => (
                                <TableHead
                                    key={tierData.photos}
                                    className={cn(
                                        "text-center min-w-[100px] font-semibold text-foreground",
                                        i === tier && `${selectedTop} text-primary`
                                    )}
                                >
                                    {formatColumnHeader(tierData, t("columnFree"))}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {/* ── Pricing group ── */}
                        <TableRow className="hover:bg-transparent border-0">
                            <TableCell
                                className={cn(stickyLabelCell, groupHeaderCell)}
                            >
                                {tCommon("pricing")}
                            </TableCell>
                            {PRICING_TIERS.map((tierData, i) => (
                                <TableCell
                                    key={tierData.photos}
                                    className={cn(
                                        "bg-neutral-100 dark:bg-neutral-800",
                                        i === tier && selectedSides
                                    )}
                                />
                            ))}
                        </TableRow>

                        {/* Price */}
                        <TableRow className={dataRow}>
                            <TableCell className={cn(stickyLabelCell, "bg-background")}>
                                {t("price")}
                            </TableCell>
                            {PRICING_TIERS.map((tierData, i) => (
                                <TableCell
                                    key={tierData.photos}
                                    className={cn(
                                        "text-center tabular-nums",
                                        i === tier && selectedSides
                                    )}
                                >
                                    {tierData.photos === 0 ? (
                                        isYearly ? "—" : "$0"
                                    ) : (
                                        <>
                                            {formatPrice(
                                                isYearly
                                                    ? tierData.yearlyMonthly
                                                    : tierData.monthly
                                            )}
                                            <span className="text-muted-foreground text-xs">
                                                {" "}{tCommon("perMo")}
                                            </span>
                                        </>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* Per photo */}
                        <TableRow className={dataRowStriped}>
                            <TableCell className={cn(stickyLabelCell, stripe)}>
                                {t("perPhoto")}
                            </TableCell>
                            {PRICING_TIERS.map((tierData, i) => (
                                <TableCell
                                    key={tierData.photos}
                                    className={cn(
                                        "text-center tabular-nums",
                                        i === tier && selectedSides
                                    )}
                                >
                                    {tierData.photos === 0 ? (
                                        <span>
                                            ${EXTRA_CREDIT_RATE.toFixed(2)}
                                            <sup>*</sup>
                                        </span>
                                    ) : isYearly ? (
                                        <span className="flex flex-col items-center gap-0.5">
                                            <span className="text-muted-foreground line-through text-xs">
                                                ${tierData.perPhoto.toFixed(2)}
                                            </span>
                                            <span className="text-green-700 dark:text-green-400">
                                                ${tierData.yearlyPerPhoto.toFixed(2)}
                                            </span>
                                        </span>
                                    ) : (
                                        `$${tierData.perPhoto.toFixed(2)}`
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* ── Features group ── */}
                        <TableRow className="hover:bg-transparent border-0">
                            <TableCell
                                className={cn(stickyLabelCell, groupHeaderCell)}
                            >
                                {tCommon("features")}
                            </TableCell>
                            {PRICING_TIERS.map((tierData, i) => (
                                <TableCell
                                    key={tierData.photos}
                                    className={cn(
                                        "bg-neutral-100 dark:bg-neutral-800",
                                        i === tier && selectedSides
                                    )}
                                />
                            ))}
                        </TableRow>

                        {FEATURE_ROWS.map((row, rowIdx) => {
                            const isStriped = rowIdx % 2 !== 0;
                            return (
                            <TableRow key={row.key} className={isStriped ? dataRowStriped : dataRow}>
                                <TableCell className={cn(stickyLabelCell, isStriped ? stripe : "bg-background")}>
                                    {t(row.labelKey)}
                                </TableCell>
                                {PRICING_TIERS.map((tierData, i) => (
                                    <TableCell
                                        key={tierData.photos}
                                        className={cn(
                                            "text-center",
                                            i === tier && (rowIdx === FEATURE_ROWS.length - 1 ? selectedBottom : selectedSides)
                                        )}
                                    >
                                        {hasFeature(tierData, row.key) ? (
                                            <Check className="mx-auto size-4 text-green-700 dark:text-green-400" />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </table>
                </ScrollArea>

                <p className="text-xs text-muted-foreground mt-4">
                    {t("payAsYouGoNote", { rate: EXTRA_CREDIT_RATE.toFixed(2) })}
                </p>
            </div>
        </section>
    );
}
