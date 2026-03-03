import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { pricingSearchParamsCache } from "@/lib/pricing-searchparams-cache";
import { PricingSection } from "@/components/section/pricing-section";
import { PricingBreakdownTable } from "@/components/section/pricing-breakdown";
import { FAQSection } from "@/components/section/faq-section";
import { CTASection } from "@/components/section/cta-section";
import { Footer } from "@/components/section/footer";

const pricingFaqItems = [
  {
    id: 1,
    question: "How much does AutoHDR cost?",
    answer:
      "$0.40\u20130.57 per photo, depending on volume. You only pay for photos you download \u2014 uploading and previewing are always free.",
  },
  {
    id: 2,
    question: "How does billing work?",
    answer:
      "Monthly subscriptions include a set number of credits. One credit = one downloaded photo. On paid plans, unused credits roll over month-to-month. You can also pay yearly and save on every tier.",
  },
  {
    id: 3,
    question: "When am I charged a credit?",
    answer:
      "Only when you click Download. Uploading and previewing are always free.",
  },
  {
    id: 4,
    question: "What happens if I exceed my plan\u2019s credits?",
    answer:
      "You can buy extra credits at your plan\u2019s per-photo rate at any time. There\u2019s no need to upgrade to a higher plan \u2014 just top up and keep going.",
  },
  {
    id: 5,
    question: "Do unused credits expire?",
    answer:
      "On paid plans, unused credits roll over month-to-month \u2014 they never expire as long as you stay on a paid plan. Free plan credits reset each month.",
  },
  {
    id: 6,
    question: "Can I downgrade and keep my credits?",
    answer:
      "If you downgrade to a lower paid plan, your rollover credits carry over. However, if you cancel or downgrade to the Free plan, credits expire at the end of your current billing cycle.",
  },
  {
    id: 7,
    question: "Do you offer a free trial?",
    answer:
      "Yes! 10 free photo downloads per month, no credit card required.",
  },
  {
    id: 8,
    question: "How does yearly billing work?",
    answer:
      "Pay upfront for 12 months and save on every tier. For example, the Basic plan drops from $28.50/mo to $22.80/mo (a $5.70/mo savings). Higher tiers save even more.",
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Only pay for what you download. Simple, transparent pricing for real estate photo editing.",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function PricingPage({ searchParams }: PageProps) {
  await pricingSearchParamsCache.parse(searchParams);

  return (
    <main className="flex flex-col divide-y divide-border pt-16 pb-40 lg:pb-0">
      <Suspense>
        <PricingSection />
        <PricingBreakdownTable />
      </Suspense>
      <FAQSection
        title="Pricing FAQs"
        description="Common questions about plans, credits, and billing."
        items={pricingFaqItems}
      />
      <CTASection />
      <Footer />
    </main>
  );
}
