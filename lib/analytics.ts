/**
 * Analytics utility for tracking user interactions.
 *
 * Uses GA4 (gtag.js). Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
 * to activate. If the ID is not set, all tracking calls are no-ops.
 *
 * Events tracked:
 * - cta_click       { target: string }          — CTA button clicks
 * - form_start      { page: string }             — User interacts with form
 * - form_submit     { page: string, status: "success" | "error" } — Form result
 * - case_study_view { slug: string }             — Case study detail page viewed
 * - blog_view       { slug: string }             — Blog article viewed
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = typeof window !== "undefined"
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""
  : "";

function gtag(...args: unknown[]) {
  if (GA_ID && typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

/** Fire a custom GA4 event */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  gtag("event", eventName, params);
}

/** CTA button click */
export function trackCtaClick(target: string) {
  trackEvent("cta_click", { target });
}

/** Form interaction started */
export function trackFormStart(page: string) {
  trackEvent("form_start", { page });
}

/** Form submission result */
export function trackFormSubmit(page: string, status: "success" | "error") {
  trackEvent("form_submit", { page, status });
}

/** Case study detail page view */
export function trackCaseStudyView(slug: string) {
  trackEvent("case_study_view", { slug });
}

/** Blog article view */
export function trackBlogView(slug: string) {
  trackEvent("blog_view", { slug });
}

/**
 * GA4 gtag script snippet — include in <head> via Script component.
 * This is intentionally a string for use with next/script.
 */
export function getGaScriptSrc() {
  if (!GA_ID) return null;
  return `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
}

export { GA_ID };
