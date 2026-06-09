"use client";

import { motion } from "framer-motion";

interface TrustCardProps {
  value: string;
  label: string;
  index?: number;
}

export default function TrustCard({ value, label, index = 0 }: TrustCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="bg-surface p-5 rounded-xl text-center border border-white/5 hover:border-white/15 transition-all duration-300"
    >
      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent tabular-nums">
        {value}
      </div>
      <div className="text-xs text-gray-500 mt-2 uppercase tracking-widest leading-tight">
        {label}
      </div>
    </motion.div>
  );
}
