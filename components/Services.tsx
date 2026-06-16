"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import PricingCard from "./PricingCard";

const SERVICE_ORDER = ["landing-page", "mvp-sprint", "ai-dashboard", "saas-build"];
const STAIR_OFFSETS = ["lg:mt-8", "lg:mt-6", "lg:mt-4", "lg:mt-0"];
const ADVISOR_TIERS = [
  {
    id: "async",
    price: "$290",
    priceCN: "1,999",
    accent: "#50e3c2",
    popular: false,
  },
  {
    id: "standard",
    price: "$690",
    priceCN: "4,999",
    accent: "#4a9eff",
    popular: true,
  },
  {
    id: "embedded",
    price: "$1,490",
    priceCN: "10,999",
    accent: "#bd10e0",
    popular: false,
  },
];

interface ServicesProps {
  compact?: boolean;
  includeSubscription?: boolean;
}

interface AdvisorTier {
  name: string;
  description: string;
  priceNote: string;
  cnPrice: string;
  timeCommit?: string;
  hourlyRate?: string;
  seatsLeft?: string;
  features: string[];
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
  const advisorTiers = (t("advisor.tiers") as AdvisorTier[]) || [];
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

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${compact ? "gap-4" : "gap-5"} lg:items-start`}>
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
            className="mt-14"
            aria-label={(t("advisor.badge") as string) || "Tech Advisor"}
          >
            <div className="text-center mb-7">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
                {(t("advisor.badge") as string) || "Monthly subscription"}
              </p>
              <h3 className={`${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-[2.4rem]"} font-semibold text-th-text`}>
                {(t("advisor.title") as string) || "Tech Advisor Subscription"}
              </h3>
              <p className="text-th-muted text-sm max-w-2xl mx-auto mt-2">
                {(t("advisor.subtitle") as string) ||
                  "Need ongoing support between projects? Subscribe for technical guidance."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {advisorTiers.map((tier, i) => {
                const meta = ADVISOR_TIERS[i];
                if (!meta) return null;
                const localPrice = locale === "zh" ? `¥${meta.priceCN}` : meta.price;
                const featured = i === 1;

                return (
                  <motion.div
                    key={meta.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className={`relative rounded-xl p-5 border transition-all duration-300 overflow-hidden ${
                      featured
                        ? "bg-th-card border-th-border-s shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
                        : "bg-th-card/80 border-th-border hover:border-th-border-m"
                    }`}
                    style={{
                      background: featured
                        ? `linear-gradient(150deg, ${meta.accent}24 0%, rgba(255,255,255,0.035) 34%, var(--bg-card) 76%)`
                        : `linear-gradient(150deg, ${meta.accent}10 0%, var(--bg-card) 72%)`,
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)`,
                        opacity: featured ? 0.9 : 0.45,
                      }}
                      aria-hidden="true"
                    />

                    {featured && (
                      <div className="absolute left-5 top-4 rounded-md bg-th-bg-s border border-th-border-m px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-th-text whitespace-nowrap">
                        {(t("advisor.popular") as string) || "Popular"}
                      </div>
                    )}

                    <div className={`flex items-start justify-between gap-4 mb-3 ${featured ? "pt-8" : "pt-1"}`}>
                      <div>
                        <h4 className="text-lg font-semibold leading-tight" style={{ color: meta.accent }}>
                          {tier.name}
                        </h4>
                        <p className="text-xs text-th-muted mt-1 leading-relaxed max-w-xs">
                          {tier.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-th-text">{localPrice}</p>
                        <p className="text-th-subtle text-xs leading-none">{tier.priceNote}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tier.timeCommit && (
                          <span className="text-[11px] rounded-md bg-th-bg-s px-3 py-1 border border-th-border text-th-muted">
                          {tier.timeCommit}
                        </span>
                      )}
                      {tier.hourlyRate && (
                          <span className="text-[11px] rounded-md bg-th-bg-s px-3 py-1 border border-th-border text-th-muted">
                          {tier.hourlyRate}
                        </span>
                      )}
                      {tier.cnPrice && (
                          <span className="text-[11px] rounded-md bg-th-bg-s px-3 py-1 border border-th-border text-th-muted">
                          {tier.cnPrice}
                        </span>
                      )}
                      {tier.seatsLeft && (
                          <span className="text-[11px] rounded-md bg-coral/10 text-coral border border-coral/20 px-3 py-1">
                          {tier.seatsLeft}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 mb-4">
                      {(tier.features || []).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-th-text2">
                          <span
                            className="mt-2 shrink-0 h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: meta.accent }}
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/advisor"
                      className={`block w-full text-center rounded-lg py-2.5 text-sm font-medium border transition-colors mt-auto ${
                        featured
                          ? "text-white bg-accent border-transparent hover:opacity-90"
                          : "text-th-text bg-th-bg-s border-th-border hover:border-th-border-m"
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
