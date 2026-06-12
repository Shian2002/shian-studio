"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function CaseStudiesPage() {
  const { t } = useLanguage();
  const portfolioItems = t("portfolio.items") as
    | Array<{ title: string; description: string }>
    | undefined;

  return (
    <div className="min-h-screen bg-th-bg">
      <nav className="max-w-7xl mx-auto px-6 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-th-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              {t("common.home") as string}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-th-text font-medium">{t("portfolio.title") as string}</li>
        </ol>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-12 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            {t("portfolio.badge") as string}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-th-text mb-4">
            {t("portfolio.title") as string}
          </h1>
          <p className="text-th-muted max-w-2xl mx-auto text-lg">
            {t("portfolio.description") as string}
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PORTFOLIO_ITEMS.map((item, idx) => {
            const translated = portfolioItems?.[idx];
            const title = translated?.title ?? item.title;
            const description = translated?.description ?? item.description;
            const thumbnail =
              item.mediaType === "youtube" && item.youtubeId
                ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
                : item.image;

            return (
              <motion.article
                key={item.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.24) }}
                className="group rounded-2xl overflow-hidden bg-th-card border border-th-border hover:border-th-border-m transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      priority={idx < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                      unoptimized={thumbnail.startsWith("https://img.youtube.com")}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-th-border via-th-card to-th-border flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-th-muted opacity-40" aria-hidden="true">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-th-text/20 group-hover:bg-th-text/30 transition-colors" />
                </div>

                <div className="p-4">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-th-muted/20 text-th-muted uppercase tracking-wider mb-2">
                    {t("portfolio.demoProject") as string}
                  </span>
                  <h2 className="text-th-text font-semibold text-base mb-1 line-clamp-1">
                    {title}
                  </h2>
                  <p className="text-th-muted text-xs leading-relaxed mb-4 line-clamp-2">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium border"
                        style={{
                          color: item.tagColors[i],
                          borderColor: `${item.tagColors[i]}33`,
                          backgroundColor: `${item.tagColors[i]}11`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        className="flex-1 text-center px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                      >
                        {t("portfolio.viewDemo") as string}
                      </a>
                    )}
                    <Link
                      href={`/case-studies/${item.id}`}
                      className="px-4 py-2.5 rounded-lg border border-th-border text-th-text text-sm font-medium hover:border-th-border-m hover:text-accent transition-colors"
                    >
                      {t("portfolio.viewDetails") as string}
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
