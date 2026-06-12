import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CaseStudiesPage from "@/components/CaseStudiesPage";
import TranslationErrorBoundary from "@/components/TranslationErrorBoundary";

export const metadata: Metadata = {
  title: "Portfolio - MVP, SaaS & AI Product Demos",
  description:
    "Explore SHIAN Studio's portfolio of MVP, SaaS, AI, dashboard, mini program, and landing page demos.",
};

export default function Page() {
  return (
    <TranslationErrorBoundary>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16">
        <CaseStudiesPage />
      </main>
      <Footer />
      <BackToTop />
    </TranslationErrorBoundary>
  );
}
