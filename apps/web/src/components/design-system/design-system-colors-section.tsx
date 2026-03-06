import { useTranslations } from "next-intl";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { designSystemConfig } from "@/lib/design-system-config";

const neutralBgClasses: Record<number, string> = {
  50: "bg-neutral-50",
  100: "bg-neutral-100",
  200: "bg-neutral-200",
  300: "bg-neutral-300",
  400: "bg-neutral-400",
  500: "bg-neutral-500",
  600: "bg-neutral-600",
  700: "bg-neutral-700",
  800: "bg-neutral-800",
  900: "bg-neutral-900",
  950: "bg-neutral-950",
};

const semanticBgClasses: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

export function DesignSystemColorsSection() {
  const t = useTranslations("DesignSystem");

  return (
    <section className="relative">
      <CornerPlus position="top-left" className="text-muted-foreground/50" />
      <CornerPlus position="top-right" className="text-muted-foreground/50" />
      <div className="px-6 py-8 md:p-12 space-y-8">
        <div>
          <TypographyH2>{t("colors.title")}</TypographyH2>
          <TypographyP className="mt-2">
            {t("colors.description")}
          </TypographyP>
        </div>

        {/* Neutral scale */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">{t("colors.neutral")}</p>
          <div className="flex flex-wrap gap-4">
            {designSystemConfig.neutralScale.map((step) => (
              <div key={step}>
                <div
                  className={`${neutralBgClasses[step]} size-12 md:size-16 border border-border/50`}
                />
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 text-center">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic colors */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">{t("colors.semantic")}</p>
          <div className="flex flex-wrap gap-4">
            {designSystemConfig.semanticColors.map((color) => (
              <div key={color}>
                <div
                  className={`${semanticBgClasses[color]} size-12 md:size-16 border border-border/50`}
                />
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 capitalize">
                  {color}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Base colors */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">{t("colors.base")}</p>
          <div className="flex flex-wrap gap-4">
            {designSystemConfig.baseColors.map((color) => (
              <div key={color.label}>
                <div
                  className={`${color.className} size-12 md:size-16 border border-border/50`}
                />
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5">
                  {color.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
