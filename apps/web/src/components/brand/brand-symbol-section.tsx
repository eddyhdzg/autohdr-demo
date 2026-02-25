import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { BrandAssetCard } from "./brand-asset-card";
import { brandConfig } from "@/lib/brand-config";

export function BrandSymbolSection() {
  return (
    <section className="relative">
      <CornerPlus position="top-left" className="text-muted-foreground/50" />
      <CornerPlus position="top-right" className="text-muted-foreground/50" />
      <div className="p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-balance">
          Symbol
        </h2>
        <p className="text-muted-foreground font-medium text-sm md:text-base text-balance mt-2">
          The AutoHDR symbol is the isometric mark used as a standalone icon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {brandConfig.symbolAssets.map((asset) => (
          <BrandAssetCard key={asset.label} {...asset} />
        ))}
      </div>
    </section>
  );
}
