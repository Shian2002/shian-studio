import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import ServiceDetail from "@/components/ServiceDetail";
import { PRICING_TIERS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRICING_TIERS.map((tier) => ({ slug: tier.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tier = PRICING_TIERS.find((t) => t.id === slug);
  if (!tier) return {};

  return {
    title: `${tier.name} — SHIAN Studio Services`,
    description: tier.description,
  };
}

export default async function ServiceDetailRoute({ params }: Props) {
  const { slug } = await params;
  const tier = PRICING_TIERS.find((t) => t.id === slug);

  if (!tier) {
    notFound();
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <ServiceDetail tier={tier} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
