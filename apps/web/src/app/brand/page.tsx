import type { Metadata } from "next";
import { BrandHeroSection } from "@/components/brand/brand-hero-section";
import { BrandNamingSection } from "@/components/brand/brand-naming-section";
import { BrandLogoSection } from "@/components/brand/brand-logo-section";
import { BrandSymbolSection } from "@/components/brand/brand-symbol-section";
import { Footer } from "@/components/section/footer";

export const metadata: Metadata = {
  title: "Brand Kit",
  description:
    "Guidelines and assets for presenting the AutoHDR brand consistently.",
};

export default function BrandPage() {
  return (
    <main className="flex flex-col divide-y divide-border pt-16">
      <BrandHeroSection />
      <BrandNamingSection />
      <BrandLogoSection />
      <BrandSymbolSection />
      <Footer />
    </main>
  );
}
