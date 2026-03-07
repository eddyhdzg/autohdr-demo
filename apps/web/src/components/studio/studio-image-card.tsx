"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AspectRatio } from "@workspace/ui/components/aspect-ratio";
import { Trash2 } from "lucide-react";
import type { ImageRecord } from "@/lib/storage";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

interface StudioImageCardProps {
  image: ImageRecord;
  url: string;
  onDelete: (id: string) => void;
}

export function StudioImageCard({ image, url, onDelete }: StudioImageCardProps) {
  const t = useTranslations("Studio");

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card">
      <AspectRatio ratio={3 / 2}>
        <Image
          src={url}
          alt={image.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
      </AspectRatio>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{image.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(image.size)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(image.id)}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          aria-label={t("imageCard.delete")}
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
