import { useTranslations } from "next-intl";
import {
  TypographyH1,
  TypographyLead,
} from "@workspace/ui/components/typography";

export function DesignSystemHeroSection() {
  const t = useTranslations("DesignSystem");

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-16 md:py-24">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
        <TypographyH1>{t("hero.title")}</TypographyH1>
        <TypographyLead className="text-center text-balance max-w-2xl mx-auto">
          {t("hero.description")}
        </TypographyLead>
      </div>
    </section>
  );
}
