"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

function FAQItem({ q, a }: { q: string; a: string; }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-th-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left px-5 py-4 text-sm text-th-text hover:bg-th-bg-s transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="pr-4">{q}</span>
        <span
          className={`text-th-muted shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm text-th-muted leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  const itemCount = compact ? 4 : 6;
  const faqItems = Array.from({ length: itemCount }, (_, i) => ({
    question: t(`faq.items.${i}.question`) as string,
    answer: t(`faq.items.${i}.answer`) as string,
  }));

  return (
    <section id="faq" aria-label={t("nav.faq") as string} className={`${compact ? "py-16" : "py-24"} px-6 bg-th-bg2`}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className={`text-center ${compact ? "mb-8" : "mb-12"}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
            {t("faq.badge") as string}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {t("faq.title") as string}
          </h2>
          <p className="text-th-muted">
            {t("faq.description") as string}
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <FAQItem key={i} q={item.question} a={item.answer} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-xs text-th-subtle mt-8"
        >
          {t("faq.stillQuestions") as string}{" "}
          <a href="/contact?source=faq" className="text-accent hover:underline">
            {t("faq.reachOut") as string}
          </a>{" "}
          {t("faq.footer") as string}
        </motion.p>
      </div>
    </section>
  );
}
