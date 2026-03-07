"use client";

import { useEffect, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";

interface FAQsTocProps {
  sections: Array<{ key: string; title: string }>;
}

export function FAQsToc({ sections }: FAQsTocProps) {
  const [activeKey, setActiveKey] = useState(sections[0]?.key ?? "");

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.key))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveKey(entry.target.id);
          }
        }
      },
      { rootMargin: "-64px 0px -60% 0px", threshold: 0 },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-24">
        <p className="text-sm font-medium mb-3">On this page</p>
        <ul className="space-y-2 text-sm">
          {sections.map((section) => (
            <li key={section.key}>
              <a
                href={`#${section.key}`}
                className={cn(
                  "block text-muted-foreground hover:text-foreground transition-colors",
                  activeKey === section.key && "text-foreground font-medium",
                )}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
