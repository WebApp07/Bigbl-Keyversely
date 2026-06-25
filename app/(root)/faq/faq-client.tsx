"use client";

// app/(root)/faq/faq-client.tsx

import { useState } from "react";
import Link from "next/link";
import { FAQ_SECTIONS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium">{question}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FaqClient() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-10">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
          Help center
        </p>
        <h1 className="text-2xl font-bold">
          Answers to frequently asked questions
        </h1>
      </div>

      {FAQ_SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium pb-3 border-b mb-1">
            {section.label}
          </p>
          <div className="divide-y">
            {section.items.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-lg bg-muted p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium">Still have a question?</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Our support team is here to help.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
