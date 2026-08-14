"use client";

import { faqs } from "@/lib/constants";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/client";

export default function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card p-7">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="h-px w-8 bg-border" />
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {t("faq.faq")}
        </span>
        <span className="h-px w-8 bg-border" />
      </div>
      <h2 className="text-lg font-medium text-foreground text-center mb-1">
        {t("faq.frequentlyAsked")}
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        {t("faq.quickAnswers")}
      </p>

      <div className="flex flex-col gap-2.5">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-border overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-foreground hover:bg-accent/40 transition-colors"
              aria-expanded={open === i}
            >
              {faq.q}
              <i
                className={`ti ti-chevron-down text-muted-foreground text-base flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180 text-blue-500" : ""}`}
                aria-hidden="true"
              />
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
