"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  icon: string;
  title: string;
  description: string;
  step: number;
  isLast: boolean;
}

const stepColors = [
  { text: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  { text: "text-mint", bg: "bg-mint/10", border: "border-mint/30" },
  { text: "text-amber", bg: "bg-amber/10", border: "border-amber/30" },
  { text: "text-purple", bg: "bg-purple/10", border: "border-purple/30" },
];

export default function ProcessStep({ icon, title, description, step, isLast }: ProcessStepProps) {
  const color = stepColors[step - 1] || stepColors[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: step * 0.15, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className={`min-w-[140px] p-4 bg-surface rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300`}>
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${color.bg} ${color.border} border mb-3`}>
          <span className={`text-xs font-bold ${color.text}`}>{step}</span>
        </div>
        <div className="text-3xl mb-2">{icon}</div>
        <div className={`text-xs font-semibold ${color.text} mb-1 uppercase tracking-wider`}>
          Step {step}
        </div>
        <div className="text-sm text-white font-medium">{title}</div>
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      </div>

      {!isLast && (
        <div className="hidden lg:flex absolute top-1/2 -right-3 items-center">
          <span className="w-6 h-px bg-white/10" />
        </div>
      )}
    </motion.div>
  );
}
