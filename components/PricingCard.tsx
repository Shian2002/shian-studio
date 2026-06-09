"use client";

import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  description: string;
  price: string | null;
  priceNote: string | null;
  highlight: boolean;
  accentColor: string;
  isCustom?: boolean;
  features: readonly string[];
}

const colorMap: Record<string, { border: string; badge: string; text: string }> = {
  mint: { border: "border-mint/40", badge: "text-mint", text: "text-mint" },
  accent: { border: "border-accent/60", badge: "text-accent", text: "text-accent" },
  purple: { border: "border-purple/40", badge: "text-purple", text: "text-purple" },
  amber: { border: "border-amber/40", badge: "text-amber", text: "text-amber" },
};

export default function PricingCard({
  name,
  description,
  price,
  priceNote,
  highlight,
  accentColor,
  isCustom,
  features,
}: PricingCardProps) {
  const colors = colorMap[accentColor] || colorMap.accent;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative flex flex-col rounded-xl p-6 bg-surface ${
        highlight
          ? `border-2 ${colors.border} shadow-lg`
          : "border border-white/5"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={`text-xs px-3 py-1 rounded-full bg-accent/20 ${colors.badge}`}>
            ⭐ Recommended
          </span>
        </div>
      )}

      <div className={`text-xs tracking-widest uppercase ${colors.badge} mb-2`}>
        {name}
      </div>
      <p className="text-sm text-gray-400 mb-4">{description}</p>

      {price ? (
        <>
          <div className="text-3xl font-bold text-white mb-1">{price}</div>
          <div className="text-xs text-gray-500 mb-6">{priceNote}</div>
        </>
      ) : (
        <div className="mb-6" />
      )}

      {features.length > 0 && (
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature) => (
            <li key={feature} className="text-sm text-gray-300 flex items-start gap-2">
              <span className={`${colors.text} mt-0.5`}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {isCustom ? (
        <a
          href="#contact"
          className="block text-center py-3 rounded-lg border-2 border-amber text-amber font-medium hover:bg-amber/10 transition-all duration-200"
        >
          Get a Free Quote →
        </a>
      ) : (
        <a
          href="#contact"
          className={`block text-center py-3 rounded-lg font-medium transition-all duration-200 ${
            highlight
              ? "bg-accent text-white hover:bg-accent/80"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          Get Started
        </a>
      )}
    </motion.div>
  );
}
