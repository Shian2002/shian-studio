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
  compact?: boolean;
  premium?: boolean;
  tierLevel?: number;
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
  compact = false,
  premium = false,
  tierLevel = 0,
}: Props) {
  const { t } = useLanguage();
  const color = resolveColor(accentColor);

  const translatedPriceNote = priceNote === "per project"
    ? (t("pricing.perProject") as string)
    : priceNote === "custom quote"
    ? (t("pricing.customQuote") as string)
    : priceNote;
  const flagshipLabel = (t("pricing.flagship") as string | undefined) ?? "Flagship";

  return (
    <motion.div
      whileHover={{ y: premium ? -8 : -4 }}
      transition={{ duration: 0.2 }}
      className={`h-full rounded-2xl ${compact ? "p-5" : "p-6"} border transition-all duration-300 relative overflow-hidden flex flex-col ${
        premium
          ? "bg-th-card border-accent/50 shadow-[0_24px_80px_rgba(74,158,255,0.24)]"
          : "bg-th-card/70 border-th-border hover:border-th-border-m"
      }`}
      style={{
        background: premium
          ? "linear-gradient(145deg, rgba(74,158,255,0.18), rgba(189,16,224,0.12) 42%, var(--card-bg, rgba(18,18,24,0.86)) 78%)"
          : undefined,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${tierLevel === 0 ? "transparent" : color}, ${color}, ${premium ? "#50e3c2" : "transparent"})`,
          opacity: premium ? 1 : 0.55,
        }}
        aria-hidden="true"
      />

      {premium && (
        <div className="absolute -right-12 top-6 w-40 rotate-45 bg-accent text-white text-center text-[10px] font-semibold uppercase tracking-wider py-1 shadow-lg">
          {flagshipLabel}
        </div>
      )}

      {highlight && !premium && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      )}

      <div className={compact ? "mb-3" : "mb-4"}>
        <h3
          className={`${premium ? "text-xl" : "text-lg"} font-semibold mb-1`}
          style={{ color }}
        >
          {name}
          {subtitle && (
            <span className="text-th-muted text-xs font-normal ml-2">{subtitle}</span>
          )}
        </h3>
        <p className="text-th-muted text-xs leading-relaxed">{description}</p>
        {bestFor && (
          <p className="text-th-subtle text-xs mt-1">{bestFor}</p>
        )}
      </div>

      <div className={compact ? "mb-4" : "mb-5"}>
        {isCustom ? (
          <span className="text-2xl font-bold text-th-text">Custom</span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className={`${premium ? "text-4xl" : "text-3xl"} font-bold text-th-text`}>{price}</span>
            {translatedPriceNote && (
              <span className="text-th-subtle text-xs">{translatedPriceNote}</span>
            )}
          </div>
        )}
      </div>

      <ul className={`${compact ? "space-y-2 mb-4" : "space-y-2.5 mb-6"}`}>
        {(compact ? features.slice(0, 3) : features).map((feature) => (
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
        href="/contact?source=pricing"
        className={`block w-full text-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border mt-auto ${
          highlight
            ? "text-white border-transparent hover:opacity-90 shadow-[0_12px_34px_rgba(74,158,255,0.28)]"
            : "text-th-text bg-th-bg-s border-th-border hover:border-th-border-m"
        }`}
        style={highlight ? { backgroundColor: color } : undefined}
      >
        {isCustom ? t("pricing.ctaCustom") as string : t("pricing.cta") as string}
      </a>
    </motion.div>
  );
}
