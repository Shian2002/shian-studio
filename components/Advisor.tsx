"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const TIER_META = [
  {
    id: "plus",
    label: "Plus",
    price: "$290",
    priceCN: "\u00a51,999",
    accent: "#50e3c2",
    popular: false,
  },
  {
    id: "pro",
    label: "Pro",
    price: "$690",
    priceCN: "\u00a54,999",
    accent: "#4a9eff",
    popular: true,
  },
  {
    id: "max",
    label: "Max",
    price: "$1,490",
    priceCN: "\u00a510,999",
    accent: "#bd10e0",
    popular: false,
  },
];

export default function Advisor() {
  const { t, locale } = useLanguage();

  const tiers = (t("advisor.tiers") as Array<{
    name: string;
    description: string;
    priceNote: string;
    cnPrice: string;
    timeCommit: string;
    hourlyRate: string;
    seatsLeft?: string;
    features: string[];
    cta: string;
  }>) || [];

  return (
    <section className="py-16 px-6 bg-th-bg2">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
            {(t("advisor.badge") as string) || "Monthly subscription"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {(t("advisor.title") as string) || "Tech Advisor Subscription"}
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto">
            {(t("advisor.subtitle") as string) ||
              "Not ready for a full project? Get ongoing technical guidance via text."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:items-start">
          {tiers.map((tier, i) => {
            const meta = TIER_META[i];
            if (!meta) return null;
            const displayPrice = locale === "zh" ? `¥${meta.priceCN.replace("¥", "")}` : meta.price;

            return (
              <motion.div
                key={meta.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className={`h-full rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col ${
                  meta.popular
                    ? "bg-th-card border-accent/50 shadow-[0_24px_80px_rgba(74,158,255,0.18)]"
                    : "bg-th-card/70 border-th-border hover:border-th-border-m"
                }`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)`,
                    opacity: meta.popular ? 1 : 0.5,
                  }}
                  aria-hidden="true"
                />

                {meta.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg">
                    {(t("advisor.popular") as string) || "Most popular"}
                  </div>
                )}

                <div className="mb-4">
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: meta.accent }}
                  >
                    {meta.label}
                  </h3>
                  <p className="text-th-muted text-xs leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-th-text">
                      {displayPrice}
                    </span>
                    <span className="text-th-subtle text-xs">{tier.priceNote}</span>
                  </div>
                  <p className="text-[11px] text-th-subtle mt-0.5">{tier.cnPrice}</p>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-block rounded-md bg-th-bg-s px-2 py-0.5 text-[10px] text-th-muted border border-th-border">
                    {tier.timeCommit}
                  </span>
                  <span className="inline-block rounded-md bg-th-bg-s px-2 py-0.5 text-[10px] text-th-muted border border-th-border">
                    {tier.hourlyRate}
                  </span>
                  {tier.seatsLeft && (
                    <span className="inline-block rounded-md bg-coral/10 px-2 py-0.5 text-[10px] text-coral border border-coral/20">
                      {tier.seatsLeft}
                    </span>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-th-text2"
                    >
                      <span
                        className="mt-0.5 shrink-0 text-xs"
                        style={{ color: meta.accent }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact?source=advisor"
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border mt-auto ${
                    meta.popular
                      ? "text-white border-transparent hover:opacity-90"
                      : "text-th-text bg-th-bg-s border-th-border hover:border-th-border-m"
                  }`}
                  style={meta.popular ? { backgroundColor: meta.accent } : undefined}
                >
                  {tier.cta}
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-th-card border border-th-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1" aria-hidden="true">{"\u{1F6E1}"}</div>
              <p className="text-xs font-medium text-th-text mb-0.5">
                {(t("advisor.trust1Title") as string) || "Bounded workload"}
              </p>
              <p className="text-[11px] text-th-muted leading-relaxed">
                {(t("advisor.trust1Desc") as string) || "Monthly message limits prevent overload."}
              </p>
            </div>
            <div className="bg-th-card border border-th-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1" aria-hidden="true">{"\u{1F916}"}</div>
              <p className="text-xs font-medium text-th-text mb-0.5">
                {(t("advisor.trust2Title") as string) || "AI-powered triage"}
              </p>
              <p className="text-[11px] text-th-muted leading-relaxed">
                {(t("advisor.trust2Desc") as string) || "An AI assistant handles common questions."}
              </p>
            </div>
            <div className="bg-th-card border border-th-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1" aria-hidden="true">{"\u{1F4AC}"}</div>
              <p className="text-xs font-medium text-th-text mb-0.5">
                {(t("advisor.trust3Title") as string) || "100% text-based"}
              </p>
              <p className="text-[11px] text-th-muted leading-relaxed">
                {(t("advisor.trust3Desc") as string) || "No video calls. Cancel anytime."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
