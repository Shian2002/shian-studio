"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  title: string;
  description: string;
  tags: readonly string[];
  tagColors: readonly string[];
  youtubeId: string;
}

export default function VideoCard({
  title,
  description,
  tags,
  tagColors,
  youtubeId,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const isPlaceholder = youtubeId.startsWith("PLACEHOLDER");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-surface rounded-xl overflow-hidden border border-white/5"
    >
      <div className="relative aspect-video bg-black">
        {playing && !isPlaceholder ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => !isPlaceholder && setPlaying(true)}
            className={`absolute inset-0 flex items-center justify-center ${isPlaceholder ? "cursor-not-allowed" : "group cursor-pointer"}`}
            aria-label={isPlaceholder ? "Video coming soon" : "Play video"}
            disabled={isPlaceholder}
          >
            {!isPlaceholder && (
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            {isPlaceholder && (
              <div className="text-gray-500 text-xs">
                Coming soon
              </div>
            )}
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
              VIDEO
            </div>
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${tagColors[i]}15`,
                color: tagColors[i],
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
