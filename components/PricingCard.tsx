"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const COLOR_MAP: Record<string, string> = {
  accent: "#4a9eff",
  mint: "#50e3c2",
  purple: "#bd10e0",
  amber: "#f5a623",
};

function resolveColor(color: string): string {
  return COLOR_MAP[color] ?? color;
}

interface Props {
  name: string;
  description: string;
  subtitle?: string;
  bestFor?: string;
  price: string | null;
  priceNote?: string | null;
  highlight?: boolean;
  accentColor?: string;
  isCustom?: boolean;
  features: readonly string[];
}

export default function PricingCard({
  name,
  description,
  subtitle,
  bestFor,
  price,
  priceNote,
  highlight,
  accentColor = "accent",
  isCustom,
  features,
}: Props) {
  const { t } = useLanguage();
  const color = resolveColor(accentColor);

  const translatedPriceNote = priceNote === "per project"
    ? (t("pricing.perProject") as string)
    : priceNote === "custom quote"
    ? (t("pricing.customQuote") as string)
    : priceNote;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden ${
        highlight
          ? "bg-th-card border-th-border-s shadow-lg"
          : "border-th-border hover:border-th-border-m"
      }`}
    >
      {highlight && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      )}

      <div className="mb-4">
        <h3
          className="text-lg font-semibold mb-1"
          style={{ color }}
        >
          {name}
          {subtitle && (
            <span className="text-th-muted text-xs font-normal ml-2">{subtitle}</span>
          )}
        </h3>
        <p className="text-th-muted text-xs">{description}</p>
        {bestFor && (
          <p className="text-th-subtle text-xs mt-1">{bestFor}</p>
        )}
      </div>

      <div className="mb-5">
        {isCustom ? (
          <span className="text-2xl font-bold text-th-text">Custom</span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-th-text">{price}</span>
            {translatedPriceNote && (
              <span className="text-th-subtle text-xs">{translatedPriceNote}</span>
            )}
          </div>
        )}
      </div>

      <ul className="space-y-2.5 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-th-text2">
            <span
              className="mt-0.5 shrink-0 text-xs"
              style={{ color }}
              aria-hidden="true"
            >
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`block w-full text-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
          highlight
            ? "text-white border-transparent hover:opacity-90"
            : "text-th-text bg-th-bg-s border-th-border hover:border-th-border-m"
        }`}
        style={highlight ? { backgroundColor: color } : undefined}
      >
        {isCustom ? t("pricing.ctaCustom") as string : t("pricing.cta") as string}
      </a>
    </motion.div>
  );
}
