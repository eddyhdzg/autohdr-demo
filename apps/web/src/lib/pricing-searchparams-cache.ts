import {
  createSearchParamsCache,
  parseAsStringLiteral,
  parseAsInteger,
} from "nuqs/server";

export const pricingSearchParamsCache = createSearchParamsCache({
  billing: parseAsStringLiteral(["monthly", "yearly"] as const).withDefault(
    "monthly"
  ),
  tier: parseAsInteger.withDefault(1),
});
