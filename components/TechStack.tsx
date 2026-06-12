"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TECH_STACK, PROCESS_STEPS, STATS } from "@/lib/constants";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import ProcessStep from "./ProcessStep";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const runningRef = useRef(false);

  if (inView && !runningRef.current && typeof window !== "undefined") {
    runningRef.current = true;
    const start = performance.now();
    const duration = 900;
    const animate = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  return (
    <div ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </div>
  );
}

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section id="tech-stack" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/10 border border-mint/20 text-mint text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" aria-hidden="true" />
            {t("techStack.badge") as string}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {t("techStack.title") as string}
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto">
            {t("techStack.description") as string}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {TECH_STACK.map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="px-4 py-2.5 rounded-xl border border-th-border bg-th-card hover:border-th-border-m hover:bg-th-card-h transition-all duration-300 text-sm cursor-default group"
              style={{ color: tech.color }}
            >
              <span className="font-mono text-[10px] mr-2 opacity-50 group-hover:opacity-80 transition-opacity">
                {String(i + 1).padStart(2, "0")}
              </span>
              {tech.name}
            </motion.span>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple" aria-hidden="true" />
            {t("techStack.processBadge") as string}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-th-text mb-4">
            {t("techStack.processTitle") as string}
          </h2>
          <p className="text-th-muted max-w-2xl mx-auto">
            {t("techStack.processDescription") as string}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.step}
              icon={step.icon}
              title={t(`process.steps.${i}.title`) as string}
              description={t(`process.steps.${i}.description`) as string}
              step={step.step}
              index={i}
              isLast={i === PROCESS_STEPS.length - 1}
              stepLabel={t("common.step") as string}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 bg-th-card border border-th-border rounded-2xl p-8"
        >
          {STATS.map((item, i) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl md:text-4xl font-light bg-gradient-to-r from-accent via-purple to-mint bg-clip-text text-transparent">
                <AnimatedCounter target={item.num} suffix={item.suffix} />
              </div>
              <div className="text-xs text-th-subtle mt-2 uppercase tracking-widest">
                {t(`techStack.stats.${i}`) as string}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
