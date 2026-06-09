"use client";

import { motion } from "framer-motion";

export default function HireBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/20"
    >
      <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
      <span className="text-mint text-xs font-medium">Available for hire</span>
    </motion.div>
  );
}
