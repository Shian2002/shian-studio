"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import HireBadge from "./HireBadge";
import ContactForm from "./ContactForm";

type CapabilityItem = { title: string; description: string };

const capabilityFallbackByLocale: Record<string, CapabilityItem[]> = {
  en: [
    {
      title: "Website & Landing Pages",
      description: "Clear conversion-focused pages that can be launched and tested quickly.",
    },
    {
      title: "SaaS MVP",
      description: "Core features, auth, and payment flows built for real users and real data.",
    },
    {
      title: "Dashboards & Admin",
      description: "Operational systems to manage users, sales, logistics, or internal workflows.",
    },
    {
      title: "Mini Programs",
      description: "WeChat/H5/UniApp products with stable checkout and content publishing flow.",
    },
  ],
  zh: [
    {
      title: "网站与落地页",
      description: "高转化信息页，支持快速上线和迭代验证。",
    },
    {
      title: "SaaS MVP",
      description: "核心功能、登录与付费链路，支持真实用户场景交付。",
    },
    {
      title: "后台与看板",
      description: "用来管理用户、订单、数据、流程的内部系统。",
    },
    {
      title: "小程序与 H5",
      description: "支持内容发布、购物、支付与会员等业务链路。",
    },
  ],
};

function isCapabilityItems(value: unknown): value is CapabilityItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).title === "string" &&
        typeof (item as Record<string, unknown>).description === "string",
    )
  );
}

function getCapabilityItems(locale: string, fallbackValue: unknown): CapabilityItem[] {
  return isCapabilityItems(fallbackValue) ? (fallbackValue as CapabilityItem[]) : capabilityFallbackByLocale[locale] ?? capabilityFallbackByLocale.en;
}

export default function Contact() {
  const { t, locale } = useLanguage();
  const capabilityItems = getCapabilityItems(locale, t("contact.capabilities"));
  const handoffHint = (
    typeof t("contact.handoffHint") === "string"
      ? t("contact.handoffHint")
      : locale === "zh"
        ? "你不需要写完整 PRD，只要告诉我目标用户、核心功能和预算区间，我会帮你转成可执行的交付方案。"
        : "You don't need a full PRD. Send target users, core features, and budget range — I will convert it into a clear delivery plan."
  ) as string;

  return (
    <section
      id="contact"
      aria-label={t("nav.contact") as string}
      className="pt-12 pb-14 md:pt-12 md:pb-16 px-6 bg-th-bg"
    >
      <div className="max-w-3xl mx-auto text-center">
        <HireBadge />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-th-text mb-4 leading-tight">
            {t("contact.title1") as string}
            <br />
            <span className="bg-gradient-to-r from-accent via-purple to-mint bg-clip-text text-transparent">
              {t("contact.title2") as string}
            </span>
          </h2>
          <p className="text-th-muted max-w-xl mx-auto mb-8">
            {t("contact.description") as string}
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
        >
          {capabilityItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="text-left rounded-xl border border-th-border bg-th-card/80 p-4"
            >
              <h3 className="text-base font-semibold text-th-text mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm text-th-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>

        <p className="text-sm text-th-muted text-left mb-8">
          {handoffHint}
        </p>

        <ContactForm />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col items-center gap-4 mt-10"
        >
          <div className="flex flex-wrap justify-center gap-5 text-sm text-th-muted">
            <a
              href="mailto:x2938784260u@gmail.com"
              className="hover:text-th-text transition-colors flex items-center gap-1.5"
            >
              Gmail
            </a>
            <span className="text-th-dim">|</span>
            <a
              href="mailto:2938784260@qq.com"
              className="hover:text-th-text transition-colors flex items-center gap-1.5"
            >
              QQ Mail
            </a>
            <span className="text-th-dim">|</span>
            <a
              href="https://x.com/shiancoding"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-th-text transition-colors flex items-center gap-1.5"
            >
              X / Twitter
            </a>
            <span className="text-th-dim">|</span>
            <a
              href="https://github.com/Shian2002"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-th-text transition-colors flex items-center gap-1.5"
            >
              GitHub
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-th-border bg-white p-2">
              <Image
                src="/images/contact/wechat-qr.jpg"
                alt="WeChat QR Code"
                fill
                sizes="128px"
                className="object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-th-muted font-medium">
              {t("contact.wechat") as string}
            </p>
          </div>

          <p className="text-[11px] text-th-subtle max-w-md mt-1">
            {t("contact.replyTime") as string}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
