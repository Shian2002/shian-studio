"use client";

import { motion, useInView } from "framer-motion";
import { TECH_STACK, PROCESS_STEPS } from "@/lib/constants";
import ProcessStep from "./ProcessStep";
import { useRef } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <span ref={ref}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="tabular-nums"
      >
        {inView ? target + suffix : "0" + suffix}
      </motion.span>
    </span>
  );
}

export default function TechStack() {
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
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            Toolbox
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The tools and technologies I use to deliver quality at speed.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {TECH_STACK.map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="px-4 py-2.5 rounded-xl border border-white/5 text-sm cursor-default bg-surface/50 hover:border-white/15 transition-colors"
              style={{
                color: tech.color,
                boxShadow: `inset 0 1px 0 0 ${tech.color}08`,
              }}
            >
              <span className="font-mono mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {tech.name}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple" />
            Workflow
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How I Work
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From initial call to production deployment — a clear, repeatable process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={step.step}
              index={i}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface/30 border border-white/5 rounded-2xl p-8"
        >
          {[
            { num: "3", suffix: "x", label: "Faster delivery" },
            { num: "24", suffix: "h", label: "Response time" },
            { num: "5", suffix: "+", label: "Technologies mastered" },
            { num: "30", suffix: "d", label: "Post-launch support" },
          ].map((item, i) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl md:text-4xl font-light bg-gradient-to-r from-accent to-mint bg-clip-text text-transparent">
                <AnimatedCounter target={Number(item.num)} suffix={item.suffix} />
              </div>
              <div className="text-xs text-gray-500 mt-2 uppercase tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
