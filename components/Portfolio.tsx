"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import VideoCard from "./VideoCard";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-[#080810]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Portfolio
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Watch how I build production-ready projects from scratch — powered by AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item) => (
            <VideoCard
              key={item.id}
              title={item.title}
              description={item.description}
              tags={item.tags}
              tagColors={item.tagColors}
              youtubeId={item.youtubeId}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="text-accent hover:text-accent/80 transition-colors font-medium"
          >
            Want something like this? Let&apos;s talk →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
