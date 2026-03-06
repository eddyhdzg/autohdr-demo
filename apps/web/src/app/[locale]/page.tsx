import { setRequestLocale, getTranslations } from "next-intl/server";
import { CTASection } from "@/components/section/cta-section";
import { FAQSection } from "@/components/section/faq-section";
import { Footer } from "@/components/section/footer";
import { HeroSection } from "@/components/section/hero-section";
import { IntegrationsSection } from "@/components/section/integrations-section";
import { TestimonialSection } from "@/components/section/testimonial-section";
import { USMapSection } from "@/components/section/us-map-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "FAQ" });
  const faqItems = [1, 2, 3, 4, 5].map((id) => ({
    id,
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`),
  }));

  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <HeroSection />
      <TestimonialSection />
      <USMapSection />
      <IntegrationsSection />
      <FAQSection
        title={t("title")}
        description={t("description")}
        items={faqItems}
        link={{ text: t("seeAll"), href: "/faqs" }}
      />
      <CTASection />
      <Footer />
    </main>
  );
}
