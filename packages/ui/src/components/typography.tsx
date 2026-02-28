import * as React from "react";

import { cn } from "../lib/utils";

function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="typography-h1"
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance",
        className
      )}
      {...props}
    />
  );
}

function TypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="typography-h2"
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-balance",
        className
      )}
      {...props}
    />
  );
}

function TypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="typography-h3"
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function TypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="typography-h4"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function TypographyP({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-p"
      className={cn(
        "text-muted-foreground font-medium text-sm md:text-base text-balance",
        className
      )}
      {...props}
    />
  );
}

function TypographyLead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-lead"
      className={cn(
        "text-secondary-foreground/70 text-base md:text-lg",
        className
      )}
      {...props}
    />
  );
}

function TypographyMuted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-muted"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLead,
  TypographyMuted,
  TypographyP,
};
