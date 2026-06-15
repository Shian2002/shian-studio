"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";

const ADVISOR_TIERS = [
  {
    id: "async",
    name: "Async Advisor",
    price: "$290",
    period: "/mo",
    description: "Text-based technical guidance on your schedule",
    accent: "#50e3c2",
    popular: false,
    features: [
      "Slack / WeChat async Q&A",
      "48h response window",
      "Tech stack reviews",
      "Architecture sanity checks",
      "1 code review session / month",
    ],
  },
  {
    id: "standard",
    name: "Standard Advisor",
    price: "$690",
    period: "/mo",
    description: "Responsive text-based support for active projects",
    accent: "#4a9eff",
    popular: true,
    features: [
      "Everything in Async, plus:",
      "24h response (12h priority)",
      "Unlimited code reviews",
      "Sprint planning feedback",
      "Monthly tech audit report",
      "Tech debt assessment",
    ],
  },
  {
    id: "embedded",
    name: "Embedded Advisor",
    price: "$1,490",
    period: "/mo",
    description: "Deep integration with your team's workflow",
    accent: "#bd10e0",
    popular: false,
    features: [
      "Everything in Standard, plus:",
      "Same-day response",
      "Weekly async check-ins",
      "On-call during sprints",
      "Direct Slack / Teams channel",
      "Hiring & vendor evaluation",
      "Roadmap co-creation",
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

              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-th-text">
                    {tier.price}
                  </span>
                  <span className="text-th-subtle text-xs">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-block bg-th-card border border-th-border rounded-xl px-6 py-4 max-w-2xl">
            <p className="text-xs text-th-muted leading-relaxed">
              <span className="text-th-text font-medium">100% text-based.</span>{" "}
              All tiers use async chat (Slack, WeChat, or email). No video calls, no phone calls.
              Perfect for cross-timezone collaboration and developers who prefer writing over talking.
              Cancel anytime — no long-term contract.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
