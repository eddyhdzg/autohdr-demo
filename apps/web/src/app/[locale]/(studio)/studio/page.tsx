import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { StudioHeroSection } from "@/components/studio/studio-hero-section";
import { StudioContent } from "@/components/studio/studio-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Studio" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-5xl min-h-svh">
      <StudioHeroSection />
      <StudioContent />
    </main>
  );
}
