"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

type FilterId = "all" | "web" | "mini" | "showcase";

const FILTER_IDS: FilterId[] = ["all", "web", "mini", "showcase"];

const FILTER_KEYS: Record<FilterId, string> = {
  all: "portfolio.filters.all",
  web: "portfolio.filters.web",
  mini: "portfolio.filters.mini",
  showcase: "portfolio.filters.showcase",
};

const HOME_FEATURED_IDS = ["saas-dashboard", "ai-chatbot", "ai-image-gen", "landing-page"];

export default function Portfolio({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterId>("all");

  const FILTERS = FILTER_IDS.map((id) => ({ id, label: t(FILTER_KEYS[id]) as string }));

  const portfolioItems = t("portfolio.items") as Array<{ title: string; description: string }> | undefined;

  const filtered = useMemo(
    () => {
      const items = filter === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === filter);
      return compact
        ? HOME_FEATURED_IDS.map((id) => PORTFOLIO_ITEMS.find((item) => item.id === id)).filter(
            (item): item is (typeof PORTFOLIO_ITEMS)[number] => Boolean(item),
          )
        : items;
    },
    [filter, compact],
  );

  if (compact) {
    return (
      <section id="portfolio" aria-label={t("portfolio.title") as string} className="py-20 px-6 bg-th-bg3">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              {t("portfolio.badge") as string}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-th-text mb-4">
              {t("portfolio.title") as string}
            </h2>
            <p className="text-th-muted max-w-2xl mx-auto mb-6">
              {t("portfolio.description") as string}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((item) => {
              const itemIdx = PORTFOLIO_ITEMS.findIndex((p) => p.id === item.id);
              const translatedTitle = portfolioItems?.[itemIdx]?.title ?? item.title;
              const translatedDescription = portfolioItems?.[itemIdx]?.description ?? item.description;
              return (
                <ProjectCard
                  key={item.id}
                  id={item.id}
                  title={translatedTitle}
                  description={translatedDescription}
                  tags={item.tags}
                  tagColors={item.tagColors}
                  mediaType={item.mediaType}
                  youtubeId={item.youtubeId}
                  image={item.image}
                  githubUrl={item.githubUrl}
                  liveUrl={item.liveUrl}
                  demoUrl={item.demoUrl}
                />
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mt-8"
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t("portfolio.cta") as string}
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" aria-label={t("portfolio.title") as string} className={`${compact ? "py-16" : "py-24"} px-6 bg-th-bg3`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className={`text-center ${compact ? "mb-8" : "mb-12"}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            {t("portfolio.badge") as string}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {t("portfolio.title") as string}
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto">
            {t("portfolio.description") as string}
          </p>
        </motion.div>

        {!compact && (
          <div
            className="flex flex-wrap justify-center gap-2 mb-10"
            role="tablist"
            aria-label="Filter portfolio by category"
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-lg text-[11px] font-medium uppercase tracking-wider transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    active
                      ? "bg-accent/15 border-accent/30 text-accent"
                      : "bg-th-card border-th-border text-th-muted hover:text-th-text hover:border-th-border-m"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const itemIdx = PORTFOLIO_ITEMS.findIndex((p) => p.id === item.id);
            const translatedTitle = portfolioItems?.[itemIdx]?.title ?? item.title;
            const translatedDescription = portfolioItems?.[itemIdx]?.description ?? item.description;
            return (
              <ProjectCard
                key={item.id}
                id={item.id}
                title={translatedTitle}
                description={translatedDescription}
                tags={item.tags}
                tagColors={item.tagColors}
                mediaType={item.mediaType}
                youtubeId={item.youtubeId}
                image={item.image}
                githubUrl={item.githubUrl}
                liveUrl={item.liveUrl}
                demoUrl={item.demoUrl}
              />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-th-subtle text-sm py-16">
            {t("portfolio.empty") as string}
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/case-studies"
            className="text-accent hover:text-accent/80 transition-colors font-medium text-sm"
          >
            {t("portfolio.cta") as string}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
