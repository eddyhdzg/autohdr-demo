import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { DesignSystemHeroSection } from "@/components/design-system/design-system-hero-section";
import { DesignSystemColorsSection } from "@/components/design-system/design-system-colors-section";
import { DesignSystemButtonsSection } from "@/components/design-system/design-system-buttons-section";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DesignSystem" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function DesignPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <DesignSystemHeroSection />
      <DesignSystemColorsSection />
      <DesignSystemButtonsSection />
    </main>
  );
}
