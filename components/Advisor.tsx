"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";

const ADVISOR_TIERS = [
  {
    id: "async",
    name: "Async Advisor",
    price: "$290",
    period: "/mo",
    priceNote: "¥1,999/mo for CN clients",
    description: "Occasional technical guidance on your schedule",
    accent: "#50e3c2",
    popular: false,
    timeCommit: "~1.5h/mo of your time",
    hourlyRate: "effective rate: $193/h",
    features: [
      "10 messages / month",
      "48h response window",
      "Text-only async (Slack / WeChat / Email)",
      "1 code review session / month",
      "AI-powered first response",
      "Full FAQ knowledge base access",
    ],
  },
  {
    id: "standard",
    name: "Standard Advisor",
    price: "$690",
    period: "/mo",
    priceNote: "¥4,999/mo for CN clients",
    description: "Responsive support for active development",
    accent: "#4a9eff",
    popular: true,
    timeCommit: "~4-5h/mo of your time",
    hourlyRate: "effective rate: $138/h",
    features: [
      "30 messages / month",
      "24h response window",
      "Text-only async (Slack / WeChat / Email)",
      "Unlimited code reviews",
      "Sprint planning feedback",
      "Architecture template library",
      "AI-powered first response",
      "Monthly tech audit report",
    ],
  },
  {
    id: "embedded",
    name: "Embedded Advisor",
    price: "$1,490",
    period: "/mo",
    priceNote: "¥10,999/mo for CN clients",
    description: "Deep technical partnership for growing teams",
    accent: "#bd10e0",
    popular: false,
    seatsLeft: "Only 3 seats available",
    timeCommit: "~8-10h/mo of your time",
    hourlyRate: "effective rate: $149/h",
    features: [
      "60 messages / month",
      "Same-day response",
      "Text-only async (dedicated channel)",
      "Tech decision deep-dive",
      "Hiring & vendor evaluation",
      "Roadmap co-creation",
      "Priority AI-assisted drafting",
      "Weekly async check-ins",
    ],
  },
];

export default function Advisor() {
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
            Monthly subscription
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            Tech Advisor Subscription
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto">
            Not ready for a full project? Get ongoing technical guidance via text.
            No video calls, no phone — just async chat designed for global collaboration across time zones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:items-start">
          {ADVISOR_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className={`h-full rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col ${
                tier.popular
                  ? "bg-th-card border-accent/50 shadow-[0_24px_80px_rgba(74,158,255,0.18)]"
                  : "bg-th-card/70 border-th-border hover:border-th-border-m"
              }`}
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${tier.accent}, transparent)`,
                  opacity: tier.popular ? 1 : 0.5,
                }}
                aria-hidden="true"
              />

              {tier.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg">
                  Most popular
                </div>
              )}

              <div className="mb-4">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: tier.accent }}
                >
                  {tier.name}
                </h3>
                <p className="text-th-muted text-xs leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-th-text">
                    {tier.price}
                  </span>
                  <span className="text-th-subtle text-xs">{tier.period}</span>
                </div>
                <p className="text-[11px] text-th-subtle mt-0.5">{tier.priceNote}</p>
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
                      style={{ color: tier.accent }}
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
                  tier.popular
                    ? "text-white border-transparent hover:opacity-90"
                    : "text-th-text bg-th-bg-s border-th-border hover:border-th-border-m"
                }`}
                style={tier.popular ? { backgroundColor: tier.accent } : undefined}
              >
                Get started
              </a>
            </motion.div>
          ))}
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
              <div className="text-2xl mb-1" aria-hidden="true">🛡️</div>
              <p className="text-xs font-medium text-th-text mb-0.5">Bounded workload</p>
              <p className="text-[11px] text-th-muted leading-relaxed">
                Monthly message limits prevent overload. You control your time.
              </p>
            </div>
            <div className="bg-th-card border border-th-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1" aria-hidden="true">🤖</div>
              <p className="text-xs font-medium text-th-text mb-0.5">AI-powered triage</p>
              <p className="text-[11px] text-th-muted leading-relaxed">
                An AI assistant handles common questions before they reach you.
              </p>
            </div>
            <div className="bg-th-card border border-th-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1" aria-hidden="true">💬</div>
              <p className="text-xs font-medium text-th-text mb-0.5">100% text-based</p>
              <p className="text-[11px] text-th-muted leading-relaxed">
                No video calls, no phone. Async chat only. Cancel anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
