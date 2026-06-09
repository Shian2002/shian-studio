"use client";

import { motion } from "framer-motion";
import { TECH_STACK, PROCESS_STEPS } from "@/lib/constants";
import ProcessStep from "./ProcessStep";

export default function TechStack() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
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
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-lg border border-white/5 text-sm"
              style={{
                backgroundColor: `${tech.color}08`,
                color: tech.color,
              }}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How I Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={step.step}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
