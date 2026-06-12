import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/LanguageContext";
import { GA_ID } from "@/lib/analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://shian.studio";
const OG_IMAGE =
  "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SHIAN%20Studio%20dark%20tech%20brand%20banner%20with%20blue%20gradient%20abstract%20geometry%20minimalist%20professional&image_size=landscape_16_9";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SHIAN Studio — MVP & SaaS Development for Startups and SMBs",
    template: "%s | SHIAN Studio",
  },
  description:
    "SHIAN Studio delivers production-ready MVPs, SaaS products, and AI dashboards for startups and SMBs. From idea to launch in 2-4 weeks. AI-powered full-stack delivery.",
  keywords: [
    "MVP development",
    "SaaS development",
    "startup MVP",
    "AI dashboard",
    "product development",
    "rapid prototyping",
    "full-stack developer",
    "custom development",
    "AI-powered development",
    "website development",
    "Next.js developer",
    "React developer",
    "SHIAN Studio",
    "AI coding",
    "vibe coding",
  ],
  authors: [{ name: "Shian", url: SITE_URL }],
  creator: "Shian",
  publisher: "SHIAN Studio",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  applicationName: "SHIAN Studio",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SHIAN Studio",
    url: SITE_URL,
    title: "SHIAN Studio — MVP & SaaS Development for Startups and SMBs",
    description:
      "SHIAN Studio delivers production-ready MVPs, SaaS products, and AI dashboards for startups and SMBs. From idea to launch in 2-4 weeks. AI-powered full-stack delivery.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SHIAN Studio — AI-Powered Full-Stack Development",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIAN Studio — MVP & SaaS Development for Startups and SMBs",
    description:
      "SHIAN Studio delivers production-ready MVPs, SaaS products, and AI dashboards for startups and SMBs. From idea to launch in 2-4 weeks. AI-powered full-stack delivery.",
    creator: "@shian_dev",
    creatorId: "@shian_dev",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SHIAN Studio",
      },
    ],
  },
  verification: {
    google: "shian-studio",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}#professional-service`,
      name: "SHIAN Studio",
      description:
        "AI-powered full-stack development studio specializing in MVP and SaaS delivery for startups and SMBs worldwide.",
      url: SITE_URL,
      image: OG_IMAGE,
      priceRange: "$$$",
      areaServed: "Worldwide",
      sameAs: [
        "https://github.com/Shian2002",
        "https://x.com/shiancoding",
        "https://youtube.com/@shian_dev",
      ],
      knowsLanguage: ["en"],
      serviceType: [
        "MVP Development",
        "SaaS Development",
        "AI Dashboard Development",
        "Full-Stack Development",
        "Web Application Development",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person`,
      name: "Shian",
      jobTitle: "MVP & SaaS Developer",
      worksFor: { "@id": `${SITE_URL}#professional-service` },
      sameAs: [
        "https://github.com/Shian2002",
        "https://x.com/shiancoding",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "Mini Programs",
        "SaaS Architecture",
        "AI Coding",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "SHIAN Studio",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of projects does SHIAN Studio specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We specialize in MVP development, SaaS product builds, AI dashboards, and internal tools for startups and SMBs. From rapid prototyping to production deployment.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can you deliver an MVP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MVP Sprint: 2-4 weeks. SaaS Build: 4-8 weeks. AI Dashboard: 2-4 weeks. Landing Pages: 3 days. AI-powered workflows enable 3-5x faster delivery.",
          },
        },
        {
          "@type": "Question",
          name: "What is AI-powered development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We use cutting-edge AI coding tools like Claude Code, Codex, and Cursor to accelerate development without sacrificing quality. This means faster delivery, fewer bugs, and more competitive pricing.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer post-launch support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Enterprise plans include 30-day post-launch support. We also offer ongoing maintenance packages for all plan tiers.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE_URL}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Case Studies",
          item: `${SITE_URL}/case-studies`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://trae-api-cn.mchost.guru"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* GA4 — only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans bg-th-bg text-th-text2 antialiased selection:bg-accent/30 selection:text-th-text">
        <LanguageProvider>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to content
        </a>
        {children}
        </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
