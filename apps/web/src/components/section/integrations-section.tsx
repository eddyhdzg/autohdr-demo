import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/config";
import { Button } from "@workspace/ui/components/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import { CornerPlus } from "@workspace/ui/components/corner-plus";
import {
    TypographyH2,
    TypographyP,
} from "@workspace/ui/components/typography";
import { ArrowUpRight, MessageSquarePlus, Puzzle } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function IntegrationsSection() {
    const t = await getTranslations("Integrations");
    const { integrationsSection } = siteConfig;

    return (
        <section
            id="integrations-detail"
            className="relative px-6 py-12 md:py-16 lg:py-24"
        >
            <CornerPlus
                position="top-left"
                className="text-muted-foreground/50"
            />
            <CornerPlus
                position="top-right"
                className="text-muted-foreground/50"
            />

            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-1.5 border bg-background px-3 h-8 text-sm font-medium dark:bg-input/30 dark:border-input [&_svg]:size-4">
                    <Puzzle />
                    {t("badge")}
                </div>
                <TypographyH2>{t("title")}</TypographyH2>
                <TypographyP className="max-w-2xl">
                    {t("description")}
                </TypographyP>
            </div>

            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
                {integrationsSection.integrations.map((integration) => (
                    <Link
                        key={integration.id}
                        href={integration.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <Card className="border-0 bg-background h-full transition-colors group-hover:bg-accent/50">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Image
                                        src={integration.logo}
                                        alt={integration.name}
                                        width={96}
                                        height={32}
                                        className="max-h-8 max-w-24 w-auto h-auto object-contain brightness-0 dark:invert"
                                    />
                                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardTitle className="text-base">
                                    {integration.name}
                                </CardTitle>
                                <CardDescription>
                                    {t(`items.${integration.translationKey}`)}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
                <Link
                    href={integrationsSection.requestIntegration.href}
                    className="group"
                >
                    <Card className="border-0 bg-background h-full transition-colors group-hover:bg-accent/50">
                        <CardHeader>
                            <MessageSquarePlus className="size-6 text-muted-foreground" />
                            <CardTitle className="text-base">
                                {t("requestIntegration")}
                            </CardTitle>
                            <CardDescription>
                                {t("requestDescription")}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>

            <div className="flex justify-center pt-8">
                <Button
                    render={
                        <Link
                            href={integrationsSection.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    }
                    variant="outline"
                    size="sm"
                >
                    {t("viewAll")}
                    <ArrowUpRight className="size-4" />
                </Button>
            </div>
        </section>
    );
}
