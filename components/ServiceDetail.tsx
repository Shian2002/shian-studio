"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRICING_TIERS, PROCESS_STEPS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { trackCtaClick } from "@/lib/analytics";

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

interface ServiceExtra {
  suitableFor: string[];
  includes: string[];
  excludes: string[];
  process: string[];
  faq: Array<{ question: string; answer: string }>;
}

const SERVICE_DETAILS: Record<string, ServiceExtra> = {
  "mvp-sprint": {
    suitableFor: [
      "Startups with a validated idea",
      "Entrepreneurs testing a market",
      "Teams that need to move fast",
      "Founders who want investor-ready products",
    ],
    includes: [
      "Full-stack development (frontend + backend)",
      "Responsive web design or mini program",
      "User authentication & database setup",
      "Third-party API integration",
      "Production deployment & hosting",
      "Post-launch support",
    ],
    excludes: [
      "Native mobile apps (iOS/Android)",
      "Complex ML/AI pipelines",
      "Multi-tenant SaaS architecture",
      "Ongoing maintenance beyond support period",
    ],
    process: [
      "Discovery Call (Day 1)",
      "Design & Architecture (Days 2-4)",
      "Development Sprints (Weeks 1-3)",
      "Testing & Launch (Week 3-4)",
      "Post-launch Support",
    ],
    faq: [
      {
        question: "What do I need to get started?",
        answer:
          "A clear idea of what you want to build. If you have wireframes or specs, great. If not, we'll figure it out together on the discovery call.",
      },
      {
        question: "Can I make changes during development?",
        answer:
          "Yes. The process includes regular check-ins, and small pivots are expected.",
      },
      {
        question: "What if I need more than 4 weeks?",
        answer:
          "We scope it upfront. If the project grows, we'll discuss options — no surprises.",
      },
    ],
  },
  "saas-build": {
    suitableFor: [
      "SaaS founders building their first product",
      "Growing businesses that need a complete platform",
      "Teams migrating from spreadsheets to software",
      "Companies that need billing + user management",
    ],
    includes: [
      "Complete SaaS application development",
      "Multi-tenant architecture design",
      "Payment integration (Stripe/Paddle)",
      "Admin dashboard & analytics",
      "Role-based access control (RBAC)",
      "Production deployment & CI/CD",
      "30-day post-launch support",
    ],
    excludes: [
      "Native mobile apps",
      "Hardware integration",
      "Custom ML model training",
      "Long-term maintenance (available separately)",
    ],
    process: [
      "Requirements & Architecture (Week 1)",
      "Core Feature Development (Weeks 2-4)",
      "Billing & User Management (Weeks 4-6)",
      "Testing, Polish & Launch (Weeks 6-8)",
      "30-day Post-launch Support",
    ],
    faq: [
      {
        question: "Do you handle payment integration?",
        answer:
          "Yes, Stripe and Paddle integration is included. We set up subscriptions, one-time payments, and invoicing.",
      },
      {
        question: "Can I add features after launch?",
        answer:
          "Absolutely. The architecture is designed to be extensible. We can plan phase 2 features during development.",
      },
      {
        question: "What tech stack do you use?",
        answer:
          "Typically Next.js + Node.js + PostgreSQL. But we adapt based on your requirements and existing infrastructure.",
      },
    ],
  },
  "ai-dashboard": {
    suitableFor: [
      "Operations teams needing real-time visibility",
      "SMBs with data but no visualization",
      "Companies building internal tools",
      "Teams monitoring IoT devices or processes",
    ],
    includes: [
      "Custom dashboard development",
      "Real-time data visualization",
      "AI-powered analytics & insights",
      "IoT monitoring & alerting",
      "Role management & audit logs",
      "Data source integration",
    ],
    excludes: [
      "Full SaaS architecture (see SaaS Build)",
      "Customer-facing web applications",
      "Native mobile apps",
      "Custom AI model training",
    ],
    process: [
      "Data Audit & Requirements (Days 1-3)",
      "Dashboard Design & Prototyping (Days 3-7)",
      "Development & Integration (Weeks 1-3)",
      "Testing & Deployment (Week 3-4)",
    ],
    faq: [
      {
        question: "What data sources can you connect to?",
        answer:
          "REST APIs, databases (PostgreSQL, MySQL), IoT sensors (MQTT), spreadsheets, and most third-party services via webhook or API.",
      },
      {
        question: "Can the dashboard handle real-time data?",
        answer:
          "Yes. We use WebSocket or SSE for real-time updates, depending on your infrastructure.",
      },
      {
        question: "Do you include AI analytics?",
        answer:
          "Yes, where applicable. We can add anomaly detection, trend forecasting, and automated insights powered by LLMs.",
      },
    ],
  },
  "landing-page": {
    suitableFor: [
      "Early-stage startups needing a web presence",
      "Marketing teams running campaigns",
      "Product launches and announcements",
      "Personal portfolios and showcases",
    ],
    includes: [
      "Responsive single-page design",
      "SEO optimization (Lighthouse 95+)",
      "Contact form integration",
      "Analytics setup (GA4, etc.)",
      "Mobile-first & fast loading",
      "Performance optimization",
    ],
    excludes: [
      "Backend development or database",
      "User authentication systems",
      "Admin panels or dashboards",
      "E-commerce functionality",
    ],
    process: [
      "Design Brief & Content (Day 1)",
      "Design & Development (Day 1-2)",
      "Review & Revisions (Day 2-3)",
      "Launch & Analytics Setup (Day 3)",
    ],
    faq: [
      {
        question: "How fast can you deliver?",
        answer:
          "Typically 3 business days from brief to launch. If you have content and assets ready, even faster.",
      },
      {
        question: "Can I make changes after launch?",
        answer:
          "Of course. Small tweaks are free. For larger changes, we can discuss a maintenance plan.",
      },
      {
        question: "Do you provide the design?",
        answer:
          "Yes, custom design is included. You can provide brand guidelines, or we create a fresh design from scratch.",
      },
    ],
  },
};

type Tier = (typeof PRICING_TIERS)[number];

export default function ServiceDetail({ tier }: { tier: Tier }) {
  const { t } = useLanguage();
  const color = COLOR_MAP[tier.accentColor] ?? COLOR_MAP.accent;
  const icon = SERVICE_ICONS[tier.id] ?? "⚙️";
  const details = SERVICE_DETAILS[tier.id];

  const translatedTiers = t("pricing.tiers") as Array<{
    name: string;
    description: string;
    features: string[];
  }>;
  const processSteps = t("process.steps") as Array<{
    title: string;
    description: string;
  }>;

  const tierIndex = PRICING_TIERS.findIndex((t) => t.id === tier.id);
  const translated = translatedTiers?.[tierIndex];
  const name = translated?.name ?? tier.name;
  const description = translated?.description ?? tier.description;
  const features = translated?.features ?? tier.features;

  // Previous / Next navigation
  const prevTier =
    tierIndex > 0 ? PRICING_TIERS[tierIndex - 1] : PRICING_TIERS[PRICING_TIERS.length - 1];
  const nextTier =
    tierIndex < PRICING_TIERS.length - 1 ? PRICING_TIERS[tierIndex + 1] : PRICING_TIERS[0];
  const prevName = translatedTiers?.[PRICING_TIERS.indexOf(prevTier)]?.name ?? prevTier.name;
  const nextName = translatedTiers?.[PRICING_TIERS.indexOf(nextTier)]?.name ?? nextTier.name;

  if (!details) return null;

  return (
    <div className="min-h-screen bg-th-bg">
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-6 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-th-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/services" className="hover:text-accent transition-colors">
              Services
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-th-text font-medium">{name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl" role="img" aria-label={name}>
                {icon}
              </span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-th-text">
                  {name}
                </h1>
                <p className="text-th-muted text-lg mt-1">{description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="px-4 py-2 rounded-xl border border-th-border bg-th-card">
                <span className="text-2xl font-bold text-th-text">{tier.price}</span>
                <span className="text-th-subtle text-sm ml-2">{tier.priceNote}</span>
              </div>
              <div className="px-4 py-2 rounded-xl border border-th-border bg-th-card">
                <span className="text-sm text-th-muted">Delivery: </span>
                <span className="text-sm font-medium text-th-text">
                  {details.process.length <= 4
                    ? "2-4 weeks"
                    : details.process.length <= 5 && tier.id === "saas-build"
                    ? "4-8 weeks"
                    : tier.id === "landing-page"
                    ? "3 days"
                    : "2-4 weeks"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suitable For */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-th-text mb-6">Who Is This For?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {details.suitableFor.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-xl border border-th-border bg-th-card"
                >
                  <span className="mt-0.5 shrink-0" style={{ color }} aria-hidden="true">
                    →
                  </span>
                  <span className="text-sm text-th-text2">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-th-text mb-6">What&apos;s Included</h2>
            <div className="rounded-2xl border border-th-border bg-th-card p-6 space-y-3">
              {details.includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 text-sm font-bold"
                    style={{ color }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-sm text-th-text2">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's NOT Included */}
      {details.excludes.length > 0 && (
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-th-text mb-6">
                Not Included
              </h2>
              <div className="rounded-2xl border border-th-border bg-th-card p-6 space-y-3">
                {details.excludes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-sm text-th-subtle" aria-hidden="true">
                      ✕
                    </span>
                    <span className="text-sm text-th-muted">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Process / Workflow */}
      <section className="pb-16 px-6 bg-th-bg2">
        <div className="max-w-4xl mx-auto py-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-th-text mb-8">
              {t("techStack.processTitle") as string}
            </h2>
            <div className="space-y-4">
              {details.process.map((step, i) => (
                <div
                  key={step}
                  className="flex items-start gap-4 p-4 rounded-xl border border-th-border bg-th-card"
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm text-th-text2 pt-1">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-th-text mb-8">
              {t("faq.badge") as string}
            </h2>
            <div className="space-y-4">
              {details.faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-th-border bg-th-card p-6"
                >
                  <h3 className="font-semibold text-th-text mb-2">
                    {item.question}
                  </h3>
                  <p className="text-sm text-th-muted leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-th-bg2">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-th-text mb-4">
              Ready to start?
            </h2>
            <p className="text-th-muted mb-8">
              Send a project inquiry and let&apos;s discuss your {name} project.
            </p>
            <a
              href={`/#contact?service=${tier.id}`}
              onClick={() => trackCtaClick(`service-${tier.id}`)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              Send Project Inquiry
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="py-12 px-6 border-t border-th-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href={`/services/${prevTier.id}`}
            className="flex items-center gap-2 text-sm text-th-muted hover:text-accent transition-colors"
          >
            <span aria-hidden="true">←</span>
            {prevName}
          </Link>
          <Link
            href={`/services/${nextTier.id}`}
            className="flex items-center gap-2 text-sm text-th-muted hover:text-accent transition-colors"
          >
            {nextName}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
