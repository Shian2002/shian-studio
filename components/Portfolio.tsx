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

export default function Portfolio() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterId>("all");

  const FILTERS = FILTER_IDS.map((id) => ({ id, label: t(FILTER_KEYS[id]) as string }));

  const portfolioItems = t("portfolio.items") as Array<{ title: string; description: string }> | undefined;

  const filtered = useMemo(
    () => (filter === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === filter)),
    [filter],
  );

  return (
    <section id="portfolio" aria-label={t("portfolio.title") as string} className="py-24 px-6 bg-th-bg3">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const itemIdx = PORTFOLIO_ITEMS.findIndex((p) => p.id === item.id);
            const translatedTitle = portfolioItems?.[itemIdx]?.title ?? item.title;
            const translatedDescription = portfolioItems?.[itemIdx]?.description ?? item.description;
            return (
              <ProjectCard
                key={item.id}
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
          className="text-center mt-12"
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
