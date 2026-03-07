"use client";

import { useImages } from "@/hooks/use-images";
import { StudioUploadZone } from "./studio-upload-zone";
import { StudioGallery } from "./studio-gallery";

export function StudioContent() {
  const { images, isLoading, addImages, removeImage, removeAllImages, getImageUrl } =
    useImages();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <StudioUploadZone onFilesSelected={addImages} />
      <StudioGallery
        images={images}
        getImageUrl={getImageUrl}
        onDelete={removeImage}
        onDeleteAll={removeAllImages}
      />
    </div>
  );
}
