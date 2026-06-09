"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TRUST_SIGNALS, BIO_EN, BIO_ZH } from "@/lib/constants";
import TrustCard from "./TrustCard";
import SocialLinks from "./SocialLinks";

const SKILLS = [
  { name: "Frontend (React / Next.js)", level: 95, color: "#4a9eff" },
  { name: "Backend (Node.js / Python)", level: 85, color: "#50e3c2" },
  { name: "Mini Programs (WeChat / UniApp)", level: 80, color: "#f5a623" },
  { name: "DevOps & Deployment", level: 75, color: "#bd10e0" },
  { name: "AI-Powered Coding Workflow", level: 98, color: "#4a9eff" },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-xs text-gray-500 font-mono tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#080810]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            About
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who&apos;s Building This?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A developer who ships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-gray-300 leading-relaxed">{BIO_EN}</p>
            <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-accent/30 pl-4 py-1">
              {BIO_ZH}
            </p>

            <div className="pt-6">
              <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-widest">
                Core Competencies
              </h3>
              {SKILLS.map((skill, i) => (
                <SkillBar
                  key={skill.name}
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
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-widest">
              Why Work With Me
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {TRUST_SIGNALS.map((signal, i) => (
                <TrustCard
                  key={signal.label}
                  value={signal.value}
                  label={signal.label}
                  index={i}
                />
              ))}
            </div>

            <div className="pt-6">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">
                Let&apos;s Connect
              </h3>
              <SocialLinks
                className="flex gap-4 justify-start"
                iconClassName="text-gray-400 hover:text-white hover:scale-110 transition-all w-10 h-10 border border-white/5 rounded-xl flex items-center justify-center bg-surface/50 hover:border-white/15"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
