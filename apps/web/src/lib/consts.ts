/**
 * AutoHDR Pricing Table
 *
 * Monthly and Yearly pricing per volume tier.
 * Yearly discount varies by tier (higher volume = lower additional discount).
 */

export const PRICING_TIERS = [
    //  photos | monthly  | $/photo | yearly/mo | yearly $/photo | tier name | features
    { photos: 0,     monthly: 0,       perPhoto: 0,    yearlyMonthly: 0,       yearlyPerPhoto: 0,    tier: "",             features: ["Up to 10 photos / month"] },
    { photos: 50,    monthly: 28.50,   perPhoto: 0.57, yearlyMonthly: 22.80,   yearlyPerPhoto: 0.46, tier: "Basic",        features: ["Unused credits roll over"] },
    { photos: 500,   monthly: 265.00,  perPhoto: 0.53, yearlyMonthly: 225.25,  yearlyPerPhoto: 0.45, tier: "Standard",     features: ["Unused credits roll over"] },
    { photos: 1000,  monthly: 500.00,  perPhoto: 0.50, yearlyMonthly: 440.00,  yearlyPerPhoto: 0.44, tier: "Pro", features: ["Unused credits roll over", "Auto TV Blackout", "Auto Add Fire"] },
    { photos: 2000,  monthly: 960.00,  perPhoto: 0.48, yearlyMonthly: 864.00,  yearlyPerPhoto: 0.43, tier: "",             features: ["Unused credits roll over", "Auto TV Blackout", "Auto Add Fire", "Walkthrough Re-ordering"] },
    { photos: 5000,  monthly: 2250.00, perPhoto: 0.45, yearlyMonthly: 2025.00, yearlyPerPhoto: 0.41, tier: "",             features: ["Unused credits roll over", "Auto TV Blackout", "Auto Add Fire", "Walkthrough Re-ordering", "Dedicated Slack Channel"] },
    { photos: 10000, monthly: 4000.00, perPhoto: 0.40, yearlyMonthly: 3600.00, yearlyPerPhoto: 0.36, tier: "",             features: ["Unused credits roll over", "Auto TV Blackout", "Auto Add Fire", "Walkthrough Re-ordering", "Dedicated Slack Channel"] },
] as const;

export type PricingTier = (typeof PRICING_TIERS)[number];

/**
 * Card selection thresholds:
 * - Free:       photos === 0
 * - Pro:        photos > 0 && photos <= 1000 (Basic / Standard / Pro)
 * - Enterprise: photos > 1000
 */
export const PRO_MAX_PHOTOS = 1000;
