import { useTranslations } from "next-intl";
import {
    TypographyH1,
    TypographyLead,
} from "@workspace/ui/components/typography";

export function FAQsHeroSection() {
    const t = useTranslations("FAQsPage");

    return (
        <section className="relative flex flex-col items-center justify-center px-6 py-16 md:py-24">
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
                <TypographyH1>{t("hero.title")}</TypographyH1>
                <TypographyLead className="text-center text-balance max-w-2xl mx-auto">
                    {t("hero.description")}
                </TypographyLead>
            </div>
        </section>
    );
}
