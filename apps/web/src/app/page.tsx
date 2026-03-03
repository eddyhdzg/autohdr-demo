import { CTASection } from "@/components/section/cta-section";
import { FAQSection } from "@/components/section/faq-section";
import { Footer } from "@/components/section/footer";
import { HeroSection } from "@/components/section/hero-section";
import { IntegrationsSection } from "@/components/section/integrations-section";
import { TestimonialSection } from "@/components/section/testimonial-section";
import { USMapSection } from "@/components/section/us-map-section";

export default function Home() {
  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <HeroSection />
      <TestimonialSection />
      <USMapSection />
      <IntegrationsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
