"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_TYPES, BUDGET_RANGES, SOCIAL_LINKS } from "@/lib/constants";

const EMAIL_URL = SOCIAL_LINKS.email;
const CALENDLY_URL = "https://calendly.com";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "PLACEHOLDER_FORM_ID";
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s build something great.
          </h2>
          <p className="text-gray-400 mb-10">
            Tell me about your project — I&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16"
            >
              <div className="text-5xl mb-4">✅</div>
              <p className="text-xl text-white font-medium">
                Message sent!
              </p>
              <p className="text-gray-400 mt-2">
                I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="text-left space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs text-gray-500 mb-1 block">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs text-gray-500 mb-1 block">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project_type" className="text-xs text-gray-500 mb-1 block">
                    Project Type *
                  </label>
                  <select
                    id="project_type"
                    name="project_type"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="text-xs text-gray-500 mb-1 block">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-xs text-gray-500 mb-1 block">
                  Tell me about your project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Describe your idea..."
                />
              </div>

              {status === "error" && (
                <p className="text-coral text-sm">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                aria-label="Send message"
                className="w-full py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <a
            href={EMAIL_URL}
            className="bg-surface px-4 py-2 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/20 transition-colors"
          >
            📧 hello@shian.studio
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface px-4 py-2 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/20 transition-colors"
          >
            📅 Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
