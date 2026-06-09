import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
    default: "SHIAN Studio — AI-Powered Full-Stack Development Studio",
    template: "%s | SHIAN Studio",
  },
  description:
    "SHIAN Studio 是一家以 AI 驱动的全栈开发工作室，为全球企业交付生产级网站、小程序与 SaaS 产品。从 MVP 到规模化，以更短的时间和更低的成本，打造优秀的数字产品。",
  keywords: [
    "full-stack developer",
    "custom development",
    "AI-powered development",
    "website development",
    "mini program",
    "SaaS development",
    "Next.js developer",
    "React developer",
    "WeChat mini program",
    "SHIAN Studio",
    "AI coding",
    "vibe coding",
  ],
  authors: [{ name: "Shian", url: SITE_URL }],
  creator: "Shian",
  publisher: "SHIAN Studio",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": "/",
      "zh-CN": "/",
    },
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
    alternateLocale: ["zh_CN"],
    siteName: "SHIAN Studio",
    url: SITE_URL,
    title: "SHIAN Studio — AI-Powered Full-Stack Development Studio",
    description:
      "AI-driven full-stack development studio. Websites, mini programs, SaaS products — delivered fast.",
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
    title: "SHIAN Studio — AI-Powered Full-Stack Studio",
    description:
      "Websites, mini programs, and SaaS products. Full-stack delivery powered by AI.",
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
    { media: "(prefers-color-scheme: light)", color: "#0a0a1a" },
  ],
  colorScheme: "dark",
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
        "AI-powered full-stack custom development studio building websites, mini programs, and SaaS products.",
      url: SITE_URL,
      image: OG_IMAGE,
      priceRange: "$$$",
      areaServed: "Worldwide",
      sameAs: [
        "https://github.com/shian",
        "https://x.com/shian_dev",
        "https://youtube.com/@shian_dev",
      ],
      knowsLanguage: ["en", "zh-CN"],
      serviceType: [
        "Web Development",
        "Mini Program Development",
        "SaaS Development",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person`,
      name: "Shian",
      jobTitle: "Full-Stack Developer",
      worksFor: { "@id": `${SITE_URL}#professional-service` },
      sameAs: [
        "https://github.com/shian",
        "https://x.com/shian_dev",
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
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
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
      </head>
      <body className="font-sans bg-[#0a0a0a] text-gray-200 antialiased selection:bg-accent/30 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
