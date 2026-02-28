import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { BrandAssetCard } from "./brand-asset-card";
import { brandConfig } from "@/lib/brand-config";

export function BrandLogoSection() {
  return (
    <section className="relative">
      <CornerPlus position="top-left" className="text-muted-foreground/50" />
      <CornerPlus position="top-right" className="text-muted-foreground/50" />
      <div className="p-8 md:p-12">
        <TypographyH2>Logo</TypographyH2>
        <TypographyP className="mt-2">
          The AutoHDR logo combines the symbol and wordmark.
        </TypographyP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {brandConfig.logoAssets.map((asset) => (
          <BrandAssetCard key={asset.label} {...asset} />
        ))}
      </div>
    </section>
  );
}
