import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Button } from "@workspace/ui/components/button";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function FAQSection() {
    const { faqSection } = siteConfig;

    return (
        <section id="faqs" className="w-full relative">
            <CornerPlus position="top-left" className="text-muted-foreground/50" />
            <CornerPlus position="top-right" className="text-muted-foreground/50" />
            <div className="mx-auto">
                <div className="grid md:grid-cols-6 md:divide-x divide-border">
                    <div className="md:col-span-2 flex flex-col gap-4 p-8 md:p-12">
                        <TypographyH2 className="text-left">
                            {faqSection.title}
                        </TypographyH2>
                        <TypographyP className="text-left">
                            {faqSection.description}
                        </TypographyP>
                    </div>

                    <div className="md:col-span-4 w-full p-8 md:p-12">
                        <Accordion className="w-full">
                            {faqSection.faQitems.map((faq, index) => (
                                <AccordionItem
                                    key={faq.id}
                                    value={index.toString()}
                                    className="border-b border-border py-4 first:pt-0"
                                >
                                    <AccordionTrigger className="text-left no-underline hover:no-underline py-0 text-base">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground pt-4 pb-0">
                                        <p className="leading-relaxed">{faq.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        {faqSection.faqLink && (
                            <div className="pt-6">
                                <Button
                                    render={
                                        <a
                                            href={faqSection.faqLink.href}
                                        />
                                    }
                                    variant="outline"
                                    size="sm"
                                >
                                    {faqSection.faqLink.text}
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
