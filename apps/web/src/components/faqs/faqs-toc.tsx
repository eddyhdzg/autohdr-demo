"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TableOfContents } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface FAQsTocProps {
  sections: Array<{ key: string; title: string }>;
}

export function FAQsToc({ sections }: FAQsTocProps) {
  const [activeKey, setActiveKey] = useState(sections[0]?.key ?? "");
  const isClickScrolling = useRef(false);

  const handleClick = (key: string) => {
    isClickScrolling.current = true;
    setActiveKey(key);
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  useEffect(() => {
    const keys = new Set(sections.map((s) => s.key));

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const hash = href.slice(1);
      if (keys.has(hash)) {
        isClickScrolling.current = true;
        setActiveKey(hash);
        setTimeout(() => {
          isClickScrolling.current = false;
        }, 1000);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);

    const elements = sections
      .map((s) => document.getElementById(s.key))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0)
      return () =>
        document.removeEventListener("click", handleAnchorClick, true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        // Pick the topmost intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveKey(visible[0].target.id);
        }
      },
      { rootMargin: "-64px 0px -60% 0px", threshold: 0 },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [sections]);

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-24">
        <p className="text-sm font-medium mb-3 flex items-center gap-1.5">
          <TableOfContents className="size-3.5" />
          On this page
        </p>
        <ul className="border-l border-border text-xs">
          {sections.map((section) => (
            <li key={section.key}>
              <Link
                href={`#${section.key}`}
                onClick={() => handleClick(section.key)}
                className={cn(
                  "block -ml-px border-l border-transparent py-1.5 pl-3 text-muted-foreground hover:text-foreground transition-colors",
                  activeKey === section.key &&
                    "border-l-2 border-foreground text-foreground font-medium",
                )}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
