import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SHIAN Studio — Digital Product Studio | AI-Powered Full-Stack Development",
  description:
    "SHIAN Studio builds production-ready websites, mini programs, and SaaS products. Full-stack development powered by AI — fast, reliable, affordable.",
  keywords: [
    "full-stack developer",
    "custom development",
    "AI-powered development",
    "website development",
    "mini program",
    "SaaS development",
    "SHIAN Studio",
  ],
  authors: [{ name: "Shian" }],
  openGraph: {
    title: "SHIAN Studio — Your AI-Powered Full-Stack Partner",
    description:
      "Custom websites, mini programs, and SaaS products. Fast delivery powered by AI.",
    type: "website",
    locale: "en_US",
    siteName: "SHIAN Studio",
    images: [
      {
        url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SHIAN%20Studio%20dark%20tech%20brand%20banner%20with%20blue%20gradient%20abstract%20geometry%20minimalist%20professional&image_size=landscape_16_9",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIAN Studio — Digital Product Studio",
    description:
      "Custom websites, mini programs, and SaaS products. Fast delivery powered by AI.",
    images: [
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SHIAN%20Studio%20dark%20tech%20brand%20banner%20with%20blue%20gradient%20abstract%20geometry%20minimalist%20professional&image_size=landscape_16_9",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "SHIAN Studio",
              description:
                "AI-powered full-stack custom development studio",
              url: "https://shian.studio",
              priceRange: "$499 - $5000+",
              areaServed: "Worldwide",
              serviceType: [
                "Web Development",
                "Mini Program Development",
                "SaaS Development",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-[#0a0a0a] text-gray-200 antialiased">
        {children}
      </body>
    </html>
  );
}
