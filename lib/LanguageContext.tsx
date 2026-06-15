"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { type Locale, translations, loadLocale } from "./i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => unknown;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "shian-locale";
const SUPPORTED_LOCALES: readonly Locale[] = ["en", "zh", "ja", "ko"];
const DOMESTIC_HOSTS = new Set([
  "shian-studio.netlify.app",
  "shian.studio",
  "www.shian.studio",
]);

function isSupportedLocale(value: string | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function getDefaultLocaleForHost(hostname: string): Locale {
  const normalizedHost = hostname.toLowerCase();
  if (DOMESTIC_HOSTS.has(normalizedHost)) return "zh";
  return "en";
}

function getNestedValue(obj: unknown, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const nextLocale = isSupportedLocale(stored)
        ? stored
        : getDefaultLocaleForHost(window.location.hostname);

      loadLocale(nextLocale).then(() => setLocaleState(nextLocale));
    } catch {}
  }, []);

  // Sync <html lang> whenever locale changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    loadLocale(newLocale).then(() => {
      setLocaleState(newLocale);
      try {
        localStorage.setItem(STORAGE_KEY, newLocale);
      } catch {}
    });
  }, []);

  const t = useCallback(
    (key: string): unknown => {
      return getNestedValue(translations[locale], key);
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
