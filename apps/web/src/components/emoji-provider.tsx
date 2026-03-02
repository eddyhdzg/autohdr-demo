"use client";

import type { ReactNode } from "react";
import { EmojiProvider as ReactAppleEmojiProvider } from "react-apple-emojis";
import emojiData from "@/lib/emoji-data.json";

interface EmojiProviderProps {
  children: ReactNode;
}

export function EmojiProvider({ children }: EmojiProviderProps) {
  return (
    <ReactAppleEmojiProvider data={emojiData}>
      {children}
    </ReactAppleEmojiProvider>
  );
}
