"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function CaseStudiesPage() {
  const { t } = useLanguage();

  const portfolioItems = t("portfolio.items") as
    | Array<{ title: string; description: string }>
    | undefined;

  const translatedTitle = t("portfolio.title") as string;
  const translatedBadge = t("portfolio.badge") as string;
  const translatedDescription = t("portfolio.description") as string;
  const translatedCta = t("portfolio.cta") as string;

  const caseStudyItems = PORTFOLIO_ITEMS.filter((item) => item.caseStudy);
  const normalItems = PORTFOLIO_ITEMS.filter((item) => !item.caseStudy);

  return (
    <div className="min-h-screen bg-th-bg">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-th-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </li>
          <li className="text-th-text font-medium">Case Studies</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            {translatedBadge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-th-text mb-4">
            {translatedTitle}
          </h1>
          <p className="text-th-muted max-w-2xl mx-auto text-lg">
            {translatedDescription}
          </p>
        </motion.div>
      </section>

      {/* Case Study Cards (with detailed data) */}
      {caseStudyItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16 space-y-16">
          {caseStudyItems.map((item, idx) => {
            const itemIdx = PORTFOLIO_ITEMS.findIndex((p) => p.id === item.id);
            const tTitle = portfolioItems?.[itemIdx]?.title ?? item.title;
            const tDesc = portfolioItems?.[itemIdx]?.description ?? item.description;
            const cs = item.caseStudy!;

            return (
              <motion.article
                key={item.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl overflow-hidden bg-th-card border border-th-border"
              >
                <div className="lg:grid lg:grid-cols-2 lg:gap-0">
                  {/* Image */}
                  <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image!}
                        alt={tTitle}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-th-border via-th-card to-th-border flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-th-muted opacity-40" aria-hidden="true">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      </div>
                    )}
                    {/* Tags overlay */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 text-white backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <p className="text-xs text-th-muted uppercase tracking-wider mb-2">
                      {cs.client} &middot; {cs.role}
                    </p>
                    <h2 className="text-2xl font-bold text-th-text mb-3">
                      {tTitle}
                    </h2>
                    <p className="text-th-muted text-sm mb-4">
                      {tDesc}
                    </p>

                    {/* Challenge */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-th-text mb-1">
                        Challenge
                      </h3>
                      <p className="text-th-muted text-sm">{cs.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-th-text mb-1">
                        Solution
                      </h3>
                      <p className="text-th-muted text-sm">{cs.solution}</p>
                    </div>

                    {/* Results */}
                    {cs.results.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-th-text mb-2">
                          Results
                        </h3>
                        <ul className="space-y-1">
                          {cs.results.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-sm text-th-muted">
                              <span className="text-green-500 mt-0.5 shrink-0" aria-hidden="true">&#10003;</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Testimonial */}
                    {cs.testimonial && (
                      <blockquote className="border-l-2 border-th-border pl-4 py-2 mb-4">
                        <p className="text-sm text-th-muted italic">
                          &ldquo;{cs.testimonial.text}&rdquo;
                        </p>
                        <footer className="mt-1 text-xs text-th-subtle">
                          &mdash; {cs.testimonial.name}, {cs.testimonial.role}
                        </footer>
                      </blockquote>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 mt-auto pt-4">
                      <Link
                        href={`/case-studies/${item.id}`}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                      >
                        View Details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                      <a
                        href={`/#contact?case=${item.id}`}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-th-border text-th-text text-sm font-medium hover:border-th-border-m hover:text-accent transition-colors"
                      >
                        Want something similar? Send an inquiry
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>
      )}

      {/* Normal Cards Grid (without detailed caseStudy data) */}
      {normalItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          {caseStudyItems.length > 0 && (
            <h2 className="text-2xl font-bold text-th-text mb-8">{t("portfolio.moreProjects") as string}</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {normalItems.map((item, idx) => {
              const itemIdx = PORTFOLIO_ITEMS.findIndex((p) => p.id === item.id);
              const tTitle = portfolioItems?.[itemIdx]?.title ?? item.title;
              const tDesc = portfolioItems?.[itemIdx]?.description ?? item.description;
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
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl overflow-hidden bg-th-card border border-th-border hover:border-th-border-m transition-all duration-300"
                >
                  <Link href={`/case-studies/${item.id}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={tTitle}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-500 group-hover:scale-105"
                          unoptimized={thumbnail.startsWith('https://img.youtube.com')}
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
                      <h3 className="text-th-text font-semibold text-sm mb-1 line-clamp-1">
                        {tTitle}
                      </h3>
                      <p className="text-th-muted text-xs leading-relaxed mb-3 line-clamp-2">
                        {tDesc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
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
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border-t border-th-border">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-th-text mb-4">
              Ready to start your project?
            </h2>
            <p className="text-th-muted mb-6 max-w-lg mx-auto">
              Send a project inquiry and let&apos;s discuss your idea.
            </p>
            <a
              href="/#contact?source=case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
            >
              Send Project Inquiry
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
