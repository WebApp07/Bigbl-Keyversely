"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  faqs: string[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => {
        const colonIndex = faq.indexOf(":");
        const question = colonIndex > -1 ? faq.substring(0, colonIndex) : faq;
        const answer =
          colonIndex > -1 ? faq.substring(colonIndex + 1).trim() : null;
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors gap-3"
            >
              <span className="font-semibold text-foreground text-sm">
                {question}
              </span>
              <span
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-md border border-border shrink-0 transition-colors",
                  isOpen
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-250",
                    isOpen && "rotate-180",
                  )}
                />
              </span>
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                {answer && (
                  <p className="px-5 pb-4 pt-3 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {answer}
                  </p>
                )}
                {!answer && (
                  <p className="px-5 pb-4 pt-3 text-sm text-foreground leading-relaxed border-t border-border">
                    {faq}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
