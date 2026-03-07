import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2 } from "@workspace/ui/components/typography";
import { FAQsHeroSection } from "@/components/faqs/faqs-hero-section";
import { FAQsToc } from "@/components/faqs/faqs-toc";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const FAQ_CATEGORIES = [
  { key: "general", count: 5 },
  { key: "uploading", count: 4 },
  { key: "shootingSettings", count: 1 },
  { key: "team", count: 3 },
  { key: "editing", count: 2 },
  { key: "style", count: 1 },
  { key: "pricing", count: 5 },
  { key: "integration", count: 3 },
  { key: "support", count: 1 },
] as const;

export default async function FAQsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "FAQsPage" });

  const sections = FAQ_CATEGORIES.map((category) => ({
    key: category.key,
    title: t(`${category.key}.title`),
    items: Array.from({ length: category.count }, (_, i) => ({
      id: i + 1,
      question: t(`${category.key}.items.${i + 1}.question`),
      answer: t(`${category.key}.items.${i + 1}.answer`),
    })),
  }));

  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <FAQsHeroSection />
      <section className="w-full relative">
        <CornerPlus position="top-left" className="text-muted-foreground/50" />
        <CornerPlus position="top-right" className="text-muted-foreground/50" />
        <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 xl:max-w-6xl grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-12">
          <div className="space-y-16 max-w-4xl">
            {sections.map((section, sectionIndex) => (
              <div key={section.key} id={section.key}>
                <Link href={`#${section.key}`} className="no-underline hover:no-underline">
                  <TypographyH2 className="text-left mb-6 text-2xl md:text-3xl lg:text-4xl">
                    {sectionIndex + 1}. {section.title}
                  </TypographyH2>
                </Link>
                <Accordion className="w-full" multiple defaultValue={[`${section.key}-0`]}>
                  {section.items.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={`${section.key}-${index}`}
                      id={`${section.key}-${index}`}
                      className="border-b border-border py-4 first:pt-0"
                    >
                      <AccordionTrigger className="text-left no-underline hover:no-underline py-0 text-base">
                        {sectionIndex + 1}.{index + 1} {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-4 pb-0">
                        <p className="leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          <FAQsToc sections={sections.map((s, i) => ({ key: s.key, title: `${i + 1}. ${s.title}` }))} />
        </div>
      </section>
    </main>
  );
}
