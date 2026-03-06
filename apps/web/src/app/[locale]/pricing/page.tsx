import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pricingSearchParamsCache } from "@/lib/pricing-searchparams-cache";
import { PricingSection, PricingController } from "@/components/section/pricing-section";
import { PricingBreakdownTable } from "@/components/section/pricing-breakdown";
import { FAQSection } from "@/components/section/faq-section";
import { CTASection } from "@/components/section/cta-section";
import { Footer } from "@/components/section/footer";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PricingPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  await pricingSearchParamsCache.parse(searchParams);

  const t = await getTranslations({ locale, namespace: "PricingFAQ" });
  const pricingFaqItems = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
    id,
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`),
  }));

  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <div className="relative">
        <PricingSection />
        <PricingBreakdownTable />
        <PricingController />
      </div>
      <FAQSection
        title={t("title")}
        description={t("description")}
        items={pricingFaqItems}
      />
      <CTASection />
      <Footer />
    </main>
  );
}
