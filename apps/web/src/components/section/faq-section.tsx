import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Button } from "@workspace/ui/components/button";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface FAQSectionProps {
    title: string;
    description: string;
    items: Array<{ id: number; question: string; answer: string }>;
    link?: { text: string; href: string } | null;
}

export function FAQSection({ title, description, items, link }: FAQSectionProps) {
    return (
        <section id="faqs" className="w-full relative">
            <CornerPlus position="top-left" className="text-muted-foreground/50" />
            <CornerPlus position="top-right" className="text-muted-foreground/50" />
            <div className="mx-auto">
                <div className="grid md:grid-cols-6 md:divide-x divide-border">
                    <div className="md:col-span-2 flex flex-col gap-4 px-6 py-8 md:p-12">
                        <TypographyH2 className="text-left">
                            {title}
                        </TypographyH2>
                        <TypographyP className="text-left">
                            {description}
                        </TypographyP>
                    </div>

                    <div className="md:col-span-4 w-full px-6 py-8 md:p-12">
                        <Accordion className="w-full">
                            {items.map((faq, index) => (
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
                        {link && (
                            <div className="pt-6">
                                <Button
                                    render={
                                        <Link
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    }
                                    variant="outline"
                                    size="sm"
                                >
                                    {link.text}
                                    <ArrowUpRight className="size-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
