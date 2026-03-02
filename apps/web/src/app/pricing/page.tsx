import type { Metadata } from "next";
import { PricingSection } from "@/components/section/pricing-section";
import { Footer } from "@/components/section/footer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Only pay for what you download. Simple, transparent pricing for real estate photo editing.",
};

export default function PricingPage() {
  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <PricingSection />
      <Footer />
    </main>
  );
}
