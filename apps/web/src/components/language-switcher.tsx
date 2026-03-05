"use client";

import { Check, Globe } from "lucide-react";
import { Emoji } from "react-apple-emojis";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@workspace/ui/components/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuTrigger,
} from "@workspace/ui/components/menu";
import { cn } from "@workspace/ui/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

const localeOptions: {
  locale: AppLocale;
  labelKey: "english" | "spanish";
  emoji: "flag-united-states" | "flag-spain";
}[] = [
  { locale: "en", labelKey: "english", emoji: "flag-united-states" },
  { locale: "es", labelKey: "spanish", emoji: "flag-spain" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const tCommon = useTranslations("Common");

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("cursor-pointer h-8 w-8", className)}
          />
        }
        aria-label={tCommon("language")}
      >
        <Globe className="size-5 text-primary" />
        <span className="sr-only">{tCommon("language")}</span>
      </MenuTrigger>
      <MenuPortal>
        <MenuPositioner align="end" sideOffset={8}>
          <MenuPopup className="min-w-40">
            {localeOptions.map((option) => {
              const selected = locale === option.locale;

              return (
                <MenuItem
                  key={option.locale}
                  render={<Link href={pathname} locale={option.locale} />}
                  className={cn(
                    "gap-2 pr-2 rounded-md data-[highlighted]:bg-primary/12 data-[highlighted]:text-primary",
                    selected &&
                      "bg-primary/8 text-primary data-[highlighted]:bg-primary/12 data-[highlighted]:text-primary",
                  )}
                >
                  <Emoji name={option.emoji} width={16} />
                  <span>{tCommon(option.labelKey)}</span>
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      selected ? "opacity-100 text-primary" : "opacity-0",
                    )}
                  />
                </MenuItem>
              );
            })}
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}
