"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const items = (t("testimonials.items") as Array<{ text: string; name: string; role: string }>) ?? [];

  return (
    <section id="testimonials" aria-label={t("testimonials.title") as string} className="py-24 px-6 bg-th-bg2">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/10 border border-mint/20 text-mint text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            {t("testimonials.badge") as string}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {t("testimonials.title") as string}
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto">
            {t("testimonials.description") as string}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 bg-th-card border border-th-border hover:border-th-border-m transition-colors"
            >
              <span className="block text-5xl leading-none text-mint/20 font-serif select-none">
                &ldquo;
              </span>
              <p className="text-sm text-th-text2 leading-relaxed mt-2 mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-amber text-sm"
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-mint/10 text-mint text-xs font-semibold flex items-center justify-center">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-th-text text-sm font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-th-subtle">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
