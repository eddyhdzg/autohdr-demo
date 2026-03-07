"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ImageRecord } from "@/lib/storage";
import {
  saveImage,
  getAllImages,
  deleteImage as deleteImageFromDb,
  deleteAllImages as deleteAllImagesFromDb,
} from "@/lib/storage";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 25 * 1024 * 1024; // 25MB

export function useImages() {
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const urlMapRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    getAllImages()
      .then(setImages)
      .finally(() => setIsLoading(false));
  }, []);

  // Clean up all object URLs on unmount
  useEffect(() => {
    const map = urlMapRef.current;
    return () => {
      for (const url of map.values()) {
        URL.revokeObjectURL(url);
      }
      map.clear();
    };
  }, []);

  const getImageUrl = useCallback((record: ImageRecord): string => {
    const existing = urlMapRef.current.get(record.id);
    if (existing) return existing;
    const url = URL.createObjectURL(record.blob);
    urlMapRef.current.set(record.id, url);
    return url;
  }, []);

  const addImages = useCallback(
    async (files: File[]): Promise<ImageRecord[]> => {
      const valid = files.filter(
        (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_SIZE,
      );
      const records = await Promise.all(valid.map(saveImage));
      setImages((prev) => [...records, ...prev]);
      return records;
    },
    [],
  );

  const removeImage = useCallback(async (id: string) => {
    await deleteImageFromDb(id);
    const url = urlMapRef.current.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      urlMapRef.current.delete(id);
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const removeAllImages = useCallback(async () => {
    await deleteAllImagesFromDb();
    for (const url of urlMapRef.current.values()) {
      URL.revokeObjectURL(url);
    }
    urlMapRef.current.clear();
    setImages([]);
  }, []);

  return {
    images,
    isLoading,
    addImages,
    removeImage,
    removeAllImages,
    getImageUrl,
  };
}
