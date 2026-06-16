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
  const isHighlighted = Boolean(highlight || premium);
  const highlightAlpha = premium ? "24" : ["10", "14", "18", "1d"][tierLevel] ?? "12";

  const translatedPriceNote = priceNote === "per project"
    ? (t("pricing.perProject") as string)
    : priceNote === "custom quote"
    ? (t("pricing.customQuote") as string)
    : priceNote;
  const flagshipLabel = (t("pricing.flagship") as string | undefined) ?? "Flagship";

  return (
    <motion.div
      whileHover={{ y: premium ? -5 : -3 }}
      transition={{ duration: 0.2 }}
      className={`h-full rounded-xl ${compact ? "p-5" : "p-6"} border transition-all duration-300 relative overflow-hidden flex flex-col ${
        premium
          ? "bg-th-card border-th-border-s shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
          : "bg-th-card/80 border-th-border hover:border-th-border-m"
      }`}
      style={{
        background: `linear-gradient(150deg, ${color}${highlightAlpha} 0%, rgba(255,255,255,0.035) 34%, var(--bg-card) 76%)`,
      }}
    >
      {isHighlighted && (
        <>
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-70"
            style={{
              background: `linear-gradient(180deg, ${color}26 0%, transparent 42%)`,
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-[1px] rounded-[10px] border border-white/5"
            aria-hidden="true"
          />
        </>
      )}

      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${tierLevel === 0 ? "transparent" : color}, ${color}, ${premium ? "#50e3c2" : "transparent"})`,
          opacity: premium ? 0.95 : 0.55,
        }}
        aria-hidden="true"
      />

      {premium && (
        <div className="absolute right-4 top-4 rounded-md bg-th-bg-s border border-th-border-m px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-th-text">
          {flagshipLabel}
        </div>
      )}

      {highlight && !premium && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          aria-hidden="true"
        />
      )}

      <div className={`relative ${compact ? "mb-3" : "mb-4"}`}>
        <h3
          className={`${premium ? "text-xl" : "text-lg"} font-semibold mb-1 ${premium ? "pr-16" : ""}`}
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

      <div className={`relative ${compact ? "mb-4" : "mb-5"}`}>
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

      <ul className={`relative ${compact ? "space-y-2 mb-4" : "space-y-2.5 mb-6"}`}>
        {(compact ? features.slice(0, 3) : features).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-th-text2">
            <span
              className="mt-2 shrink-0 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="/contact?source=pricing"
        className={`relative block w-full text-center py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border mt-auto ${
          highlight
            ? "text-white border-transparent hover:opacity-90 shadow-[0_10px_28px_rgba(74,158,255,0.20)]"
            : "text-th-text bg-th-bg-s border-th-border hover:border-th-border-m"
        }`}
        style={highlight ? { backgroundColor: color } : undefined}
      >
        {isCustom ? t("pricing.ctaCustom") as string : t("pricing.cta") as string}
      </a>
    </motion.div>
  );
}
