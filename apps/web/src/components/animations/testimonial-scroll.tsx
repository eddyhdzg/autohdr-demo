"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Marquee } from "@workspace/ui/components/marquee";
import {
    Card,
    CardContent,
    CardFooter,
} from "@workspace/ui/components/card";
import {
    Dialog,
    DialogTrigger,
    DialogPortal,
    DialogBackdrop,
    DialogPopup,
    DialogTitle,
    DialogClose,
} from "@workspace/ui/components/dialog";

export interface Testimonial {
    id: string;
    name: string;
    img: string;
    videoUrl: string;
}

function getYouTubeId(url: string): string | null {
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?#]+)/,
    );
    return match ? match[1] : null;
}

function PlayIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const videoId = getYouTubeId(testimonial.videoUrl);
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("Testimonials");

    const role = t(`items.${testimonial.id}.role`);
    const description = t(`items.${testimonial.id}.description`);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Card className="group/card w-[400px] shrink-0 overflow-hidden gap-3 py-3">
                <DialogTrigger
                    tabIndex={-1}
                    className="relative aspect-video w-full cursor-pointer overflow-hidden -mt-3"
                    aria-label={t("playVideo", { name: testimonial.name })}
                >
                    <Image
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={t("videoAlt", { name: testimonial.name })}
                        fill
                        sizes="400px"
                        className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover/card:bg-black/40">
                        <PlayIcon className="size-12 text-white opacity-50 transition-opacity duration-300 drop-shadow-lg group-hover/card:opacity-100" />
                    </div>
                </DialogTrigger>

                <CardContent className="flex-1">
                    <p className="select-none leading-relaxed font-normal text-muted-foreground">
                        &ldquo;{description}&rdquo;
                    </p>
                </CardContent>

                <CardFooter>
                    <div className="flex w-full select-none items-center justify-start gap-3.5">
                        <Image
                            src={testimonial.img}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="size-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium text-foreground">
                                {testimonial.name}
                            </p>
                            <p className="text-sm font-normal text-muted-foreground">
                                {role}
                            </p>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <DialogPortal>
                <DialogBackdrop />
                <DialogPopup className="w-[90vw] max-w-4xl">
                    <DialogTitle className="sr-only">
                        {t("videoTitle", { name: testimonial.name })}
                    </DialogTitle>
                    <DialogClose aria-label={t("closeVideo")}>
                        <X className="size-5 text-white" />
                    </DialogClose>
                    {isOpen && (
                        <div className="relative aspect-video w-full">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                                title={t("videoTitle", { name: testimonial.name })}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        </div>
                    )}
                </DialogPopup>
            </DialogPortal>
        </Dialog>
    );
}

export function TestimonialCarousel({
    testimonials,
}: {
    testimonials: Testimonial[];
}) {
    return (
        <div className="relative w-full overflow-hidden py-8">
            <Marquee className="[--duration:40s]" pauseOnHover>
                {testimonials.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                    />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[4%] bg-linear-to-r from-background/50" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[4%] bg-linear-to-l from-background/50" />
        </div>
    );
}
