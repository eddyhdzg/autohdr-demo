import { get, set, del, keys, createStore } from "idb-keyval";

const store = createStore("autohdr-studio", "images");

export interface ImageRecord {
  id: string;
  name: string;
  type: string;
  size: number;
  blob: Blob;
  createdAt: number;
}

function imageKey(id: string) {
  return `image:${id}`;
}

export async function saveImage(file: File): Promise<ImageRecord> {
  const record: ImageRecord = {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type,
    size: file.size,
    blob: file,
    createdAt: Date.now(),
  };
  await set(imageKey(record.id), record, store);
  return record;
}

export async function getImage(id: string): Promise<ImageRecord | undefined> {
  return get<ImageRecord>(imageKey(id), store);
}

export async function getAllImages(): Promise<ImageRecord[]> {
  const allKeys = await keys(store);
  const imageKeys = allKeys.filter(
    (k) => typeof k === "string" && k.startsWith("image:"),
  );
  const records = await Promise.all(
    imageKeys.map((k) => get<ImageRecord>(k, store)),
  );
  return records
    .filter((r): r is ImageRecord => r !== undefined)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function deleteImage(id: string): Promise<void> {
  await del(imageKey(id), store);
}

export async function deleteAllImages(): Promise<void> {
  const allKeys = await keys(store);
  const imageKeys = allKeys.filter(
    (k) => typeof k === "string" && k.startsWith("image:"),
  );
  await Promise.all(imageKeys.map((k) => del(k, store)));
}
