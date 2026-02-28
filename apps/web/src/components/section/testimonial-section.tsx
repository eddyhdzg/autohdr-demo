import { TestimonialCarousel } from "@/components/animations/testimonial-scroll";
import { siteConfig } from "@/lib/config";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";

export function TestimonialSection() {
    const { testimonialSection } = siteConfig;

    return (
        <section
            id="testimonials"
            className="flex flex-col items-center justify-center w-full"
        >
            <div className="w-full h-full p-6 md:px-24 md:pt-24 md:pb-8">
                <div className="max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
                    <TypographyH2 className="text-center">
                        {testimonialSection.title}
                    </TypographyH2>
                    <TypographyP className="text-center mx-auto">
                        {testimonialSection.description}
                    </TypographyP>
                </div>
            </div>
            <TestimonialCarousel testimonials={testimonialSection.testimonials} />
        </section>
    );
}
