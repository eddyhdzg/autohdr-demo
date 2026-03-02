import { CompanyShowcase } from "@/components/section/company-showcase";
import { CTASection } from "@/components/section/cta-section";
import { FAQSection } from "@/components/section/faq-section";
import { Footer } from "@/components/section/footer";
import { HeroSection } from "@/components/section/hero-section";
import { PricingSection } from "@/components/section/pricing-section";
import { TestimonialSection } from "@/components/section/testimonial-section";
import { USMapSection } from "@/components/section/us-map-section";

export default function Home() {
  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <HeroSection />
      <CompanyShowcase />
      <USMapSection />
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
