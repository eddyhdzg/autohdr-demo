import { TestimonialCarousel } from "@/components/animations/testimonial-scroll";
import { siteConfig } from "@/lib/config";

export function TestimonialSection() {
    const { testimonialSection } = siteConfig;

    return (
        <section
            id="testimonials"
            className="flex flex-col items-center justify-center w-full"
        >
            <div className="w-full h-full p-6 md:px-24 md:pt-24 md:pb-8">
                <div className="max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-center text-balance">
                        {testimonialSection.title}
                    </h2>
                    <p className="text-muted-foreground text-center text-balance mx-auto text-sm md:text-base font-medium">
                        {testimonialSection.description}
                    </p>
                </div>
            </div>
            <TestimonialCarousel testimonials={testimonialSection.testimonials} />
        </section>
    );
}
