"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import HireBadge from "./HireBadge";
import ContactForm from "./ContactForm";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" aria-label={t("nav.contact") as string} className="py-16 px-6 bg-th-bg">
      <div className="max-w-3xl mx-auto text-center">
        <HireBadge />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-th-text mb-6 leading-tight">
            {t("contact.title1") as string}
            <br />
            <span className="bg-gradient-to-r from-accent via-purple to-mint bg-clip-text text-transparent">
              {t("contact.title2") as string}
            </span>
          </h2>
          <p className="text-th-muted max-w-xl mx-auto mb-10">
            {t("contact.description") as string}
          </p>
        </motion.div>

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
