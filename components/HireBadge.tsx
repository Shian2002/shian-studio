"use client";

import { motion } from "framer-motion";

export default function HireBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/30 hover:bg-mint/20 transition-colors cursor-default"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
      </span>
      <span className="text-mint text-xs font-medium">Available for hire</span>
    </motion.div>
  );
}
