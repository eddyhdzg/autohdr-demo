import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { TypographyH1, TypographyLead } from "@workspace/ui/components/typography";
import { Download } from "lucide-react";
import { brandConfig } from "@/lib/brand-config";

export function BrandHeroSection() {
  const { hero } = brandConfig;

  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24">
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
        <Image
          src="/brand/symbol.svg"
          alt="AutoHDR symbol"
          width={64}
          height={64}
          className=""
        />
        <TypographyH1>{hero.title}</TypographyH1>
        <TypographyLead className="text-center text-balance max-w-2xl mx-auto">
          {hero.description}
        </TypographyLead>
        <Button
          render={<a href={hero.downloadAllHref} download />}
          size="lg"
          className="px-8 text-base"
        >
          <Download className="size-4" />
          Download all assets
        </Button>
      </div>
    </section>
  );
}
