"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TRUST_SIGNALS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import TrustCard from "./TrustCard";
import SocialLinks from "./SocialLinks";

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const width = inView ? level : 0;

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-th-text2">{name}</span>
        <span className="text-[11px] text-th-subtle font-mono tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-th-bg-s rounded-full overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();

  const SKILLS = [
    { name: t("about.skills.0") as string, level: 95, color: "#4a9eff" },
    { name: t("about.skills.1") as string, level: 85, color: "#50e3c2" },
    { name: t("about.skills.2") as string, level: 80, color: "#f5a623" },
    { name: t("about.skills.3") as string, level: 75, color: "#bd10e0" },
    { name: t("about.skills.4") as string, level: 98, color: "#4a9eff" },
  ];

  return (
    <section id="about" aria-label={t("nav.about") as string} className="py-24 px-6 bg-th-bg3">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
            {t("about.badge") as string}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {t("about.title") as string}
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto">
            {t("about.description") as string}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="bg-th-card border border-th-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-th-text mb-3 uppercase tracking-widest">
                {t("about.bioTitle") as string}
              </h3>
              <p className="text-th-text2 leading-relaxed text-[15px]">{t("about.bio") as string}</p>
            </div>

            <div className="bg-th-card border border-th-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-th-text mb-5 uppercase tracking-widest">
                {t("about.competencies") as string}
              </h3>
              {SKILLS.map((skill, i) => (
                <SkillBar
                  key={i}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-3">
              {TRUST_SIGNALS.map((signal, i) => {
                const translatedValue = signal.value === "Full"
                  ? (t("about.statFullStack") as string)
                  : signal.value === "2-4w"
                  ? (t("about.statAccelerated") as string)
                  : signal.value;
                return (
                  <TrustCard
                    key={signal.label}
                    value={translatedValue}
                    label={t(`trust.signals.${i}.label`) as string}
                    index={i}
                  />
                );
              })}
            </div>

            <div className="bg-th-card border border-th-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-th-text mb-4 uppercase tracking-widest">
                {t("about.connect") as string}
              </h3>
              <SocialLinks
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                iconClassName="text-th-muted hover:text-th-text transition-all duration-200 w-full h-14 border border-th-border rounded-xl flex items-center justify-center bg-th-card hover:border-th-border-m hover:bg-th-card-h hover:-translate-y-0.5"
              />
              <p className="text-[11px] text-th-faint mt-5 text-center">
                {t("about.preferEmail") as string}
              </p>
            </div>

            <div className="flex items-start gap-3 text-xs text-th-subtle bg-accent/5 border border-accent/10 rounded-2xl p-4">
              <span className="text-accent" aria-hidden="true">✦</span>
              <span>
                {t("about.accepting") as string}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
