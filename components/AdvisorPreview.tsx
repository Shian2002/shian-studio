"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const TIER_META = [
  { id: "async", price: "$290", priceCN: "\u00a51,999", accent: "#50e3c2", popular: false },
  { id: "standard", price: "$690", priceCN: "\u00a54,999", accent: "#4a9eff", popular: true },
  { id: "embedded", price: "$1,490", priceCN: "\u00a510,999", accent: "#bd10e0", popular: false },
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
    <section className="py-16 px-6 bg-th-bg">
      <div className="max-w-6xl mx-auto">
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
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-3">
            {(t("advisorPreview.title") as string) || "Need a Tech Advisor?"}
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto text-sm">
            {(t("advisorPreview.subtitle") as string) ||
              "Subscribe monthly and get async text-based technical guidance. No video calls, no phone."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => {
            const meta = TIER_META[i];
            if (!meta) return null;
            const displayPrice = locale === "zh" ? `¥${meta.priceCN.replace("¥", "")}` : meta.price;

            return (
              <motion.div
                key={meta.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-5 border transition-all duration-300 relative ${
                  meta.popular
                    ? "bg-th-card border-accent/50 shadow-[0_16px_60px_rgba(74,158,255,0.15)]"
                    : "bg-th-card/70 border-th-border hover:border-th-border-m"
                }`}
              >
                {meta.popular && (
                  <div className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {(t("advisor.popular") as string) || "Popular"}
                  </div>
                )}

                <h3 className="text-base font-semibold mb-1" style={{ color: meta.accent }}>
                  {tier.name}
                </h3>
                <p className="text-th-muted text-xs mb-3">{tier.description}</p>

                <div className="mb-3">
                  <span className="text-2xl font-bold text-th-text">{displayPrice}</span>
                  <span className="text-th-subtle text-xs ml-1">{tier.priceNote}</span>
                </div>

                <ul className="space-y-1.5 mb-4">
                  {tier.features.slice(0, 3).map((feature) => (
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

        <div className="text-center mt-6">
          <a
            href="/advisor"
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            {(t("advisorPreview.seeAll") as string) || "See all plans & details"} →
          </a>
        </div>
      </div>
    </section>
  );
}
