"use client";

import { motion } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";
import SocialLinks from "./SocialLinks";

const NAV_I18N_KEYS: Record<string, string> = {
  "/services": "nav.services",
  "/case-studies": "nav.portfolio",
  "/blog": "nav.blog",
  "#about": "nav.about",
  "/contact": "nav.contact",
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-th-footer border-t border-th-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <h3 className="text-th-text text-lg font-light tracking-brand mb-3">
              {BRAND.name} <span className="text-[10px] text-accent/80 tracking-widest uppercase">Studio</span>
            </h3>
            <p className="text-th-muted text-sm leading-relaxed max-w-md mb-6">
              {t("footer.tagline") as string}
            </p>
            <SocialLinks
              className="flex gap-3"
              iconClassName="text-th-muted hover:text-th-text transition-all duration-200 w-10 h-10 border border-th-border rounded-xl flex items-center justify-center hover:border-th-border-m hover:bg-th-card-h hover:-translate-y-0.5"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="text-th-text text-sm font-semibold uppercase tracking-widest mb-4">
              {t("footer.navigation") as string}
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-th-muted hover:text-th-text transition-colors text-sm"
                  >
                    {t(NAV_I18N_KEYS[link.href]) as string}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/advisor"
                  className="text-th-muted hover:text-th-text transition-colors text-sm"
                >
                  Tech Advisor
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-th-muted hover:text-th-text transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-th-text text-sm font-semibold uppercase tracking-widest mb-4">
              {t("footer.contactHeading") as string}
            </h4>
            <ul className="space-y-2.5 text-sm text-th-muted">
              <li>
                <a
                  href="mailto:x2938784260u@gmail.com"
                  className="hover:text-th-text transition-colors break-all"
                >
                  x2938784260u@gmail.com
                </a>
              </li>
              <li>{t("footer.remoteFirst") as string}</li>
              <li>
                <a
                  href="/contact?source=footer-quote"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  {t("nav.getQuote") as string} →
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-th-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-th-subtle">
            © {new Date().getFullYear()} {BRAND.name} Studio. {t("common.allRightsReserved") as string}
          </p>
          <p className="text-xs text-th-faint">
            {t("footer.builtWith") as string}
          </p>
        </div>
      </div>
    </footer>
  );
}
