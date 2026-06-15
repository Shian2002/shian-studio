"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

function FAQItem({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-th-border rounded-xl overflow-hidden bg-th-card transition-colors hover:border-th-border-m">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left px-5 py-4 text-sm font-medium text-th-text hover:bg-th-bg-s transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="pr-4">{q}</span>
        <span
          className={`text-th-muted shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          {"\u25BE"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-th-muted leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CATEGORY_ICONS = [
  "\u{1F4B0}",
  "\u{1F4C5}",
  "\u26A1",
  "\u{1F680}",
];

export default function FAQ({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useLanguage();

  if (compact) {
    const itemCount = 4;
    const faqItems = Array.from({ length: itemCount }, (_, i) => ({
      question: t(`faq.items.${i}.question`) as string,
      answer: t(`faq.items.${i}.answer`) as string,
    }));

    return (
      <section
        id="faq"
        aria-label={t("nav.faq") as string}
        className="py-16 px-6 bg-th-bg2"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
              {t("faq.badge") as string}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
              {t("faq.title") as string}
            </h2>
            <p className="text-th-muted">{t("faq.description") as string}</p>
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
            <a href="/faq" className="text-accent hover:underline">
              {locale === "zh" ? "查看全部 FAQ" : "View all FAQs"}
            </a>{" "}
            {t("faq.footer") as string}
          </motion.p>
        </div>
      </section>
    );
  }

  const categories = (t("faqExtended.categories") as Array<{
    title: string;
    items: Array<{ q: string; a: string }>;
  }>) || [];

  return (
    <section className="py-16 px-6 bg-th-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-6">
            {(t("faqExtended.badge") as string) || "FAQ"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {(t("faqExtended.title") as string) || "Frequently asked questions"}
          </h2>
          <p className="text-th-muted max-w-xl mx-auto">
            {(t("faqExtended.subtitle") as string) ||
              "Everything you need to know about working with SHIAN Studio."}
          </p>
        </motion.div>

        <div className="space-y-10">
          {categories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.4 }}
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold text-th-text mb-4 pb-2 border-b border-th-border">
                <span aria-hidden="true">{CATEGORY_ICONS[catIdx] || "\u2753"}</span>
                {category.title}
              </h3>

              <div className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <FAQItem
                    key={`${catIdx}-${itemIdx}`}
                    q={item.q}
                    a={item.a}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-th-card border border-th-border rounded-xl px-6 py-4">
            <p className="text-sm text-th-muted mb-3">
              {(t("faqExtended.stillQuestions") as string) || "Still have questions?"}
            </p>
            <a
              href="/contact?source=faq"
              className="inline-block rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {(t("faqExtended.getInTouch") as string) || "Get in touch"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
