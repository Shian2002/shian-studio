"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  icon: string;
  title: string;
  description: string;
  step: number;
  index?: number;
  isLast?: boolean;
}

const stepColors = [
  { text: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  { text: "text-mint", bg: "bg-mint/10", border: "border-mint/30" },
  { text: "text-amber", bg: "bg-amber/10", border: "border-amber/30" },
  { text: "text-purple", bg: "bg-purple/10", border: "border-purple/30" },
];

export default function ProcessStep({ icon, title, description, step, index = 0, isLast }: ProcessStepProps) {
  const color = stepColors[step - 1] || stepColors[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="relative bg-surface/40 border border-white/5 hover:border-white/15 rounded-2xl p-6 transition-all duration-300"
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${color.bg} ${color.border} border mb-4 text-lg`}>
        {icon}
      </div>
      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${color.bg} ${color.border} border mb-3`}>
        <span className={`text-[10px] font-bold ${color.text}`}>{String(step).padStart(2, "0")}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent" aria-hidden="true" />
      )}
    </motion.div>
  );
}
