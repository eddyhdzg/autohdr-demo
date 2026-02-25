"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

import { siteConfig } from "@/lib/config";
import { BlurFade } from "@workspace/ui/components/blur-fade";
import { CornerPlus } from "@workspace/ui/components/corner-plus";

const INITIAL_DELAY = 0.05;
const DELAY_INCREMENT = 0.05;

export function CompanyShowcase() {
    const { companyShowcase } = siteConfig;
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            id="integrations"
            className="relative flex w-full items-center justify-center"
        >
            <CornerPlus position="top-left" className="text-muted-foreground/50" />
            <CornerPlus position="top-right" className="text-muted-foreground/50" />
            <div className="grid w-full max-w-7xl grid-cols-1 gap-px bg-border lg:grid-cols-6">
                <p className="col-span-2 lg:row-span-2 inline-flex min-h-20 items-center justify-center text-center text-2xl font-semibold text-foreground bg-background">
                    Integrations
                </p>
                <div className="col-span-4 grid grid-cols-2 gap-px md:grid-cols-3">
                    {companyShowcase.companyLogos.map((logo, idx) => (
                        <div key={logo.id} className="bg-background">
                            <BlurFade
                                delay={INITIAL_DELAY + idx * DELAY_INCREMENT}
                                inView={isInView}
                                className="group relative flex h-32 w-full items-center justify-center p-4"
                            >
                                <div className="flex h-full w-full items-center justify-center p-4">
                                    {logo.logo}
                                </div>
                            </BlurFade>
                        </div>
                    ))}
                    <div className="bg-background">
                        <BlurFade
                            delay={INITIAL_DELAY + companyShowcase.companyLogos.length * DELAY_INCREMENT}
                            inView={isInView}
                            className="group relative flex h-32 w-full items-center justify-center p-4"
                        >
                            <p className="text-sm font-medium text-muted-foreground">More coming soon</p>
                        </BlurFade>
                    </div>
                </div>
            </div>
        </section>
    );
}
