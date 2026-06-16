"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import PricingCard from "./PricingCard";

const SERVICE_ORDER = ["landing-page", "mvp-sprint", "ai-dashboard", "saas-build"];
const STAIR_OFFSETS = ["lg:mt-8", "lg:mt-6", "lg:mt-3", "lg:mt-0"];
const ADVISOR_TIERS = [
  { id: "async", price: "$290", priceCN: "1,999", accent: "#50e3c2", popular: false },
  { id: "standard", price: "$690", priceCN: "4,999", accent: "#4a9eff", popular: true },
  { id: "embedded", price: "$1,490", priceCN: "10,999", accent: "#bd10e0", popular: false },
];

interface ServicesProps {
  compact?: boolean;
  includeSubscription?: boolean;
}

export default function Services({
  compact = false,
  includeSubscription = false,
}: ServicesProps) {
  const { t, locale } = useLanguage();

  const translatedTiers = t("pricing.tiers") as Array<{
    name: string;
    description: string;
    features: string[];
  }>;
  const advisorTiers = (t("advisor.tiers") as Array<{
    name: string;
    description: string;
    priceNote: string;
  }>) || [];
  const orderedTiers = SERVICE_ORDER
    .map((id) => PRICING_TIERS.find((tier) => tier.id === id))
    .filter((tier): tier is (typeof PRICING_TIERS)[number] => Boolean(tier));

  return (
    <section
      id="services"
      aria-label={t("services.title") as string}
      className={`${compact ? "py-14" : "py-16"} px-6 bg-th-bg2`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t("services.badge") as string}
          </div>
          <h2 className={`${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"} font-bold text-th-text mb-4`}>
            {t("services.title") as string}
          </h2>
          <p className="text-th-muted max-w-xl mx-auto">
            {t("services.description") as string}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${compact ? "gap-3" : "gap-4"} lg:items-start`}>
          {orderedTiers.map((tier, i) => {
            const originalIndex = PRICING_TIERS.findIndex((item) => item.id === tier.id);
            const translated = translatedTiers[originalIndex];
            const premium = tier.id === "saas-build";
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`h-full ${STAIR_OFFSETS[i] ?? ""}`}
              >
                <PricingCard
                  name={translated?.name ?? tier.name}
                  description={translated?.description ?? tier.description}
                  price={tier.price}
                  priceNote={tier.priceNote}
                  highlight={premium}
                  accentColor={tier.accentColor}
                  isCustom={"isCustom" in tier ? Boolean(tier.isCustom) : false}
                  features={(translated?.features ?? tier.features) as readonly string[]}
                  compact={compact}
                  premium={premium}
                  tierLevel={i}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-th-subtle mt-8"
        >
          {t("services.footer") as string}
        </motion.p>

        {includeSubscription && advisorTiers.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-12"
            aria-label={(t("advisor.badge") as string) || "Tech Advisor"}
          >
            <div className="text-center mb-6">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
                {(t("advisor.badge") as string) || "Monthly subscription"}
              </p>
              <h3 className={`${compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"} font-semibold text-th-text`}>
                {(t("advisor.title") as string) || "Tech Advisor Subscription"}
              </h3>
              <p className="text-th-muted text-sm max-w-xl mx-auto mt-2">
                {(t("advisor.subtitle") as string) ||
                  "Need ongoing support between projects? Subscribe for technical guidance."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {advisorTiers.map((tier, i) => {
                const meta = ADVISOR_TIERS[i];
                if (!meta) return null;
                const localPrice = locale === "zh" ? `¥${meta.priceCN}` : meta.price;

                return (
                  <motion.div
                    key={meta.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                    className={`relative rounded-xl p-4 border transition-all duration-300 ${
                      meta.popular
                        ? "bg-th-card border-accent/40 shadow-[0_8px_40px_rgba(74,158,255,0.12)]"
                        : "bg-th-card/60 border-th-border hover:border-th-border-m"
                    }`}
                    style={meta.popular ? { background: `linear-gradient(180deg, ${meta.accent}14, transparent)` } : undefined}
                  >
                    {meta.popular && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                        {(t("advisor.popular") as string) || "Popular"}
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold" style={{ color: meta.accent }}>
                        {tier.name}
                      </h4>
                      <div className="text-right">
                        <p className="text-lg font-bold text-th-text">{localPrice}</p>
                        <p className="text-th-subtle text-[10px] leading-none">{tier.priceNote}</p>
                      </div>
                    </div>

                    <p className="text-xs text-th-muted leading-relaxed mb-3">
                      {tier.description}
                    </p>

                    <a
                      href="/advisor"
                      className={`block w-full text-center rounded-lg py-2 text-xs font-medium border transition-colors ${
                        meta.popular
                          ? "bg-accent text-white border-transparent hover:opacity-90"
                          : "bg-th-bg-s text-th-text border-th-border hover:border-th-border-m"
                      }`}
                    >
                      {(t("advisorPreview.viewDetails") as string) || "View details"}
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </section>
  );
}
