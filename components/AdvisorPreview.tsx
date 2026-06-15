"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const TIER_META = [
  { id: "async", price: "$290", priceCN: "1,999", accent: "#50e3c2", popular: false },
  { id: "standard", price: "$690", priceCN: "4,999", accent: "#4a9eff", popular: true },
  { id: "embedded", price: "$1,490", priceCN: "10,999", accent: "#bd10e0", popular: false },
];

export default function AdvisorPreview() {
  const { t, locale } = useLanguage();

  const tiers = (t("advisor.tiers") as Array<{
    name: string;
    description: string;
    priceNote: string;
    cnPrice: string;
    features: string[];
  }>) || [];

  if (!tiers.length) return null;

  return (
    <section
      id="advisor"
      aria-label={(t("nav.advisor") as string) || "Tech Advisor"}
      className="py-16 px-6 bg-th-bg2"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
            {(t("advisor.badge") as string) || "Monthly subscription"}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-th-text mb-3">
            {(t("advisorPreview.title") as string) || "Need a Tech Advisor?"}
          </h2>
          <p className="text-th-muted max-w-xl mx-auto text-sm leading-relaxed">
            {(t("advisorPreview.subtitle") as string) ||
              "Subscribe monthly and get async text-based technical guidance."}
          </p>
        </motion.div>

        {/* Compact pricing row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tiers.map((tier, i) => {
            const meta = TIER_META[i];
            if (!meta) return null;
            const displayPrice = locale === "zh"
              ? `¥${meta.priceCN}`
              : meta.price;

            return (
              <motion.div
                key={meta.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className={`relative rounded-xl p-5 border transition-all duration-300 ${
                  meta.popular
                    ? "bg-th-card border-accent/40 shadow-[0_8px_40px_rgba(74,158,255,0.12)] md:scale-[1.03]"
                    : "bg-th-card/60 border-th-border hover:border-th-border-m"
                }`}
              >
                {meta.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    {(t("advisor.popular") as string) || "Popular"}
                  </div>
                )}

                {/* Tier name + price */}
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-sm font-semibold" style={{ color: meta.accent }}>
                    {tier.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-lg font-bold text-th-text">{displayPrice}</span>
                    <span className="text-th-subtle text-[10px] block leading-tight">{tier.priceNote}</span>
                  </div>
                </div>

                <p className="text-th-muted text-xs mb-3 leading-relaxed">{tier.description}</p>

                {/* Top 2 features only */}
                <ul className="space-y-1 mb-4">
                  {tier.features.slice(0, 2).map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5 text-xs text-th-text2">
                      <span className="mt-0.5 shrink-0" style={{ color: meta.accent }}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="/advisor"
                  className={`block w-full text-center py-2 rounded-lg text-xs font-medium transition-all ${
                    meta.popular
                      ? "text-white hover:opacity-90"
                      : "text-th-text bg-th-bg-s border border-th-border hover:border-th-border-m"
                  }`}
                  style={meta.popular ? { backgroundColor: meta.accent } : undefined}
                >
                  {(t("advisorPreview.viewDetails") as string) || "View details"} →
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* See all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-center mt-5"
        >
          <a
            href="/advisor"
            className="inline-flex items-center gap-1 text-xs text-th-muted hover:text-accent transition-colors"
          >
            {(t("advisorPreview.seeAll") as string) || "See all plans & details"} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
