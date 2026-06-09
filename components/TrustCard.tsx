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
      transition={{ delay: index * 0.1 }}
      className="bg-surface p-4 rounded-lg text-center border border-white/5"
    >
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </motion.div>
  );
}
