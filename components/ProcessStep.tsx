"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  icon: string;
  title: string;
  description: string;
  step: number;
  isLast: boolean;
}

const stepColors = ["text-accent", "text-mint", "text-amber", "text-coral"];

export default function ProcessStep({ icon, title, description, step, isLast }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: step * 0.15 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="min-w-[140px] p-4 bg-surface rounded-xl">
        <div className="text-3xl mb-2">{icon}</div>
        <div className={`text-xs font-semibold ${stepColors[step - 1]} mb-1`}>
          Step {step}
        </div>
        <div className="text-sm text-white font-medium">{title}</div>
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      </div>

      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/10" />
      )}
    </motion.div>
  );
}
