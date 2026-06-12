"use client";

import { motion } from "framer-motion";

interface Props {
  value: string;
  label: string;
  index: number;
}

export default function TrustCard({ value, label, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="bg-th-card border border-th-border rounded-xl p-4 text-center hover:border-th-border-m transition-colors"
    >
      <div className="text-2xl font-bold bg-gradient-to-r from-accent to-mint bg-clip-text text-transparent mb-1">
        {value}
      </div>
      <div className="text-xs text-th-subtle">{label}</div>
    </motion.div>
  );
}
