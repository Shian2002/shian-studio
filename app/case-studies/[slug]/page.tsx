import type { Metadata } from "next";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import CaseStudyDetail from "@/components/CaseStudyDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((i) => i.id === slug);
  if (!item) {
    return { title: "Case Study Not Found | SHIAN Studio" };
  }

  // Demo projects (no case study data) should not be indexed
  const hasFullCaseStudy = !!item.caseStudy;

  return {
    title: `${item.title} — SHIAN Studio Case Studies`,
    description: item.description,
    robots: hasFullCaseStudy
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: hasFullCaseStudy
      ? {
          title: `${item.title} — SHIAN Studio`,
          description: item.description,
        }
      : undefined,
  };
}

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({ slug: item.id }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyDetail slug={slug} />;
}
