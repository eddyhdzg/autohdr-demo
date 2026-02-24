import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { BrandAssetCard } from "./brand-asset-card";
import { brandConfig } from "@/lib/brand-config";

export function BrandLogoSection() {
  return (
    <section className="relative">
      <CornerPlus position="bottom-left" className="text-muted-foreground/50" />
      <CornerPlus position="bottom-right" className="text-muted-foreground/50" />
      <div className="p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
          Logo
        </h2>
        <p className="text-muted-foreground mt-2">
          The AutoHDR logo combines the symbol and wordmark.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {brandConfig.logoAssets.map((asset) => (
          <BrandAssetCard key={asset.label} {...asset} />
        ))}
      </div>
    </section>
  );
}
