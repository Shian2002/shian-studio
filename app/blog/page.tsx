import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import BlogListClient from "@/components/BlogListClient";
import TranslationErrorBoundary from "@/components/TranslationErrorBoundary";

export const metadata: Metadata = {
  title: "Blog - MVP & SaaS Development Insights",
  description:
    "Practical guides on MVP development costs, timelines, and real case studies from SHIAN Studio. Learn how startups and SMBs build and launch products fast.",
  openGraph: {
    title: "SHIAN Studio Blog - MVP & SaaS Development Insights",
    description:
      "Practical guides on MVP development costs, timelines, and real case studies from SHIAN Studio.",
    type: "website",
  },
};

export default function BlogListPage() {
  return (
    <TranslationErrorBoundary>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16">
        <BlogListClient />
      </main>
      <Footer />
      <BackToTop />
    </TranslationErrorBoundary>
  );
}
