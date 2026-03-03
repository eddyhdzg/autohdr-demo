"use client";

import { useQueryStates } from "nuqs";
import { pricingSearchParams } from "@/lib/pricing-searchparams";
import { EXTRA_CREDIT_RATE, PRICING_TIERS, type PricingTier } from "@/lib/consts";
import { cn } from "@workspace/ui/lib/utils";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { Check } from "lucide-react";

const FEATURE_ROWS = [
    { label: "Priority processing", key: "priority" },
    { label: "Credits roll over", key: "Unused credits roll over" },
    { label: "Auto TV Blackout", key: "Auto TV Blackout" },
    { label: "Auto Add Fire", key: "Auto Add Fire" },
    { label: "Walkthrough re-ordering", key: "Walkthrough Re-ordering" },
    { label: "Dedicated Slack channel", key: "Dedicated Slack Channel" },
] as const;

function formatColumnHeader(tier: PricingTier): string {
    if (tier.photos === 0) return "Free";
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
    "sticky left-0 z-[1] bg-background group-hover:bg-muted transition-colors font-medium text-sm whitespace-nowrap min-w-[180px]";

const groupHeaderCell =
    "bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function PricingBreakdownTable() {
    const [{ billing, tier }] = useQueryStates(pricingSearchParams);
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
                    <TypographyH2>Compare Plans</TypographyH2>
                    <TypographyP>
                        All the details, side by side.
                    </TypographyP>
                </div>

                <ScrollArea className="w-full" orientation="horizontal">
                    <table className="w-full caption-bottom text-sm [&_tr]:border-0">
                    <TableHeader className="[&_tr]:border-b-0">
                        <TableRow className="hover:bg-transparent">
                            <TableHead
                                className={`${stickyLabelCell} bg-background`}
                            />
                            {PRICING_TIERS.map((t, i) => (
                                <TableHead
                                    key={t.photos}
                                    className={cn(
                                        "text-center min-w-[100px] font-semibold text-foreground",
                                        i === tier && "bg-accent text-primary"
                                    )}
                                >
                                    {formatColumnHeader(t)}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {/* ── Pricing group ── */}
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                className={cn(stickyLabelCell, groupHeaderCell)}
                            >
                                Pricing
                            </TableCell>
                            {PRICING_TIERS.map((t) => (
                                <TableCell
                                    key={t.photos}
                                    className="bg-muted"
                                />
                            ))}
                        </TableRow>

                        {/* Price */}
                        <TableRow className="group">
                            <TableCell className={stickyLabelCell}>
                                Price
                            </TableCell>
                            {PRICING_TIERS.map((t, i) => (
                                <TableCell
                                    key={t.photos}
                                    className={cn(
                                        "text-center tabular-nums",
                                        i === tier && "bg-accent"
                                    )}
                                >
                                    {t.photos === 0 ? (
                                        isYearly ? "—" : "$0"
                                    ) : (
                                        <>
                                            {formatPrice(
                                                isYearly
                                                    ? t.yearlyMonthly
                                                    : t.monthly
                                            )}
                                            <span className="text-muted-foreground text-xs">
                                                {" "}/mo
                                            </span>
                                        </>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* Per photo */}
                        <TableRow className="group">
                            <TableCell className={stickyLabelCell}>
                                Per photo
                            </TableCell>
                            {PRICING_TIERS.map((t, i) => (
                                <TableCell
                                    key={t.photos}
                                    className={cn(
                                        "text-center tabular-nums",
                                        i === tier && "bg-accent"
                                    )}
                                >
                                    {t.photos === 0 ? (
                                        <span>
                                            ${EXTRA_CREDIT_RATE.toFixed(2)}
                                            <sup>*</sup>
                                        </span>
                                    ) : isYearly ? (
                                        <span className="flex flex-col items-center gap-0.5">
                                            <span className="text-muted-foreground line-through text-xs">
                                                ${t.perPhoto.toFixed(2)}
                                            </span>
                                            <span className="text-green-700 dark:text-green-500">
                                                ${t.yearlyPerPhoto.toFixed(2)}
                                            </span>
                                        </span>
                                    ) : (
                                        `$${t.perPhoto.toFixed(2)}`
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* ── Features group ── */}
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                className={cn(stickyLabelCell, groupHeaderCell)}
                            >
                                Features
                            </TableCell>
                            {PRICING_TIERS.map((t) => (
                                <TableCell
                                    key={t.photos}
                                    className="bg-muted"
                                />
                            ))}
                        </TableRow>

                        {FEATURE_ROWS.map((row) => (
                            <TableRow key={row.key} className="group">
                                <TableCell className={stickyLabelCell}>
                                    {row.label}
                                </TableCell>
                                {PRICING_TIERS.map((t, i) => (
                                    <TableCell
                                        key={t.photos}
                                        className={cn(
                                            "text-center",
                                            i === tier && "bg-accent"
                                        )}
                                    >
                                        {hasFeature(t, row.key) ? (
                                            <Check className="mx-auto size-4 text-green-700 dark:text-green-500" />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    </table>
                </ScrollArea>

                <p className="text-xs text-muted-foreground mt-4">
                    * Pay-as-you-go rate. Additional photos on the Free plan
                    cost ${EXTRA_CREDIT_RATE.toFixed(2)} each.
                </p>
            </div>
        </section>
    );
}
