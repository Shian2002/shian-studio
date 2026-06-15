"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

function FAQItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-th-border rounded-xl overflow-hidden bg-th-card transition-colors hover:border-th-border-m">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left px-5 py-4 text-sm font-medium text-th-text hover:bg-th-bg-s transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="pr-4">{q}</span>
        <span
          className={`text-th-muted shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          {"\u25BE"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-th-muted leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ExtraQA = { q: string; a: string };
type ExtraCategory = { title: string; icon: string; items: ExtraQA[] };

const EXTRA_CATEGORIES: ExtraCategory[] = [
  {
    title: "Pricing & Payment",
    icon: "\u{1F4B0}",
    items: [
      {
        q: "How much does a typical project cost?",
        a: "Project pricing depends on scope. MVP Sprints start at $2,000, full SaaS builds range $5,000-$10,000+, and mini programs start at $1,500. After a quick text consult, you'll get an exact quote — no surprises.",
      },
      {
        q: "Do you offer monthly subscriptions?",
        a: "Yes. Our Tech Advisor subscription starts at $290/month for async text-based technical guidance. No video calls, no phone — just Slack/WeChat/email. Check out the /advisor page for details.",
      },
      {
        q: "What payment methods do you accept?",
        a: "International clients: Stripe, PayPal, or wire transfer. CN clients: WeChat Pay, Alipay, or bank transfer. For projects, 50% upfront and 50% on delivery is standard. Subscriptions are billed monthly.",
      },
      {
        q: "Can I get a refund if I'm not satisfied?",
        a: "For project work: if you're not happy with the initial design/wireframe phase, you get a full refund of your deposit. For subscriptions: cancel anytime, no questions asked — you just won't be billed for the next cycle.",
      },
    ],
  },
  {
    title: "Process & Timeline",
    icon: "\u{1F4C5}",
    items: [
      {
        q: "How long does a typical MVP take?",
        a: "2-4 weeks for most MVPs. Simple landing pages can be done in 3-5 days. Full SaaS dashboards with auth, payments, and dashboards typically take 3-4 weeks. The exact timeline is confirmed after our initial text discussion.",
      },
      {
        q: "What's your development process?",
        a: "Four steps: (1) Text consult to understand your needs, (2) Design & planning — wireframes + timeline, (3) AI-powered build — fast, quality code using Codex/GPT-5.5, (4) Launch & support — deploy + iterate. The entire process is text-based, no meetings required.",
      },
      {
        q: "Do you work with clients in different time zones?",
        a: "Absolutely. Our entire workflow is async and text-based, specifically designed for cross-timezone collaboration. You'll never need to wake up early for a meeting — just send a message and get a reply within 24h.",
      },
      {
        q: "How do I communicate with you during the project?",
        a: "Slack, WeChat, or email — your choice. All communication is text-based. No video calls, no phone calls. This keeps everything documented and efficient. You can expect responses within 24h (12h for active sprint phases).",
      },
    ],
  },
  {
    title: "Tech & Capabilities",
    icon: "\u26A1",
    items: [
      {
        q: "What tech stack do you use?",
        a: "Next.js + TypeScript + Tailwind CSS for frontend. Node.js / Python for backend. PostgreSQL / Supabase / MongoDB for databases. Vercel / Netlify for deployment. We also work with WeChat Mini Programs, AI integrations (OpenAI, Claude), and Stripe payments.",
      },
      {
        q: "Do you use AI tools in development?",
        a: "Yes — this is a core advantage. We use Codex/GPT-5.5 to accelerate development without sacrificing quality. This means faster delivery, lower costs, and cleaner code. The AI assists; all architectural decisions are made by an experienced developer.",
      },
      {
        q: "Can you work with my existing codebase?",
        a: "Yes. We can review your codebase, add features, fix bugs, or migrate to a new architecture. For subscription clients, code reviews are included (1/month for Tier 1, unlimited for Tier 2+).",
      },
      {
        q: "Do you provide ongoing maintenance after launch?",
        a: "Yes. Post-launch support is included for 30 days on all projects (bug fixes, small tweaks). For long-term support, the Tech Advisor subscription covers ongoing maintenance, updates, and new features.",
      },
    ],
  },
  {
    title: "Getting Started",
    icon: "\u{1F680}",
    items: [
      {
        q: "How do I start a project?",
        a: "Simple: (1) Fill out the contact form on the Contact page, or (2) Add us on WeChat (scan the QR code). Share your idea, timeline, and budget. You'll get a response within 24h with next steps — no sales calls.",
      },
      {
        q: "Do you sign NDAs?",
        a: "Yes. If you need an NDA before sharing project details, just ask. We're happy to sign before the initial discussion. Your ideas and data are always kept confidential.",
      },
      {
        q: "What information should I prepare before contacting?",
        a: "Helpful but not required: a brief description of what you want to build, your target users, your timeline, and your budget range. If you have wireframes, mockups, or competitor links, even better. If you have nothing — that's fine too, we'll figure it out together.",
      },
      {
        q: "Can you help with just a small task or bug fix?",
        a: "Yes. For one-off tasks (bug fix, small feature, deployment help), the Tech Advisor Tier 1 ($290/month) is the most cost-effective option. You get up to 10 messages/month and a code review session.",
      },
    ],
  },
];

export default function FAQ({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  if (compact) {
    const itemCount = 4;
    const faqItems = Array.from({ length: itemCount }, (_, i) => ({
      question: t(`faq.items.${i}.question`) as string,
      answer: t(`faq.items.${i}.answer`) as string,
    }));

    return (
      <section
        id="faq"
        aria-label={t("nav.faq") as string}
        className="py-16 px-6 bg-th-bg2"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
              {t("faq.badge") as string}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
              {t("faq.title") as string}
            </h2>
            <p className="text-th-muted">{t("faq.description") as string}</p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <FAQItem key={i} q={item.question} a={item.answer} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center text-xs text-th-subtle mt-8"
          >
            {t("faq.stillQuestions") as string}{" "}
            <a href="/faq" className="text-accent hover:underline">
              View all FAQs
            </a>{" "}
            {t("faq.footer") as string}
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-th-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-6">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            Frequently asked questions
          </h2>
          <p className="text-th-muted max-w-xl mx-auto">
            Everything you need to know about working with SHIAN Studio.
            Can&apos;t find the answer? Send a message via the contact form.
          </p>
        </motion.div>

        <div className="space-y-10">
          {EXTRA_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.4 }}
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold text-th-text mb-4 pb-2 border-b border-th-border">
                <span aria-hidden="true">{category.icon}</span>
                {category.title}
              </h3>

              <div className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <FAQItem
                    key={`${catIdx}-${itemIdx}`}
                    q={item.q}
                    a={item.a}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-th-card border border-th-border rounded-xl px-6 py-4">
            <p className="text-sm text-th-muted mb-3">Still have questions?</p>
            <a
              href="/contact?source=faq"
              className="inline-block rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
