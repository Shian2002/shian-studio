"use client";

import { motion } from "framer-motion";
import { TRUST_SIGNALS, BIO_EN, BIO_ZH } from "@/lib/constants";
import TrustCard from "./TrustCard";
import SocialLinks from "./SocialLinks";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#080810]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Shian
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">{BIO_EN}</p>
            <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-accent/30 pl-4">
              {BIO_ZH}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Trust Signals
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

            <SocialLinks className="flex gap-4 mt-8 justify-center lg:justify-start" iconClassName="text-gray-400 hover:text-white transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
