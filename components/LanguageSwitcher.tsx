"use client";

import { useState, useRef, useEffect } from "react";
import { LOCALES, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";

const VISIBLE_LOCALES = LOCALES;

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = VISIBLE_LOCALES.find((l) => l.code === locale) ?? VISIBLE_LOCALES[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-lg border border-th-border bg-th-card hover:bg-th-card-h hover:border-th-border-m flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Language: ${current.name}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-th-text2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 py-1.5 w-40 rounded-xl border border-th-border bg-th-card shadow-lg z-50"
          role="listbox"
          aria-label="Select language"
        >
          {VISIBLE_LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors ${
                  active
                    ? "text-accent bg-accent/10"
                    : "text-th-text2 hover:bg-th-bg-s hover:text-th-text"
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span>{l.name}</span>
                {active && (
                  <span className="ml-auto text-accent text-xs" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
