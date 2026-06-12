"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import HireBadge from "./HireBadge";
import ContactForm from "./ContactForm";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" aria-label={t("nav.contact") as string} className="py-24 px-6 bg-th-bg">
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
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="w-40 h-40 rounded-2xl overflow-hidden border border-th-border bg-white p-2">
            <Image
              src="/whatsapp-qr.jpg"
              alt="WhatsApp QR Code"
              width={144}
              height={144}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs text-th-muted">{t("portfolio.scanWhatsApp") as string}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 text-sm text-th-muted"
        >
          <a
            href="mailto:hello@shian.studio"
            className="hover:text-th-text transition-colors"
          >
            {t("contact.email") as string}
          </a>
          <span className="hidden sm:inline text-th-dim">|</span>
          <span className="flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" aria-hidden="true" />
            {t("contact.replyTime") as string}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
