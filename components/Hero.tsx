"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0a0a1a] to-[#1a0a2e]" />
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extralight tracking-brand text-white mb-4"
        >
          {BRAND.name}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-16 h-0.5 bg-mint mx-auto mb-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base tracking-widest text-mint uppercase mb-6"
        >
          {BRAND.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-gray-300 italic mb-10"
        >
          &ldquo;{BRAND.tagline}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 hover:shadow-[0_0_30px_rgba(74,158,255,0.3)] transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
