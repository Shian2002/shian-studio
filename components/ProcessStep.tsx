"use client";

import { motion } from "framer-motion";

interface Props {
  icon: string;
  title: string;
  description: string;
  step: number;
  index: number;
  isLast: boolean;
  stepLabel: string;
}

export default function ProcessStep({
  icon,
  title,
  description,
  step,
  index,
  isLast,
  stepLabel,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative"
    >
      <div className="bg-th-card border border-th-border rounded-2xl p-5 h-full hover:border-th-border-m transition-colors">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl" aria-hidden="true">
            {icon}
          </span>
          <span className="text-[10px] font-mono text-th-subtle">
            STEP {String(step).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-th-text font-semibold text-sm mb-2">{title}</h3>
        <p className="text-th-muted text-xs leading-relaxed">{description}</p>
      </div>

      {!isLast && (
        <div
          className="hidden lg:block absolute top-1/2 -right-2 w-4 text-th-dim"
          aria-hidden="true"
        >
          →
        </div>
      )}
    </motion.div>
  );
}
