"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { fadeIn, viewportOnce } from "@/lib/animations";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";

const FORM_STORAGE_KEY = "shian_contact_form_data";

const inputClasses =
  "w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder:text-th-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors";

const labelClasses = "text-xs text-th-muted uppercase tracking-wider mb-2 block";
const fallbackEmail = "2938784260@qq.com";

type SubmitState = "idle" | "submitting" | "success" | "error";

function saveFormData(data: Record<string, string>) {
  try {
    sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function loadFormData(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem(FORM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearFormData() {
  try {
    sessionStorage.removeItem(FORM_STORAGE_KEY);
  } catch {}
}

export default function ContactForm() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [formTouched, setFormTouched] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const formData = useMemo(
    () => ({ name, email, company, projectType, budget, timeline, message }),
    [name, email, company, projectType, budget, timeline, message]
  );

  const fallbackMailto = useMemo(() => {
    const subject = encodeURIComponent(`Project inquiry from ${name || "SHIAN Studio website"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        `Project type: ${projectType}`,
        `Budget: ${budget}`,
        `Timeline: ${timeline}`,
        "",
        "Message:",
        message,
      ]
        .filter((line): line is string => line !== null)
        .join("\n")
    );

    return `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
  }, [name, email, company, projectType, budget, timeline, message]);

  useEffect(() => {
    const saved = loadFormData();
    if (!saved) return;

    setName(saved.name ?? "");
    setEmail(saved.email ?? "");
    setCompany(saved.company ?? "");
    setProjectType(saved.projectType ?? "");
    setBudget(saved.budget ?? "");
    setTimeline(saved.timeline ?? "");
    setMessage(saved.message ?? "");
  }, []);

  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  const handleFormInteraction = () => {
    if (!formTouched) {
      setFormTouched(true);
      trackFormStart(window.location.pathname);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveFormData(formData);
    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: window.location.href,
          pagePath: window.location.pathname,
        }),
      });

      if (!res.ok) {
        throw new Error("Contact form request failed");
      }

      trackFormSubmit(window.location.pathname, "success");
      clearFormData();
      setSubmitState("success");
      setSubmitMessage(String(t("form.successNext")));
      setName("");
      setEmail("");
      setCompany("");
      setProjectType("");
      setBudget("");
      setTimeline("");
      setMessage("");
    } catch {
      trackFormSubmit(window.location.pathname, "error");
      setSubmitState("error");
      setSubmitMessage(String(t("form.error")));
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <form
        onSubmit={handleSubmit}
        noValidate={false}
        className="bg-th-card border border-th-border rounded-2xl p-6 md:p-8 space-y-5"
        onFocus={handleFormInteraction}
      >
        <div className="mb-6 p-4 rounded-xl bg-th-bg2 border border-th-border">
          <h3 className="text-sm font-semibold text-th-text mb-3">
            {String(t("form.whatsNextTitle"))}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2">
              <span className="text-accent text-sm shrink-0 mt-0.5">1</span>
              <div>
                <p className="text-xs font-medium text-th-text">
                  {String(t("form.whatsNext1Title"))}
                </p>
                <p className="text-[11px] text-th-muted">
                  {String(t("form.whatsNext1Desc"))}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-sm shrink-0 mt-0.5">2</span>
              <div>
                <p className="text-xs font-medium text-th-text">
                  {String(t("form.whatsNext2Title"))}
                </p>
                <p className="text-[11px] text-th-muted">
                  {String(t("form.whatsNext2Desc"))}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-sm shrink-0 mt-0.5">3</span>
              <div>
                <p className="text-xs font-medium text-th-text">
                  {String(t("form.whatsNext3Title"))}
                </p>
                <p className="text-[11px] text-th-muted">
                  {String(t("form.whatsNext3Desc"))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              {String(t("form.name"))}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={String(t("form.namePlaceholder"))}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              {String(t("form.email"))}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={String(t("form.emailPlaceholder"))}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-company" className={labelClasses}>
              {String(t("form.company"))}
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={String(t("form.companyPlaceholder"))}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contact-project-type" className={labelClasses}>
              {String(t("form.projectType"))}
            </label>
            <select
              id="contact-project-type"
              name="projectType"
              required
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={inputClasses}
              aria-label={String(t("form.projectType"))}
            >
              <option value="" disabled>
                {String(t("form.selectType"))}
              </option>
              {((t("form.projectTypes") as string[]) ?? []).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-budget" className={labelClasses}>
              {String(t("form.budget"))}
            </label>
            <select
              id="contact-budget"
              name="budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={inputClasses}
              aria-label={String(t("form.budget"))}
            >
              <option value="" disabled>
                {String(t("form.selectBudget"))}
              </option>
              {((t("form.budgetRanges") as string[]) ?? []).map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-timeline" className={labelClasses}>
              {String(t("form.timeline"))}
            </label>
            <select
              id="contact-timeline"
              name="timeline"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className={inputClasses}
              aria-label={String(t("form.timeline"))}
            >
              <option value="" disabled>
                {String(t("form.selectTimeline"))}
              </option>
              {((t("form.timelines") as string[]) ?? []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            {String(t("form.message"))}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder={String(t("form.messagePlaceholder"))}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="w-full bg-accent text-white hover:bg-accent/85 disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-300 rounded-xl py-3 font-medium"
        >
          {submitState === "submitting" ? "Sending..." : String(t("form.submit"))}
        </button>

        {submitMessage ? (
          <div role="status" className="space-y-2 text-center">
            <p
              className={`text-sm ${
                submitState === "success" ? "text-mint" : "text-red-500"
              }`}
            >
              {submitMessage}
            </p>
            {submitState === "error" ? (
              <a
                href={fallbackMailto}
                className="inline-flex items-center justify-center rounded-lg border border-th-border px-3 py-2 text-sm text-th-text hover:border-accent hover:text-accent transition-colors"
              >
                {String(t("form.emailFallback"))}
              </a>
            ) : null}
          </div>
        ) : null}
      </form>
    </motion.div>
  );
}
