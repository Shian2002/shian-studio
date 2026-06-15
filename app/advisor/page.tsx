import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Advisor from "@/components/Advisor";

export const metadata: Metadata = {
  title: "Tech Advisor Subscription - SHIAN Studio",
  description:
    "Monthly tech advisor subscription with text-based async support. No video calls. Three tiers from $290/mo. Cancel anytime.",
};

export default function AdvisorPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16">
        <Advisor />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
