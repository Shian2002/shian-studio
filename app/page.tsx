import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import HireBadge from "@/components/HireBadge";
import TranslationErrorBoundary from "@/components/TranslationErrorBoundary";

const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });

export default function Home() {
  return (
    <TranslationErrorBoundary>
      <ScrollProgress />
      <Navbar />
      <div className="fixed top-20 right-4 sm:right-6 z-40 hidden md:block">
        <HireBadge />
      </div>
      <main id="main-content">
        <Hero />
        <Portfolio compact />
        <FAQ compact />
      </main>
      <Footer />
      <BackToTop />
    </TranslationErrorBoundary>
  );
}
