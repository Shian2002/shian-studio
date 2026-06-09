"use client";

import { motion } from "framer-motion";

interface TrustCardProps {
  value: string;
  label: string;
  index: number;
}

export default function TrustCard({ value, label, index }: TrustCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="bg-surface p-4 rounded-lg text-center border border-white/5 hover:border-white/15 transition-all duration-300"
    >
      <div className="text-2xl font-bold text-gradient">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </motion.div>
  );
}
