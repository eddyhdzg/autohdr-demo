import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

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
    <main className="flex min-h-svh items-center justify-center">
      <p className="text-muted-foreground">Studio — WIP</p>
    </main>
  );
}
