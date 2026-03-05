"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@workspace/ui/components/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Common");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative cursor-pointer h-8 w-8"
    >
      <Sun
        className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary"
      />
      <Moon
        className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary"
      />
      <span className="sr-only">{t("toggleTheme")}</span>
    </Button>
  );
}
