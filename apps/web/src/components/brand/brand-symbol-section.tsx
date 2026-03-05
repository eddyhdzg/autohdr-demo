import { useTranslations } from "next-intl";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { BrandAssetCard } from "./brand-asset-card";
import { brandConfig } from "@/lib/brand-config";

export function BrandSymbolSection() {
  const t = useTranslations("Brand");

  return (
    <section className="relative">
      <CornerPlus position="top-left" className="text-muted-foreground/50" />
      <CornerPlus position="top-right" className="text-muted-foreground/50" />
      <div className="px-6 py-8 md:p-12">
        <TypographyH2>{t("symbol.title")}</TypographyH2>
        <TypographyP className="mt-2">
          {t("symbol.description")}
        </TypographyP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {brandConfig.symbolAssets.map((asset) => (
          <BrandAssetCard
            key={asset.labelKey}
            labelKey={asset.labelKey}
            altKey={asset.altKey}
            variant={asset.variant}
            svgPath={asset.svgPath}
            pngPath={asset.pngPath}
            namespace="symbol"
          />
        ))}
      </div>
    </section>
  );
}
