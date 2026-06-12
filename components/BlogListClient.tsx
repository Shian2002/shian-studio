"use client";

import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import { localizeBlogPosts } from "@/lib/blog-localization";
import { useLanguage } from "@/lib/LanguageContext";

export default function BlogListClient() {
  const { locale, t } = useLanguage();
  const posts = localizeBlogPosts(BLOG_POSTS, locale);

  return (
    <div className="min-h-screen bg-th-bg">
      <nav className="max-w-4xl mx-auto px-6 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-th-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              {t("common.home") as string}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-th-text font-medium">{t("blog.title") as string}</li>
        </ol>
      </nav>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-th-text mb-4">
            {t("blog.title") as string}
          </h1>
          <p className="text-lg text-th-muted max-w-2xl">
            {t("blog.description") as string}
          </p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-th-border bg-th-card p-6 md:p-8 hover:border-accent/30 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-accent/10 text-accent">
                  {post.category}
                </span>
                <span className="text-xs text-th-muted">{post.date}</span>
                <span className="text-xs text-th-muted">{post.readTime}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-th-text mb-2 group-hover:text-accent transition-colors">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-th-muted text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-0.5 rounded border border-th-border text-th-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1"
                >
                  {t("blog.readArticle") as string}
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
