import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance">
          {hero.title}
        </h1>
        <p className="text-secondary-foreground/70 text-center text-balance text-lg max-w-2xl mx-auto">
          {hero.description}
        </p>
        <Button
          render={<a href={hero.downloadAllHref} download />}
          size="lg"
          className="px-8 py-6 text-base font-medium"
        >
          <Download className="size-4" />
          Download all assets
        </Button>
      </div>
    </section>
  );
}
