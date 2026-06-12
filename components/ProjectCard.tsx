"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  githubUrl,
  liveUrl,
  demoUrl,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!playing) return;
    const handler = (e: MessageEvent) => {
      if (e.origin !== "https://www.youtube.com") return;
      try {
        const data = JSON.parse(e.data);
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
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  const thumbnail =
    mediaType === "youtube" && youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      : image;

  return (
    <>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group rounded-2xl overflow-hidden bg-th-card border border-th-border hover:border-th-border-m transition-all duration-300"
      >
        <Link href={`/case-studies/${id}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            {mediaType === "youtube" && playing ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <>
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  unoptimized={thumbnail.startsWith('https://img.youtube.com')}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-th-border via-th-card to-th-border flex items-center justify-center">
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
              <div className="absolute inset-0 bg-th-text/20 group-hover:bg-th-text/30 transition-colors pointer-events-none" />
            </>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-th-text font-semibold text-sm mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-th-muted text-xs leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium border"
                  style={{
                    color: tagColors[i],
                    borderColor: `${tagColors[i]}33`,
                    backgroundColor: `${tagColors[i]}11`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {mediaType === "github" && (
                <span className="text-[10px] font-medium text-th-muted flex items-center gap-0.5">
                  ⭐ GitHub
                </span>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-0.5"
                >
                  ▶ {t("portfolio.demo") as string}
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target={liveUrl.startsWith("/") ? undefined : "_blank"}
                  rel={liveUrl.startsWith("/") ? undefined : "noopener noreferrer"}
                  className="text-[10px] font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-0.5"
                >
                  ↗ Live
                </a>
              )}
            </div>
          </div>
        </div>
        </Link>
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
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={title}
                width={1200}
                height={800}
                style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                className="rounded-lg"
                unoptimized={image.startsWith('https://')}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
