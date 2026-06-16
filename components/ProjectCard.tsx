"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

interface Props {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
  tagColors: readonly string[];
  mediaType: "youtube" | "image" | "github";
  youtubeId?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  tags,
  tagColors,
  mediaType,
  youtubeId,
  image,
  liveUrl,
  demoUrl,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t } = useLanguage();
  const router = useRouter();

  const handleCardClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) return;
      router.push(`/case-studies/${id}`);
    },
    [router, id],
  );

  useEffect(() => {
    if (!playing) return;
    const handler = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === "infoDelivery" && data.info?.playerState === 0) {
          setPlaying(false);
        }
      } catch {}
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [playing]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  const thumbnail =
    mediaType === "youtube" && youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      : image;
  const demoIsInternal = Boolean(demoUrl?.startsWith("/"));
  const liveIsInternal = Boolean(liveUrl?.startsWith("/"));

  return (
    <>
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group cursor-pointer overflow-hidden rounded-xl border border-th-border bg-th-card transition-all duration-300 hover:border-th-border-m"
        onClick={handleCardClick}
      >
        <div className="relative aspect-video overflow-hidden">
          {mediaType === "youtube" && playing ? (
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <>
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-105"
                  unoptimized={thumbnail.startsWith("https://img.youtube.com")}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-th-border via-th-card to-th-border">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-th-muted opacity-40"
                    aria-hidden="true"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5" />
            </>
          )}
        </div>

        <div className="p-4">
          <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-th-text">
            {title}
          </h3>
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-th-muted">
            {description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {tags.map((tag, index) => (
                <span
                  key={tag}
                  className="rounded-md border px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    color: tagColors[index],
                    borderColor: `${tagColors[index]}33`,
                    backgroundColor: `${tagColors[index]}11`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {mediaType === "github" && (
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-th-muted">
                  GitHub
                </span>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target={demoIsInternal ? undefined : "_blank"}
                  rel={demoIsInternal ? undefined : "noopener noreferrer"}
                  onClick={(event) => event.stopPropagation()}
                  onTouchStart={(event) => event.stopPropagation()}
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 px-3 text-xs font-semibold text-accent transition-colors hover:bg-accent/15 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-h-0 sm:border-0 sm:bg-transparent sm:px-0 sm:text-[10px] sm:hover:bg-transparent sm:hover:text-accent/80"
                >
                  <span aria-hidden="true">▶</span>
                  <span className="ml-1">{t("portfolio.demo") as string}</span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target={liveIsInternal ? undefined : "_blank"}
                  rel={liveIsInternal ? undefined : "noopener noreferrer"}
                  onClick={(event) => event.stopPropagation()}
                  onTouchStart={(event) => event.stopPropagation()}
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 px-3 text-xs font-semibold text-accent transition-colors hover:bg-accent/15 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-h-0 sm:border-0 sm:bg-transparent sm:px-0 sm:text-[10px] sm:hover:bg-transparent sm:hover:text-accent/80"
                >
                  <span aria-hidden="true">→</span>
                  <span className="ml-1">Live</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {lightboxOpen && image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={image}
                alt={title}
                width={1200}
                height={800}
                style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain" }}
                className="rounded-lg"
                unoptimized={image.startsWith("https://")}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
