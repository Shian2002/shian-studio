"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import PricingCard from "./PricingCard";

export default function Services() {
  const { t } = useLanguage();

  const translatedTiers = t("pricing.tiers") as Array<{
    name: string;
    description: string;
    features: string[];
  }>;

  return (
    <section id="services" aria-label={t("services.title") as string} className="py-24 px-6 bg-th-bg2">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier, i) => {
            const translated = translatedTiers[i];
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <PricingCard
                  name={translated?.name ?? tier.name}
                  description={translated?.description ?? tier.description}
                  price={tier.price}
                  priceNote={tier.priceNote}
                  highlight={tier.highlight}
                  accentColor={tier.accentColor}
                  isCustom={"isCustom" in tier ? Boolean(tier.isCustom) : false}
                  features={(translated?.features ?? tier.features) as readonly string[]}
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
