"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@workspace/ui/components/blur-fade";
import { StudioImageCard } from "./studio-image-card";
import type { ImageRecord } from "@/lib/storage";

interface StudioGalleryProps {
  images: ImageRecord[];
  getImageUrl: (record: ImageRecord) => string;
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
}

export function StudioGallery({
  images,
  getImageUrl,
  onDelete,
  onDeleteAll,
}: StudioGalleryProps) {
  const t = useTranslations("Studio");

  if (images.length === 0) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="text-muted-foreground">{t("gallery.empty")}</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {t("gallery.title")} ({images.length})
        </h2>
        <button
          type="button"
          onClick={onDeleteAll}
          className="text-xs text-muted-foreground transition-colors hover:text-destructive"
        >
          {t("gallery.deleteAll")}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, i) => (
          <BlurFade key={image.id} delay={0.04 * i}>
            <StudioImageCard
              image={image}
              url={getImageUrl(image)}
              onDelete={onDelete}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
