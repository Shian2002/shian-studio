"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { trackCaseStudyView, trackCtaClick } from "@/lib/analytics";

interface Props {
  slug: string;
}

export default function CaseStudyDetail({ slug }: Props) {
  const { t } = useLanguage();

  // Track case study view
  useEffect(() => {
    trackCaseStudyView(slug);
  }, [slug]);

  const itemIdx = PORTFOLIO_ITEMS.findIndex((p) => p.id === slug);
  const item = PORTFOLIO_ITEMS[itemIdx];

  const portfolioItems = t("portfolio.items") as
    | Array<{ title: string; description: string }>
    | undefined;

  const tTitle = portfolioItems?.[itemIdx]?.title ?? item?.title ?? slug;
  const tDesc = portfolioItems?.[itemIdx]?.description ?? item?.description ?? "";

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-th-bg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-th-text mb-4">Not Found</h1>
          <p className="text-th-muted mb-6">This case study doesn&apos;t exist.</p>
          <Link href="/case-studies" className="text-accent hover:underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const cs = item.caseStudy;

  // Previous / Next navigation
  const prevItem = itemIdx > 0 ? PORTFOLIO_ITEMS[itemIdx - 1] : null;
  const nextItem =
    itemIdx < PORTFOLIO_ITEMS.length - 1 ? PORTFOLIO_ITEMS[itemIdx + 1] : null;
  const prevTitle =
    prevItem
      ? (portfolioItems?.[itemIdx - 1]?.title ?? prevItem.title)
      : null;
  const nextTitle =
    nextItem
      ? (portfolioItems?.[itemIdx + 1]?.title ?? nextItem.title)
      : null;

  const thumbnail =
    item.mediaType === "youtube" && item.youtubeId
      ? `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
      : item.image;

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
          <li>
            <Link href="/case-studies" className="hover:text-accent transition-colors">
              Case Studies
            </Link>
          </li>
          <li aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </li>
          <li className="text-th-text font-medium line-clamp-1">{tTitle}</li>
        </ol>
      </nav>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[21/9] bg-th-card border border-th-border"
        >
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={tTitle}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover' }}
              unoptimized={thumbnail.startsWith('https://img.youtube.com')}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-th-border via-th-card to-th-border flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-th-muted opacity-40" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {tTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              {item.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/15 text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target={item.demoUrl.startsWith("/") ? undefined : "_blank"}
                  rel={item.demoUrl.startsWith("/") ? undefined : "noopener noreferrer"}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors"
                >
                  Demo
                </a>
              )}
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target={item.liveUrl.startsWith("/") ? undefined : "_blank"}
                  rel={item.liveUrl.startsWith("/") ? undefined : "noopener noreferrer"}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  Live Site
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Project Overview */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-th-muted leading-relaxed">
            {tDesc}
          </p>
        </motion.div>
      </section>

      {/* Case Study Details */}
      {cs && (
        <section className="max-w-4xl mx-auto px-6 pb-16 space-y-16">
          {/* Client Background */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xs uppercase tracking-wider text-th-muted font-semibold mb-2">
              Client
            </h2>
            <p className="text-th-text text-lg font-semibold">{cs.client}</p>
            <p className="text-th-muted text-sm">{cs.role}</p>
          </motion.div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xs uppercase tracking-wider text-th-muted font-semibold mb-3">
                The Challenge
              </h2>
              <div className="rounded-xl bg-th-card border border-th-border p-6">
                <p className="text-th-text leading-relaxed">{cs.challenge}</p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xs uppercase tracking-wider text-th-muted font-semibold mb-3">
                The Solution
              </h2>
              <div className="rounded-xl bg-th-card border border-th-border p-6">
                <p className="text-th-text leading-relaxed">{cs.solution}</p>
              </div>
            </motion.div>
          </div>

          {/* Results */}
          {cs.results.length > 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xs uppercase tracking-wider text-th-muted font-semibold mb-6">
                Key Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cs.results.map((result, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-th-card border border-th-border p-5 flex items-start gap-3"
                  >
                    <span className="text-green-500 text-lg shrink-0 mt-0.5" aria-hidden="true">
                      &#10003;
                    </span>
                    <p className="text-th-text text-sm font-medium">{result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonial */}
          {cs.testimonial && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xs uppercase tracking-wider text-th-muted font-semibold mb-6">
                Client Testimonial
              </h2>
              <blockquote className="rounded-xl bg-th-card border border-th-border p-6 md:p-8">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-accent/30 mb-4" aria-hidden="true">
                  <path d="M11 7.5v5c0 2.5-1.5 4.5-4 5.5l-1-2c1.5-.5 2.5-1.5 2.5-3H6V7.5h5zm8 0v5c0 2.5-1.5 4.5-4 5.5l-1-2c1.5-.5 2.5-1.5 2.5-3H14V7.5h5z" />
                </svg>
                <p className="text-th-text text-lg italic leading-relaxed mb-4">
                  &ldquo;{cs.testimonial.text}&rdquo;
                </p>
                <footer className="text-th-muted text-sm">
                  <span className="font-semibold text-th-text">{cs.testimonial.name}</span>
                  <br />
                  {cs.testimonial.role}
                </footer>
              </blockquote>
            </motion.div>
          )}
        </section>
      )}

      {/* No Case Study Data - Show Project Info */}
      {!cs && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-th-card border border-th-border p-6"
          >
            <h2 className="text-lg font-semibold text-th-text mb-2">Project Details</h2>
            <p className="text-th-muted text-sm mb-4">
              This project showcase is coming soon with detailed case study content.
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium border"
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
          </motion.div>
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
              Interested in a similar project?
            </h2>
            <p className="text-th-muted mb-6 max-w-lg mx-auto">
              Let&apos;s talk about your idea and see how we can build something great together.
            </p>
            <a
              href={`/#contact?case=${slug}`}
              onClick={() => trackCtaClick(`case-study-${slug}`)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
            >
              Let&apos;s Talk
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <nav className="max-w-4xl mx-auto px-6 py-8 border-t border-th-border">
        <div className="flex items-center justify-between gap-4">
          {prevItem && prevTitle ? (
            <Link
              href={`/case-studies/${prevItem.id}`}
              className="group flex items-center gap-2 text-sm text-th-muted hover:text-accent transition-colors min-w-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:-translate-x-1 transition-transform" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span className="truncate">{prevTitle}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextItem && nextTitle ? (
            <Link
              href={`/case-studies/${nextItem.id}`}
              className="group flex items-center gap-2 text-sm text-th-muted hover:text-accent transition-colors min-w-0 text-right"
            >
              <span className="truncate">{nextTitle}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}
