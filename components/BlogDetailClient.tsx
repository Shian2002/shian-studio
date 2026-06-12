"use client";

import Link from "next/link";
import type { BlogPost, BlogSection } from "@/lib/blog-data";
import { localizeBlogPost } from "@/lib/blog-localization";
import { useLanguage } from "@/lib/LanguageContext";

function renderSection(section: BlogSection, index: number, ctaLabel: string) {
  switch (section.type) {
    case "heading":
      return index < 3 ? (
        <h2 key={index} className="text-2xl font-bold text-th-text mt-10 mb-4">
          {section.content}
        </h2>
      ) : (
        <h3 key={index} className="text-xl font-semibold text-th-text mt-8 mb-3">
          {section.content}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="text-th-text2 leading-relaxed mb-4">
          {section.content}
        </p>
      );
    case "list":
      return (
        <div key={index} className="mb-6">
          {section.content && (
            <p className="text-th-text2 font-medium mb-2">{section.content}</p>
          )}
          <ul className="space-y-2">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-th-text2 text-sm">
                <span className="text-accent mt-1 shrink-0" aria-hidden="true">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-accent pl-6 py-3 my-6 bg-accent/5 rounded-r-xl">
          <p className="text-th-text italic leading-relaxed">&ldquo;{section.content}&rdquo;</p>
        </blockquote>
      );
    case "cta":
      return (
        <div key={index} className="my-8 p-5 rounded-xl bg-accent/10 border border-accent/20">
          <p className="text-th-text text-sm mb-3">{section.content}</p>
          <Link href="/contact?source=blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
            {ctaLabel}
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      );
    default:
      return null;
  }
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BlogDetailClient({
  post,
  prevPost,
  nextPost,
}: {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}) {
  const { locale, t } = useLanguage();
  const localizedPost = localizeBlogPost(post, locale);
  const localizedPrevPost = prevPost ? localizeBlogPost(prevPost, locale) : null;
  const localizedNextPost = nextPost ? localizeBlogPost(nextPost, locale) : null;
  const ctaLabel = t("blog.sendInquiry") as string;

  return (
    <div className="min-h-screen bg-th-bg">
      <nav className="max-w-3xl mx-auto px-6 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-th-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              {t("common.home") as string}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-accent transition-colors">
              {t("blog.title") as string}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-th-text font-medium line-clamp-1">{localizedPost.title}</li>
        </ol>
      </nav>

      <header className="max-w-3xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-accent/10 text-accent">
            {localizedPost.category}
          </span>
          <span className="text-xs text-th-muted">{localizedPost.date}</span>
          <span className="text-xs text-th-muted">{localizedPost.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-th-text mb-4 leading-tight">
          {localizedPost.title}
        </h1>
        <p className="text-lg text-th-muted leading-relaxed">{localizedPost.excerpt}</p>
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-th-border">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent">
            S
          </div>
          <div>
            <p className="text-sm font-medium text-th-text">{post.author}</p>
            <p className="text-xs text-th-muted">SHIAN Studio</p>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-8">
        {localizedPost.sections.map((section, index) => renderSection(section, index, ctaLabel))}
      </article>

      <section className="max-w-3xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {localizedPost.relatedServices.length > 0 && (
            <div className="rounded-xl border border-th-border bg-th-card p-5">
              <h3 className="text-sm font-semibold text-th-text mb-3">
                {t("blog.relatedServices") as string}
              </h3>
              <div className="space-y-2">
                {localizedPost.relatedServices.map((serviceSlug) => (
                  <Link key={serviceSlug} href={`/services/${serviceSlug}`} className="block text-sm text-accent hover:underline">
                    {titleFromSlug(serviceSlug)} -&gt;
                  </Link>
                ))}
              </div>
            </div>
          )}
          {localizedPost.relatedCases.length > 0 && (
            <div className="rounded-xl border border-th-border bg-th-card p-5">
              <h3 className="text-sm font-semibold text-th-text mb-3">
                {t("blog.relatedPortfolio") as string}
              </h3>
              <div className="space-y-2">
                {localizedPost.relatedCases.map((caseSlug) => (
                  <Link key={caseSlug} href={`/case-studies/${caseSlug}`} className="block text-sm text-accent hover:underline">
                    {titleFromSlug(caseSlug)} -&gt;
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-th-border bg-gradient-to-r from-accent/10 via-accent/5 to-transparent">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-th-text mb-3">
            {t("blog.readyTitle") as string}
          </h2>
          <p className="text-th-muted mb-6">
            {t("blog.readyDesc") as string}
          </p>
          <Link href="/contact?source=blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
            {ctaLabel}
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>

      <nav className="max-w-3xl mx-auto px-6 py-8 border-t border-th-border">
        <div className="flex items-center justify-between gap-4">
          {localizedPrevPost ? (
            <Link href={`/blog/${localizedPrevPost.slug}`} className="group flex items-center gap-2 text-sm text-th-muted hover:text-accent transition-colors min-w-0">
              <span aria-hidden="true">&lt;-</span>
              <span className="truncate">{localizedPrevPost.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {localizedNextPost ? (
            <Link href={`/blog/${localizedNextPost.slug}`} className="group flex items-center gap-2 text-sm text-th-muted hover:text-accent transition-colors min-w-0 text-right">
              <span className="truncate">{localizedNextPost.title}</span>
              <span aria-hidden="true">-&gt;</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}
