import type { Metadata } from "next";
import CaseStudiesPage from "@/components/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies — MVP & SaaS Projects Delivered",
  description:
    "Real products delivered to real clients. See how SHIAN Studio helps startups and SMBs launch MVPs, SaaS products, and AI dashboards in weeks.",
};

export default function Page() {
  return <CaseStudiesPage />;
}
