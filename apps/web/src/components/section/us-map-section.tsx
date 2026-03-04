import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import { DottedMap } from "@workspace/ui/components/dotted-map";
import { TypographyH2, TypographyP } from "@workspace/ui/components/typography";
import { MapPin } from "lucide-react";

export function USMapSection() {
    const t = useTranslations("USMap");
    const { usMapSection } = siteConfig;

    return (
        <section
            id="us-map"
            className="relative px-6 py-12 md:py-16 lg:py-24"
        >
            <CornerPlus position="top-left" className="text-muted-foreground/50" />
            <CornerPlus position="top-right" className="text-muted-foreground/50" />

            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-1.5 border bg-background px-3 h-8 text-sm font-medium dark:bg-input/30 dark:border-input [&_svg]:size-4">
                    <MapPin />
                    {t("badge")}
                </div>
                <TypographyH2>{t("title")}</TypographyH2>
                <TypographyP className="max-w-2xl">
                    {t("description")}
                </TypographyP>
            </div>

            <div className="relative mt-8 md:mt-12 max-w-4xl mx-auto w-full">
                <DottedMap
                    width={150}
                    height={97}
                    markers={usMapSection.markers}
                    region={usMapSection.region}
                    countries={usMapSection.countries}
                    backgroundCountries={usMapSection.backgroundCountries}
                    backgroundOpacity={0.35}
                    markerColor="var(--foreground)"
                    mapSamples={5000}
                    dotRadius={0.3}
                    preserveAspectRatio="xMidYMid meet"
                    className="text-muted-foreground/80 mask-[linear-gradient(to_top,transparent_0%,#000_15%)]"
                />
                <div
                    className="absolute flex flex-col items-center"
                    style={{ left: "47.3%", top: "74.7%", transform: "translate(-50%, -100%)" }}
                >
                    <span className="mb-1 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold leading-none whitespace-nowrap">
                        {t("hqLabel")}
                    </span>
                    <MapPin className="text-foreground" size={28} />
                </div>
            </div>
        </section>
    );
}
