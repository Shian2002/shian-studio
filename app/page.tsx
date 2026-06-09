import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import HireBadge from "@/components/HireBadge";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <div className="fixed top-20 right-6 z-40">
        <HireBadge />
      </div>
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
