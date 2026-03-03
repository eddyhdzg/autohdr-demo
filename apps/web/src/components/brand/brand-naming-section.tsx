import { getTranslations } from "next-intl/server";
import { cn } from "@workspace/ui/lib/utils";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyH3, TypographyP } from "@workspace/ui/components/typography";
import { brandConfig } from "@/lib/brand-config";

function NamingExample({
  label,
  variant,
  variantLabel,
}: {
  label: string;
  variant: "correct" | "incorrect" | "warning";
  variantLabel: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "text-xs font-medium px-2 py-0.5 shrink-0",
          variant === "correct" && "bg-success/10 text-success",
          variant === "warning" && "bg-warning/10 text-warning",
          variant === "incorrect" && "bg-destructive/10 text-destructive"
        )}
      >
        {variantLabel}
      </span>
      <span className="font-mono text-sm">{label}</span>
    </div>
  );
}

export async function BrandNamingSection() {
  const t = await getTranslations("Brand");
  const { naming } = brandConfig;

  return (
    <section className="relative">
      <CornerPlus position="top-left" className="text-muted-foreground/50" />
      <CornerPlus position="top-right" className="text-muted-foreground/50" />
      <div className="px-6 py-8 md:p-12 space-y-8">
        <div>
          <TypographyH2>{t("naming.title")}</TypographyH2>
          <TypographyP className="mt-2">
            {t("naming.description")}
          </TypographyP>
        </div>

        <div className="space-y-4">
          <TypographyH3>{t("naming.preferred")}</TypographyH3>
          <div className="flex flex-col gap-3">
            {naming.correct.map((name) => (
              <NamingExample key={name} label={name} variant="correct" variantLabel={t("naming.variantCorrect")} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <TypographyH3>
            {t("naming.constrained")}
          </TypographyH3>
          <div className="flex flex-col gap-3">
            {naming.constrained.map((name) => (
              <NamingExample key={name} label={name} variant="warning" variantLabel={t("naming.variantAccepted")} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <TypographyH3>{t("naming.incorrect")}</TypographyH3>
          <div className="flex flex-col gap-3">
            {naming.incorrect.map((name) => (
              <NamingExample key={name} label={name} variant="incorrect" variantLabel={t("naming.variantIncorrect")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
