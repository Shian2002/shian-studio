"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { fadeIn, viewportOnce } from "@/lib/animations";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";

const inputClasses =
  "w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder:text-th-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors";

const labelClasses = "text-xs text-th-muted uppercase tracking-wider mb-2 block";

export default function ContactForm() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const handleFormInteraction = () => {
    if (!formTouched) {
      setFormTouched(true);
      trackFormStart(window.location.pathname);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      // Extract UTM params and page info
      const url = typeof window !== "undefined" ? new URL(window.location.href) : null;
      const searchParams = url?.searchParams;
      const payload: Record<string, string> = {
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        projectType,
        budget,
        timeline,
        message: message.trim(),
        source: typeof window !== "undefined" ? window.location.href : "",
        pagePath: url?.pathname ?? "",
      };
      if (searchParams) {
        const utmSource = searchParams.get("utm_source");
        const utmMedium = searchParams.get("utm_medium");
        const utmCampaign = searchParams.get("utm_campaign");
        const service = searchParams.get("service");
        const caseStudy = searchParams.get("case");
        if (utmSource) payload.utm_source = utmSource;
        if (utmMedium) payload.utm_medium = utmMedium;
        if (utmCampaign) payload.utm_campaign = utmCampaign;
        if (service) payload.service = service;
        if (caseStudy) payload.caseStudy = caseStudy;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }
      setSuccess(true);
      trackFormSubmit(window.location.pathname, "success");
    } catch {
      setError(true);
      trackFormSubmit(window.location.pathname, "error");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
        className="max-w-2xl mx-auto bg-th-card border border-th-border rounded-2xl p-6 md:p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 20 }}
          className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4"
        >
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <p className="text-lg font-medium text-th-text mb-2">
          {String(t("form.success"))}
        </p>
        <p className="text-sm text-th-muted mb-6">
          {String(t("form.successNext"))}
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:hello@shian.studio?subject=Project%20Inquiry"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl px-5 py-2.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Me Directly
          </a>
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/85 text-white text-sm font-medium rounded-xl px-5 py-2.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Back to Case Studies
          </a>
        </div>
      </motion.div>
    );
  }

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
        {/* What happens next */}
        <div className="mb-6 p-4 rounded-xl bg-th-bg2 border border-th-border">
          <h3 className="text-sm font-semibold text-th-text mb-3">
            {String(t("form.whatsNextTitle"))}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2">
              <span className="text-accent text-sm shrink-0 mt-0.5">①</span>
              <div>
                <p className="text-xs font-medium text-th-text">{String(t("form.whatsNext1Title"))}</p>
                <p className="text-[11px] text-th-muted">{String(t("form.whatsNext1Desc"))}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-sm shrink-0 mt-0.5">②</span>
              <div>
                <p className="text-xs font-medium text-th-text">{String(t("form.whatsNext2Title"))}</p>
                <p className="text-[11px] text-th-muted">{String(t("form.whatsNext2Desc"))}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-sm shrink-0 mt-0.5">③</span>
              <div>
                <p className="text-xs font-medium text-th-text">{String(t("form.whatsNext3Title"))}</p>
                <p className="text-[11px] text-th-muted">{String(t("form.whatsNext3Desc"))}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: Name + Work Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              {String(t("form.name"))}
            </label>
            <input
              id="contact-name"
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

        {/* Row 2: Company/Website + Project Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-company" className={labelClasses}>
              {String(t("form.company"))}
            </label>
            <input
              id="contact-company"
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

        {/* Row 3: Budget + Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-budget" className={labelClasses}>
              {String(t("form.budget"))}
            </label>
            <select
              id="contact-budget"
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

        {/* Row 4: Message/Additional Details */}
        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            {String(t("form.message"))}
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            placeholder={String(t("form.messagePlaceholder"))}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500" role="alert">
            {String(t("form.error"))}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white hover:bg-accent/85 transition-all duration-300 rounded-xl py-3 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? String(t("form.sending")) : String(t("form.submit"))}
        </button>
      </form>
    </motion.div>
  );
}
