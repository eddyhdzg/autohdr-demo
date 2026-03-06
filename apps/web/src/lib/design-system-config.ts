export const designSystemConfig = {
  neutralScale: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  semanticColors: ["primary", "secondary", "accent"],
  baseColors: [
    { label: "White", className: "bg-white" },
    { label: "Black", className: "bg-black" },
  ],
  buttonVariants: [
    "default",
    "outline",
    "secondary",
    "ghost",
    "destructive",
    "link",
    "on-dark",
    "on-light",
  ],
  buttonSizes: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
} as const;
