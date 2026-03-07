"use client";

import { useTranslations } from "next-intl";
import { UploadThingDropzone } from "@workspace/ui/components/elements/uploadthing-dropzone";

interface StudioUploadZoneProps {
  onFilesSelected: (files: File[]) => Promise<unknown>;
  disabled?: boolean;
}

export function StudioUploadZone({
  onFilesSelected,
  disabled,
}: StudioUploadZoneProps) {
  const t = useTranslations("Studio");

  return (
    <section className="px-6">
      <UploadThingDropzone
        onUpload={async (files) => {
          await onFilesSelected(files);
          return files.map((f) => ({
            name: f.name,
            size: f.size,
            type: f.type,
            url: "",
          }));
        }}
        accept="image/jpeg,image/png,image/webp"
        maxFiles={20}
        maxSize={25 * 1024 * 1024}
        disabled={disabled}
      />
      <p className="mt-2 text-xs text-muted-foreground text-center">
        {t("upload.acceptedTypes")}
      </p>
    </section>
  );
}
