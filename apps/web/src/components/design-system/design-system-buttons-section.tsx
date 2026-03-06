import type { VariantProps } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { cn } from "@workspace/ui/lib/utils";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { Sun } from "lucide-react";
import { designSystemConfig } from "@/lib/design-system-config";

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

function VariantRow({
  variant,
}: {
  variant: ButtonVariant;
}) {
  const isOnDark = variant === "on-dark";
  const isOnLight = variant === "on-light";
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3",
        isOnDark && "bg-[oklch(0.145_0_0)] rounded-md",
        isOnLight && "bg-white rounded-md border border-border"
      )}
    >
      <span
        className={cn(
          "text-xs font-mono w-24 shrink-0",
          isOnDark && "text-white/70",
          isOnLight && "text-[oklch(0.145_0_0)]/70",
          !isOnDark && !isOnLight && "text-muted-foreground"
        )}
      >
        {variant}
      </span>
      <Button variant={variant}>
        {variant}
      </Button>
    </div>
  );
}

function isIconSize(size: string): boolean {
  return size === "icon" || size === "icon-sm" || size === "icon-lg";
}

export function DesignSystemButtonsSection() {
  const t = useTranslations("DesignSystem");

  return (
    <section className="relative">
      <CornerPlus position="top-left" className="text-muted-foreground/50" />
      <CornerPlus position="top-right" className="text-muted-foreground/50" />
      <div className="px-6 py-8 md:p-12 space-y-8">
        <div>
          <TypographyH2>{t("buttons.title")}</TypographyH2>
          <TypographyP className="mt-2">
            {t("buttons.description")}
          </TypographyP>
        </div>

        {/* Variants */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">{t("buttons.variants")}</p>
          <div className="space-y-1">
            {designSystemConfig.buttonVariants.map((variant) => (
              <VariantRow key={variant} variant={variant} />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">{t("buttons.sizes")}</p>
          <div className="flex items-end gap-6 flex-wrap">
            {designSystemConfig.buttonSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Button variant="default" size={size as ButtonSize}>
                  {isIconSize(size) ? (
                    <Sun className="size-4" />
                  ) : (
                    size
                  )}
                </Button>
                <span className="text-xs font-mono text-muted-foreground">
                  {size}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
