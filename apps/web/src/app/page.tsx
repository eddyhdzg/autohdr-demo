import { CompanyShowcase } from "@/components/section/company-showcase";
import { CTASection } from "@/components/section/cta-section";
import { FAQSection } from "@/components/section/faq-section";
import { Footer } from "@/components/section/footer";
import { HeroSection } from "@/components/section/hero-section";
import { PricingCTA } from "@/components/section/pricing-cta";
import { TestimonialSection } from "@/components/section/testimonial-section";

export default function Home() {
  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <HeroSection />
      <CompanyShowcase />
      <PricingCTA />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
