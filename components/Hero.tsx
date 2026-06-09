"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0a0a1a] to-[#1a0a2e]" />

      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-accent/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-purple/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          Available for freelance projects
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-brand text-white mb-6 leading-tight"
        >
          Build <span className="bg-gradient-to-r from-accent via-purple to-mint bg-clip-text text-transparent">faster</span>.
          <br />
          Ship <span className="italic font-light">smarter</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {BRAND.name} Studio builds production-ready websites, mini programs, and SaaS products —
          powered by AI for maximum speed, quality, and affordability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 hover:shadow-[0_0_40px_rgba(74,158,255,0.35)] transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#services"
            className="px-8 py-3 rounded-lg border border-white/15 text-white font-medium hover:bg-white/5 hover:border-white/30 transition-all duration-300"
          >
            See Pricing
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-gray-500 uppercase tracking-widest"
        >
          <span>Next.js</span>
          <span className="text-gray-700">·</span>
          <span>React</span>
          <span className="text-gray-700">·</span>
          <span>Node.js</span>
          <span className="text-gray-700">·</span>
          <span>Python</span>
          <span className="text-gray-700">·</span>
          <span>Mini Programs</span>
          <span className="text-gray-700">·</span>
          <span>SaaS</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border border-white/15 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
