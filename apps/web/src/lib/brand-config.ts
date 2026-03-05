export type BrandAsset = {
  labelKey: string;
  variant: "light" | "dark";
  svgPath: string;
  pngPath: string;
  altKey: string;
};

export const brandConfig = {
  hero: {
    downloadAllHref: "/brand.zip",
  },
  naming: {
    correct: ["AutoHDR"],
    constrained: ["autohdr", "AUTOHDR"],
    incorrect: ["autoHDR", "Auto HDR", "auto-hdr", "AutoHdr"],
  },
  logoAssets: [
    {
      labelKey: "logoLight",
      variant: "light" as const,
      svgPath: "/brand/logo-black.svg",
      pngPath: "/brand/logo-black.png",
      altKey: "logoLightAlt",
    },
    {
      labelKey: "logoDark",
      variant: "dark" as const,
      svgPath: "/brand/logo-white.svg",
      pngPath: "/brand/logo-white.png",
      altKey: "logoDarkAlt",
    },
  ],
  symbolAssets: [
    {
      labelKey: "symbolLight",
      variant: "light" as const,
      svgPath: "/brand/symbol.svg",
      pngPath: "/brand/symbol.png",
      altKey: "symbolLightAlt",
    },
    {
      labelKey: "symbolDark",
      variant: "dark" as const,
      svgPath: "/brand/symbol.svg",
      pngPath: "/brand/symbol.png",
      altKey: "symbolDarkAlt",
    },
  ],
} as const;
