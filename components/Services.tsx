"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import PricingCard from "./PricingCard";

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-gradient-to-b from-navy/50 via-[#0a0a1a] to-[#080810]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Services & Pricing
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Transparent pricing. No hidden fees. Choose a package or get a custom quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <PricingCard
                name={tier.name}
                description={tier.description}
                price={tier.price}
                priceNote={tier.priceNote}
                highlight={tier.highlight}
                accentColor={tier.accentColor}
                isCustom={"isCustom" in tier ? Boolean(tier.isCustom) : false}
                features={tier.features}
              />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          All prices are starting rates. Final quote based on project scope.
        </p>
      </div>
    </section>
  );
}
