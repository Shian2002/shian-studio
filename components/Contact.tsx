"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, FormEvent, ChangeEvent } from "react";
import { PROJECT_TYPES, BUDGET_RANGES, SOCIAL_LINKS } from "@/lib/constants";

const EMAIL_URL = SOCIAL_LINKS.email;
const CALENDLY_URL = "https://calendly.com";

type FormState = {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  project_type: "",
  budget: "",
  message: "",
};

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.name.trim()) errors.name = "Please enter your name";
  else if (state.name.trim().length < 2) errors.name = "Name is too short";
  if (!state.email.trim()) errors.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) errors.email = "Enter a valid email address";
  if (!state.project_type) errors.project_type = "Select a project type";
  if (!state.budget) errors.budget = "Select a budget range";
  if (!state.message.trim()) errors.message = "Please describe your project";
  else if (state.message.trim().length < 10) errors.message = "Please add a bit more detail";
  return errors;
}

function fieldClasses(hasError: unknown) {
  const err = Boolean(hasError);
  return `w-full bg-surface border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-colors ${
    err
      ? "border-red-500/40 focus:border-red-500/60"
      : "border-white/10 focus:border-accent/50"
  }`;
}

export default function Contact() {
  const [state, setState] = useState<FormState>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const errors = useMemo(() => validate(state), [state]);
  const valid = Object.keys(errors).length === 0;
  const remaining = useMemo(() => 500 - state.message.length, [state.message]);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function onBlur(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, project_type: true, budget: true, message: true });
    if (!valid) return;
    setStatus("sending");
    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "PLACEHOLDER_FORM_ID";
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: JSON.stringify(state),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        setState(initial);
        setTouched({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-[#0a0a1a]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
            Contact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s build something great.
          </h2>
          <p className="text-gray-400">
            Tell me about your project — I&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center bg-surface/40 rounded-2xl border border-white/5"
            >
              <div className="text-5xl mb-4">✅</div>
              <p className="text-xl text-white font-medium">Message sent!</p>
              <p className="text-gray-400 mt-2 text-sm">
                I&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-accent hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 bg-surface/30 border border-white/5 p-6 md:p-8 rounded-2xl"
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
                    value={state.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={fieldClasses(touched.name && errors.name)}
                    placeholder="John Doe"
                    aria-invalid={touched.name && !!errors.name}
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-xs text-gray-500 mb-1 block">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={state.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={fieldClasses(touched.email && errors.email)}
                    placeholder="john@company.com"
                    aria-invalid={touched.email && !!errors.email}
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
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
                    value={state.project_type}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={fieldClasses(touched.project_type && errors.project_type) + " appearance-none"}
                    aria-invalid={touched.project_type && !!errors.project_type}
                  >
                    <option value="">Select...</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {touched.project_type && errors.project_type && (
                    <p className="text-xs text-red-400 mt-1">{errors.project_type}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="budget" className="text-xs text-gray-500 mb-1 block">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={state.budget}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={fieldClasses(touched.budget && errors.budget) + " appearance-none"}
                    aria-invalid={touched.budget && !!errors.budget}
                  >
                    <option value="">Select...</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {touched.budget && errors.budget && (
                    <p className="text-xs text-red-400 mt-1">{errors.budget}</p>
                  )}
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
                  rows={5}
                  maxLength={500}
                  value={state.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={fieldClasses(touched.message && errors.message) + " resize-none"}
                  placeholder="Describe your idea, goals, and timeline..."
                  aria-invalid={touched.message && !!errors.message}
                />
                <div className="flex justify-between items-center mt-1">
                  {touched.message && errors.message ? (
                    <p className="text-xs text-red-400">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={`text-xs font-mono tabular-nums ${
                      state.message.length > 500 ? "text-red-400" : "text-gray-600"
                    }`}
                  >
                    {remaining} / 500
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || !valid}
                aria-label="Send message"
                className="w-full py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>Send Message →</>
                )}
              </button>

              <p className="text-xs text-center text-gray-600">
                Prefer email? Use the link below.
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="flex gap-3 justify-center mt-8 flex-wrap">
          <a
            href={EMAIL_URL}
            className="bg-surface px-4 py-2 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/20 hover:text-white transition-colors flex items-center gap-2"
          >
            ✉️ hello@shian.studio
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface px-4 py-2 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/20 hover:text-white transition-colors flex items-center gap-2"
          >
            📅 Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
