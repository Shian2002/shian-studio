"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import VideoCard from "./VideoCard";

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "mini", label: "Mini Programs" },
  { id: "showcase", label: "Showcase" },
];

function classify(item: (typeof PORTFOLIO_ITEMS)[number]) {
  const title = item.title.toLowerCase();
  if (title.includes("dashboard") || title.includes("saas") || title.includes("web app")) return "web";
  if (title.includes("mini program") || title.includes("wechat")) return "mini";
  return "showcase";
}

export default function Portfolio() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => classify(i) === filter);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 px-6 bg-[#080810]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Recent Work
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Watch how I build production-ready projects from scratch — powered by AI.
          </p>
        </motion.div>

        <div
          ref={ref}
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
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  active
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "bg-surface/50 border-white/5 text-gray-400 hover:text-white hover:border-white/15"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <VideoCard
                title={item.title}
                description={item.description}
                tags={item.tags}
                tagColors={item.tagColors}
                youtubeId={item.youtubeId}
              />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-12">
            No projects in this category yet — more coming soon.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="text-accent hover:text-accent/80 transition-colors font-medium text-sm"
          >
            Want something like this? Let&apos;s talk →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
