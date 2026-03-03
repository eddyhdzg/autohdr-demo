import { parseAsStringLiteral, parseAsInteger } from "nuqs";

export const billingOptions = ["monthly", "yearly"] as const;
export type BillingPeriod = (typeof billingOptions)[number];

export const pricingSearchParams = {
  billing: parseAsStringLiteral(billingOptions).withDefault("monthly"),
  tier: parseAsInteger.withDefault(1),
};
