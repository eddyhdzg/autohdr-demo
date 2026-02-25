import { cn } from "@workspace/ui/lib/utils";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { brandConfig } from "@/lib/brand-config";

function NamingExample({
  label,
  variant,
}: {
  label: string;
  variant: "correct" | "incorrect";
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "text-xs font-medium px-2 py-0.5 shrink-0",
          variant === "correct"
            ? "bg-success/10 text-success"
            : "bg-destructive/10 text-destructive"
        )}
      >
        {variant === "correct" ? "Correct" : "Incorrect"}
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
      <div className="p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
          Naming
        </h2>
        <p className="text-muted-foreground mt-2">
          Please follow these guidelines when referencing AutoHDR.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Preferred</h3>
          <div className="flex flex-col gap-3">
            {naming.correct.map((name) => (
              <NamingExample key={name} label={name} variant="correct" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            When constrained (all caps or all lowercase)
          </h3>
          <div className="flex flex-col gap-3">
            {naming.constrained.map((name) => (
              <NamingExample key={name} label={name} variant="correct" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Incorrect</h3>
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
