import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ - SHIAN Studio",
  description:
    "Common questions about pricing, process, tech stack, and working with SHIAN Studio. Text-based, async workflow with no video calls.",
};

export default function FAQPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16">
        <FAQ />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
