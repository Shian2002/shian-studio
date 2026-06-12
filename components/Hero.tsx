"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { BRAND } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  const current = useMemo(() => words[wordIndex] ?? "", [words, wordIndex]);

  useEffect(() => {
    if (words.length === 0) return;
    let timer: number;
    if (phase === "typing") {
      if (display.length < current.length) {
        timer = window.setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          70,
        );
      } else {
        timer = window.setTimeout(() => setPhase("pausing"), 1500);
      }
    } else if (phase === "pausing") {
      timer = window.setTimeout(() => setPhase("deleting"), 400);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timer = window.setTimeout(
          () => setDisplay(current.slice(0, display.length - 1)),
          40,
        );
      } else {
        setPhase("typing");
        setWordIndex((wordIndex + 1) % words.length);
      }
    }
    return () => window.clearTimeout(timer);
  }, [display, phase, current, wordIndex, words]);

  return display;
}

export default function Hero() {
  const { t } = useLanguage();

  const WORDS = [
    t("hero.words.0") as string,
    t("hero.words.1") as string,
    t("hero.words.2") as string,
    t("hero.words.3") as string,
  ];

  const TECH_LIST = [
    t("hero.techList.0") as string,
    t("hero.techList.1") as string,
    t("hero.techList.2") as string,
    t("hero.techList.3") as string,
    t("hero.techList.4") as string,
    t("hero.techList.5") as string,
  ];

  const typed = useTypewriter(WORDS);

  return (
    <section id="hero" aria-label={t("nav.hero") as string} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, var(--bg-gradient-start), var(--bg-gradient-mid), var(--bg-gradient-end))" }}
      />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" aria-hidden="true" />

      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-accent/20 rounded-full blur-[160px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-purple/15 rounded-full blur-[160px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] bg-mint/10 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-th-bg-s border border-th-border-m text-xs text-th-muted mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            {t("hero.badge") as string}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-th-text mb-6 leading-[1.1]"
        >
          {t("hero.titlePrefix") as string}
          <br />
          <span className="bg-gradient-to-r from-accent via-purple to-mint bg-clip-text text-transparent font-light">
            {typed}
            <span className="inline-block w-[3px] h-[0.9em] bg-accent/70 ml-1 align-middle animate-pulse" aria-hidden="true" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-th-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("hero.description") as string}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl bg-accent text-white font-medium hover:bg-accent/85 hover:shadow-[0_12px_48px_rgba(74,158,255,0.45)] shadow-[0_4px_20px_rgba(74,158,255,0.25)] transition-all duration-300 text-sm"
          >
            {t("hero.viewWork") as string}
          </a>          <a
            href="/case-studies"
            className="px-8 py-3.5 rounded-xl border border-th-border-s text-th-text font-medium hover:bg-th-bg-s hover:border-th-border-m hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm"
          >
            {t("hero.seePricing") as string}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
        >
          {((t("hero.trustPoints") as string[]) ?? []).map((point) => (
            <div key={point} className="flex items-center gap-2 text-sm text-th-muted">
              <svg className="w-4 h-4 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {point}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] text-th-faint uppercase tracking-[0.2em] max-w-3xl mx-auto"
        >
          {TECH_LIST.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-th-faint uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-th-border-s flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 bg-th-text/50 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
