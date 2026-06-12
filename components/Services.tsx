"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import PricingCard from "./PricingCard";

const SERVICE_ORDER = ["landing-page", "mvp-sprint", "ai-dashboard", "saas-build"];
const STAIR_OFFSETS = ["lg:mt-12", "lg:mt-8", "lg:mt-4", "lg:mt-0"];

export default function Services({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  const translatedTiers = t("pricing.tiers") as Array<{
    name: string;
    description: string;
    features: string[];
  }>;
  const orderedTiers = SERVICE_ORDER
    .map((id) => PRICING_TIERS.find((tier) => tier.id === id))
    .filter((tier): tier is (typeof PRICING_TIERS)[number] => Boolean(tier));

  return (
    <section id="services" aria-label={t("services.title") as string} className={`${compact ? "py-14" : "py-16"} px-6 bg-th-bg2`}>
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
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {t("services.title") as string}
          </h2>
          <p className="text-th-muted max-w-xl mx-auto">
            {t("services.description") as string}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:items-start">
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
      </div>
    </section>
  );
}
