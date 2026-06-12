import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import HireBadge from "@/components/HireBadge";
import TranslationErrorBoundary from "@/components/TranslationErrorBoundary";

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
