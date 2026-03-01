import { cn } from "@workspace/ui/lib/utils";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { TypographyH2, TypographyH3, TypographyP } from "@workspace/ui/components/typography";
import { brandConfig } from "@/lib/brand-config";

function NamingExample({
  label,
  variant,
}: {
  label: string;
  variant: "correct" | "incorrect" | "warning";
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
        {variant === "incorrect" ? "Incorrect" : variant === "warning" ? "Accepted" : "Correct"}
      </span>
      <span className="font-mono text-sm">{label}</span>
    </div>
  );
}

export function BrandNamingSection() {
  const { naming } = brandConfig;

  return (
    <section className="relative">
      <CornerPlus position="top-left" className="text-muted-foreground/50" />
      <CornerPlus position="top-right" className="text-muted-foreground/50" />
      <div className="p-8 md:p-12 space-y-8">
        <div>
          <TypographyH2>Naming</TypographyH2>
          <TypographyP className="mt-2">
            Please follow these guidelines when referencing AutoHDR.
          </TypographyP>
        </div>

        <div className="space-y-4">
          <TypographyH3>Preferred</TypographyH3>
          <div className="flex flex-col gap-3">
            {naming.correct.map((name) => (
              <NamingExample key={name} label={name} variant="correct" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <TypographyH3>
            When constrained (all caps or all lowercase)
          </TypographyH3>
          <div className="flex flex-col gap-3">
            {naming.constrained.map((name) => (
              <NamingExample key={name} label={name} variant="warning" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <TypographyH3>Incorrect</TypographyH3>
          <div className="flex flex-col gap-3">
            {naming.incorrect.map((name) => (
              <NamingExample key={name} label={name} variant="incorrect" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
