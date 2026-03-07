import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BrandHeroSection } from "@/components/brand/brand-hero-section";
import { BrandNamingSection } from "@/components/brand/brand-naming-section";
import { BrandLogoSection } from "@/components/brand/brand-logo-section";
import { BrandSymbolSection } from "@/components/brand/brand-symbol-section";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Brand" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BrandPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <BrandHeroSection />
      <BrandNamingSection />
      <BrandLogoSection />
      <BrandSymbolSection />
    </main>
  );
}
