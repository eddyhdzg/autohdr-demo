"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";
import {
  downloadFile,
  copySvgToClipboard,
  copyPngToClipboard,
} from "@/lib/brand-utils";

type BrandAssetCardProps = {
  label: string;
  variant: "light" | "dark";
  svgPath: string;
  pngPath: string;
  alt: string;
};

function ActionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-2.5 py-1.5 text-xs font-medium cursor-pointer",
        "bg-white/90 text-black",
        "border border-white/20",
        "hover:bg-white transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {children}
    </button>
  );
}

export function BrandAssetCard({
  label,
  variant,
  svgPath,
  pngPath,
  alt,
}: BrandAssetCardProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function showFeedback(message: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFeedback(message);
    timerRef.current = setTimeout(() => setFeedback(null), 1500);
  }

  async function handleCopySvg() {
    try {
      await copySvgToClipboard(svgPath);
      showFeedback("SVG copied!");
    } catch {
      showFeedback("Copy failed");
    }
  }

  async function handleCopyPng() {
    try {
      await copyPngToClipboard(pngPath);
      showFeedback("PNG copied!");
    } catch {
      showFeedback("Copy failed");
    }
  }

  return (
    <div className="group relative overflow-hidden">
      <div
        className={cn(
          "relative flex items-center justify-center p-12 md:p-16 aspect-[4/3]",
          variant === "light" ? "bg-white" : "bg-[oklch(0.145_0_0)]"
        )}
      >
        <div className="relative w-full h-full">
          <Image
            src={svgPath}
            alt={alt}
            fill
            className="object-contain"
          />
        </div>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0",
            "flex items-center justify-center gap-2 p-3",
            "bg-gradient-to-t from-black/60 to-transparent",
            "transition-all duration-200",
            "md:opacity-0 md:translate-y-2",
            "md:group-hover:opacity-100 md:group-hover:translate-y-0",
            "md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0"
          )}
        >
          {feedback ? (
            <span className="text-xs font-medium text-white">{feedback}</span>
          ) : (
            <>
              <ActionButton onClick={() => downloadFile(svgPath)}>
                Download SVG
              </ActionButton>
              <ActionButton onClick={() => downloadFile(pngPath)}>
                Download PNG
              </ActionButton>
              <ActionButton onClick={handleCopySvg}>Copy SVG</ActionButton>
              <ActionButton onClick={handleCopyPng}>Copy PNG</ActionButton>
            </>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
