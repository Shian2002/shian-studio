import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Services and Pricing - MVP, SaaS & Dashboard Development",
  description:
    "MVP Sprint, SaaS Build, AI Dashboard, and Landing Page development services. Transparent pricing, 2-4 week delivery. Send a project inquiry.",
};

export default function ServicesRoute() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16">
        <Services includeSubscription />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
