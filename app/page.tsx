import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import HireBadge from "@/components/HireBadge";
import TranslationErrorBoundary from "@/components/TranslationErrorBoundary";

const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });

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
        <Services />
        <Portfolio />
        <TechStack />
        <Testimonials />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </TranslationErrorBoundary>
  );
}
