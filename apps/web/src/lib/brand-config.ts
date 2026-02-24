export type BrandAsset = {
  label: string;
  variant: "light" | "dark";
  svgPath: string;
  pngPath: string;
  alt: string;
};

export const brandConfig = {
  hero: {
    title: "Brand Kit",
    description:
      "Guidelines and assets for presenting the AutoHDR brand consistently.",
    downloadAllHref: "/brand.zip",
  },
  naming: {
    correct: ["AutoHDR"],
    constrained: ["autohdr", "AUTOHDR"],
    incorrect: ["autoHDR", "Auto HDR", "auto-hdr", "AutoHdr"],
  },
  logoAssets: [
    {
      label: "Logo - Light",
      variant: "light" as const,
      svgPath: "/brand/logo-black.svg",
      pngPath: "/brand/logo-black.png",
      alt: "AutoHDR logo in black",
    },
    {
      label: "Logo - Dark",
      variant: "dark" as const,
      svgPath: "/brand/logo-white.svg",
      pngPath: "/brand/logo-white.png",
      alt: "AutoHDR logo in white",
    },
  ],
  symbolAssets: [
    {
      label: "Symbol - Light",
      variant: "light" as const,
      svgPath: "/brand/symbol.svg",
      pngPath: "/brand/symbol.png",
      alt: "AutoHDR symbol on light background",
    },
    {
      label: "Symbol - Dark",
      variant: "dark" as const,
      svgPath: "/brand/symbol.svg",
      pngPath: "/brand/symbol.png",
      alt: "AutoHDR symbol on dark background",
    },
  ],
} as const;
