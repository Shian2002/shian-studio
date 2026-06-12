import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Contact from "@/components/Contact";
import TranslationErrorBoundary from "@/components/TranslationErrorBoundary";

export const metadata: Metadata = {
  title: "Contact - SHIAN Studio",
  description:
    "Contact SHIAN Studio for MVP, SaaS, AI dashboard, mini program, and landing page development projects.",
};

export default function ContactPage() {
  return (
    <TranslationErrorBoundary>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16">
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </TranslationErrorBoundary>
  );
}
