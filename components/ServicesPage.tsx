"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRICING_TIERS, PROCESS_STEPS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const COLOR_MAP: Record<string, string> = {
  accent: "#4a9eff",
  mint: "#50e3c2",
  purple: "#bd10e0",
  amber: "#f5a623",
};

const SERVICE_ICONS: Record<string, string> = {
  "mvp-sprint": "🚀",
  "saas-build": "🏗️",
  "ai-dashboard": "📊",
  "landing-page": "🎨",
};

function resolveColor(color: string): string {
  return COLOR_MAP[color] ?? color;
}

export default function ServicesPage() {
  const { t } = useLanguage();

  const translatedTiers = t("pricing.tiers") as Array<{
    name: string;
    description: string;
    features: string[];
    bestFor?: string;
  }>;

  const processSteps = t("process.steps") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="min-h-screen bg-th-bg">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-th-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-th-text font-medium">Services</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t("services.badge") as string}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-th-text mb-4">
              {t("services.title") as string}
            </h1>
            <p className="text-th-muted max-w-xl mx-auto text-lg">
              {t("services.description") as string}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PRICING_TIERS.map((tier, i) => {
              const translated = translatedTiers[i];
              const color = resolveColor(tier.accentColor);
              const icon = SERVICE_ICONS[tier.id] ?? "⚙️";
              const bestFor = translated?.bestFor ?? tier.bestFor;

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-th-border hover:border-th-border-m bg-th-card p-8 transition-all duration-300 relative overflow-hidden"
                >
                  {tier.highlight && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                      }}
                    />
                  )}

                  {/* Icon + Name */}
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-3xl" role="img" aria-label={tier.name}>
                      {icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-th-text">
                        {translated?.name ?? tier.name}
                      </h3>
                      <p className="text-th-muted text-sm mt-1">
                        {translated?.description ?? tier.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-th-text">
                        {tier.price}
                      </span>
                      <span className="text-th-subtle text-sm">
                        {tier.priceNote}
                      </span>
                    </div>
                  </div>

                  {/* Best For */}
                  {bestFor && (
                    <div className="mb-5">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${color}15`,
                          color,
                        }}
                      >
                        Best for: {bestFor}
                      </span>
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {(translated?.features ?? tier.features).map(
                      (feature: string) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-th-text2"
                        >
                          <span
                            className="mt-0.5 shrink-0 text-xs"
                            style={{ color }}
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      )
                    )}
                  </ul>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/services/${tier.id}`}
                      className="text-sm font-medium transition-colors hover:underline"
                      style={{ color }}
                    >
                      Learn More →
                    </Link>
                    <a
                      href={`/#contact?service=${tier.id}`}
                      className="ml-auto px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                      style={{ backgroundColor: color }}
                    >
                      Send Inquiry
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-6 bg-th-bg2">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-th-text mb-4">
              {t("techStack.processTitle") as string}
            </h2>
            <p className="text-th-muted max-w-lg mx-auto">
              {t("techStack.processDescription") as string}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const translatedStep = processSteps?.[i];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="text-center p-6 rounded-2xl border border-th-border bg-th-card"
                >
                  <span className="text-3xl mb-3 block">{step.icon}</span>
                  <div className="text-xs text-accent font-medium mb-2">
                    {t("common.step") as string} {step.step}
                  </div>
                  <h3 className="font-semibold text-th-text mb-1">
                    {translatedStep?.title ?? step.title}
                  </h3>
                  <p className="text-sm text-th-muted">
                    {translatedStep?.description ?? step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-th-text mb-4">
              Not sure which service fits?
            </h2>
            <p className="text-th-muted mb-8">
              Let&apos;s discuss your project and find the right approach together.
            </p>
            <a
              href="/#contact?source=services"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: COLOR_MAP.accent }}
            >
              Send Project Inquiry
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
