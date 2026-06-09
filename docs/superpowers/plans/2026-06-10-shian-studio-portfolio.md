# SHIAN Studio Portfolio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page dark-theme portfolio website for SHIAN Studio with 6 scroll sections, video showcase, pricing cards, and contact form — deployed to Vercel.

**Architecture:** Next.js 14 App Router with static site generation (SSG). Single `page.tsx` composing 6 section components. Tailwind CSS for styling, Framer Motion for scroll animations. Formspree for contact form submission. YouTube lite embeds for video showcase.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, @lite-youtube-embed/react, Formspree

---

## File Structure

```
g:\agent\trae\code\
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, global styles
│   ├── page.tsx                # Main page composing all sections
│   ├── globals.css             # Tailwind directives + custom CSS vars
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx              # Sticky navigation bar
│   ├── Hero.tsx                # Section 1: hero with CTA
│   ├── Services.tsx            # Section 2: pricing cards
│   ├── PricingCard.tsx         # Reusable pricing card component
│   ├── Portfolio.tsx           # Section 3: video showcase grid
│   ├── VideoCard.tsx           # Individual video card with thumbnail
│   ├── TechStack.tsx           # Section 4: tech tags + process timeline
│   ├── ProcessStep.tsx         # Single step in the process timeline
│   ├── About.tsx               # Section 5: bio + trust signals
│   ├── TrustCard.tsx           # Single trust signal stat card
│   ├── Contact.tsx             # Section 6: contact form
│   └── Footer.tsx              # Footer with social links
├── lib/
│   └── constants.ts            # Brand colors, text content, pricing data
├── public/
│   └── videos/                 # Video thumbnail placeholder images
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── docs/
    └── superpowers/
        ├── specs/2026-06-10-shian-studio-portfolio-design.md
        └── plans/2026-06-10-shian-studio-portfolio.md
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Initialize Next.js project with TypeScript and Tailwind**

Run:
```bash
cd g:/agent/trae/code
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Select defaults when prompted. This creates the full Next.js 14 project with App Router, TypeScript, Tailwind CSS, and ESLint.

- [ ] **Step 2: Install additional dependencies**

Run:
```bash
npm install framer-motion @lite-youtube-embed/react @lite-youtube-embed/css
```

- [ ] **Step 3: Configure Tailwind with brand colors and fonts**

Replace the contents of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0a1628",
        "navy-light": "#0f2040",
        accent: "#4a9eff",
        mint: "#50e3c2",
        purple: "#bd10e0",
        amber: "#f5a623",
        coral: "#ff6b6b",
        surface: "#1a1a2e",
        "surface-light": "#2a2a3e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      letterSpacing: {
        brand: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Set up global CSS with dark theme base**

Replace the contents of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@lite-youtube-embed/css";

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: #0a0a0a;
    color: #e0e0e0;
  }

  ::selection {
    background-color: rgba(74, 158, 255, 0.3);
    color: #ffffff;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-accent to-mint;
  }
}
```

- [ ] **Step 5: Verify dev server starts**

Run:
```bash
cd g:/agent/trae/code
npm run dev
```

Expected: Server starts on http://localhost:3000 with the default Next.js page.

- [ ] **Step 6: Commit scaffolding**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 project with Tailwind and Framer Motion"
```

---

### Task 2: Constants and Data Layer

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create constants file with all brand data, pricing, and content**

Create `lib/constants.ts`:

```typescript
export const BRAND = {
  name: "SHIAN",
  subtitle: "Digital Product Studio",
  tagline: "Your AI-powered full-stack partner.",
  footerTag: "Built with ❤️ and AI",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    description: "Landing Page / Portfolio Site",
    price: "$499",
    priceNote: "per project",
    highlight: false,
    accentColor: "mint",
    features: [
      "Responsive single-page design",
      "Up to 5 sections",
      "Contact form integration",
      "SEO basics + mobile-first",
      "3-day delivery",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Full Website / Mini Program",
    price: "$1,999",
    priceNote: "per project",
    highlight: true,
    accentColor: "accent",
    features: [
      "Multi-page website OR mini program",
      "Custom UI/UX design",
      "CMS / Admin panel included",
      "Database + API integration",
      "2 rounds of revision",
      "7-day delivery",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "SaaS / Dashboard / Custom System",
    price: "$4,999+",
    priceNote: "custom quote",
    highlight: false,
    accentColor: "purple",
    features: [
      "Full-stack application development",
      "User auth + role management",
      "Payment integration",
      "Deployment + DevOps setup",
      "30-day post-launch support",
      "2-4 week delivery",
    ],
  },
  {
    id: "custom",
    name: "Custom Project",
    description: "Have a unique idea? Let's discuss your needs and build something great.",
    price: null,
    priceNote: null,
    highlight: false,
    accentColor: "amber",
    isCustom: true,
    features: [],
  },
] as const;

export const TECH_STACK = [
  { name: "React / Next.js", color: "#61dafb" },
  { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#ffd43b" },
  { name: "Vue / UniApp", color: "#42b883" },
  { name: "Firebase", color: "#e34c26" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ed" },
  { name: "Codex / Claude Code", color: "#f5a623" },
] as const;

export const PROCESS_STEPS = [
  { icon: "💬", title: "Discovery Call", description: "Understand your needs", step: 1 },
  { icon: "📐", title: "Design & Plan", description: "Wireframes + timeline", step: 2 },
  { icon: "⚡", title: "AI-Powered Build", description: "Fast, quality code", step: 3 },
  { icon: "🚀", title: "Launch & Support", description: "Deploy + iterate", step: 4 },
] as const;

export const TRUST_SIGNALS = [
  { value: "CS", label: "Degree Holder" },
  { value: "Full", label: "Stack Dev" },
  { value: "AI", label: "Native Workflow" },
  { value: "3-5x", label: "Faster Delivery" },
] as const;

export const BIO_EN = "CS graduate with IoT specialization. Full-stack developer building production-ready web apps, mini programs, and SaaS products — powered by cutting-edge AI tools for maximum speed and quality.";

export const BIO_ZH = "计算机科学出身，物联网方向。全栈开发者，用 AI 驱动的方式帮你把想法变成可上线的产品。从网站到小程序到完整系统，全栈交付。";

export const PORTFOLIO_ITEMS = [
  {
    id: "saas-dashboard",
    title: "Building a SaaS Dashboard in 4 Hours",
    description: "Time-lapse: AI-powered full-stack development",
    tags: ["React", "Node.js", "AI Coding"],
    tagColors: ["#50e3c2", "#4a9eff", "#bd10e0"],
    youtubeId: "PLACEHOLDER_1",
    thumbnail: "/videos/saas-dashboard.jpg",
  },
  {
    id: "wechat-miniprogram",
    title: "WeChat Mini Program: E-Commerce MVP",
    description: "Full demo: from design to working prototype",
    tags: ["UniApp", "WeChat"],
    tagColors: ["#50e3c2", "#4a9eff"],
    youtubeId: "PLACEHOLDER_2",
    thumbnail: "/videos/miniprogram.jpg",
  },
  {
    id: "this-website",
    title: "This Website Itself: Built with AI",
    description: "Meta-project: the portfolio site as proof of skill",
    tags: ["Next.js", "AI Coding"],
    tagColors: ["#f5a623", "#bd10e0"],
    youtubeId: "PLACEHOLDER_3",
    thumbnail: "/videos/this-website.jpg",
  },
] as const;

export const PROJECT_TYPES = [
  "Landing Page",
  "Website",
  "Mini Program",
  "SaaS",
  "Dashboard",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under $500",
  "$500 - $2,000",
  "$2,000 - $5,000",
  "$5,000+",
  "Not Sure",
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/shian",
  twitter: "https://x.com/shian_dev",
  youtube: "https://youtube.com/@shian_dev",
  email: "mailto:hello@shian.studio",
} as const;
```

- [ ] **Step 2: Commit constants**

```bash
git add lib/constants.ts
git commit -m "feat: add brand data, pricing tiers, and content constants"
```

---

### Task 3: Root Layout and Metadata

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 1: Create root layout with Inter font, metadata, and structured data**

Replace the contents of `app/layout.tsx`:

```tsx
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
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIAN Studio — Digital Product Studio",
    description:
      "Custom websites, mini programs, and SaaS products. Fast delivery powered by AI.",
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
```

- [ ] **Step 2: Commit layout**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with SEO metadata and structured data"
```

---

### Task 4: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create sticky navigation bar**

Create `components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-light text-lg tracking-brand">
          {BRAND.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm px-4 py-2 rounded-md bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all duration-200"
          >
            Get a Quote
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${
                mobileOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-md border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="text-accent text-sm font-medium"
              >
                Get a Quote →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Commit Navbar**

```bash
git add components/Navbar.tsx
git commit -m "feat: add sticky Navbar with mobile hamburger menu"
```

---

### Task 5: Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero section with animated background**

Create `components/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0a0a1a] to-[#1a0a2e]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extralight tracking-brand text-white mb-4"
        >
          {BRAND.name}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-16 h-0.5 bg-mint mx-auto mb-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base tracking-widest text-mint uppercase mb-6"
        >
          {BRAND.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-gray-300 italic mb-10"
        >
          &ldquo;{BRAND.tagline}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 hover:shadow-[0_0_30px_rgba(74,158,255,0.3)] transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit Hero**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with gradient background and animated CTAs"
```

---

### Task 6: Services & Pricing Section

**Files:**
- Create: `components/PricingCard.tsx`
- Create: `components/Services.tsx`

- [ ] **Step 1: Create PricingCard component**

Create `components/PricingCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  description: string;
  price: string | null;
  priceNote: string | null;
  highlight: boolean;
  accentColor: string;
  isCustom?: boolean;
  features: readonly string[];
}

const colorMap: Record<string, { border: string; badge: string; text: string }> = {
  mint: { border: "border-mint/40", badge: "text-mint", text: "text-mint" },
  accent: { border: "border-accent/60", badge: "text-accent", text: "text-accent" },
  purple: { border: "border-purple/40", badge: "text-purple", text: "text-purple" },
  amber: { border: "border-amber/40", badge: "text-amber", text: "text-amber" },
};

export default function PricingCard({
  name,
  description,
  price,
  priceNote,
  highlight,
  accentColor,
  isCustom,
  features,
}: PricingCardProps) {
  const colors = colorMap[accentColor] || colorMap.accent;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative flex flex-col rounded-xl p-6 bg-surface ${
        highlight
          ? `border-2 ${colors.border} shadow-lg`
          : "border border-white/5"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={`text-xs px-3 py-1 rounded-full bg-accent/20 ${colors.badge}`}>
            ⭐ Recommended
          </span>
        </div>
      )}

      <div className={`text-xs tracking-widest uppercase ${colors.badge} mb-2`}>
        {name}
      </div>
      <p className="text-sm text-gray-400 mb-4">{description}</p>

      {price ? (
        <>
          <div className="text-3xl font-bold text-white mb-1">{price}</div>
          <div className="text-xs text-gray-500 mb-6">{priceNote}</div>
        </>
      ) : (
        <div className="mb-6" />
      )}

      {features.length > 0 && (
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature) => (
            <li key={feature} className="text-sm text-gray-300 flex items-start gap-2">
              <span className={`${colors.text} mt-0.5`}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {isCustom ? (
        <a
          href="#contact"
          className="block text-center py-3 rounded-lg border-2 border-amber text-amber font-medium hover:bg-amber/10 transition-all duration-200"
        >
          Get a Free Quote →
        </a>
      ) : (
        <a
          href="#contact"
          className={`block text-center py-3 rounded-lg font-medium transition-all duration-200 ${
            highlight
              ? "bg-accent text-white hover:bg-accent/80"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          Get Started
        </a>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create Services section composing pricing cards**

Create `components/Services.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import PricingCard from "./PricingCard";

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Services & Pricing
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Transparent pricing. No hidden fees. Choose a package or get a custom quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <PricingCard
                name={tier.name}
                description={tier.description}
                price={tier.price}
                priceNote={tier.priceNote}
                highlight={tier.highlight}
                accentColor={tier.accentColor}
                isCustom={"isCustom" in tier ? tier.isCustom : false}
                features={tier.features}
              />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          All prices are starting rates. Final quote based on project scope.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit Services & Pricing**

```bash
git add components/PricingCard.tsx components/Services.tsx
git commit -m "feat: add Services section with 4 pricing tiers and card component"
```

---

### Task 7: Portfolio / Video Showcase Section

**Files:**
- Create: `components/VideoCard.tsx`
- Create: `components/Portfolio.tsx`

- [ ] **Step 1: Create VideoCard component**

Create `components/VideoCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LiteYouTubeEmbed from "@lite-youtube-embed/react";

interface VideoCardProps {
  title: string;
  description: string;
  tags: readonly string[];
  tagColors: readonly string[];
  youtubeId: string;
}

export default function VideoCard({
  title,
  description,
  tags,
  tagColors,
  youtubeId,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-surface rounded-xl overflow-hidden border border-white/5"
    >
      <div className="relative aspect-video bg-black">
        {playing ? (
          <LiteYouTubeEmbed
            id={youtubeId}
            title={title}
            activatedClass="absolute inset-0"
            iframeClass="absolute inset-0 w-full h-full"
            noCookie={true}
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1" />
            </div>
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
              VIDEO
            </div>
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${tagColors[i]}15`,
                color: tagColors[i],
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create Portfolio section**

Create `components/Portfolio.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import VideoCard from "./VideoCard";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-[#080810]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Portfolio
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Watch how I build production-ready projects from scratch — powered by AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item) => (
            <VideoCard
              key={item.id}
              title={item.title}
              description={item.description}
              tags={item.tags}
              tagColors={item.tagColors}
              youtubeId={item.youtubeId}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="text-accent hover:text-accent/80 transition-colors font-medium"
          >
            Want something like this? Let&apos;s talk →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit Portfolio**

```bash
git add components/VideoCard.tsx components/Portfolio.tsx
git commit -m "feat: add Portfolio section with YouTube video cards"
```

---

### Task 8: Tech Stack & Process Section

**Files:**
- Create: `components/ProcessStep.tsx`
- Create: `components/TechStack.tsx`

- [ ] **Step 1: Create ProcessStep component**

Create `components/ProcessStep.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  icon: string;
  title: string;
  description: string;
  step: number;
  isLast: boolean;
}

const stepColors = ["text-accent", "text-mint", "text-amber", "text-coral"];

export default function ProcessStep({ icon, title, description, step, isLast }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: step * 0.15 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="min-w-[140px] p-4 bg-surface rounded-xl">
        <div className="text-3xl mb-2">{icon}</div>
        <div className={`text-xs font-semibold ${stepColors[step - 1]} mb-1`}>
          Step {step}
        </div>
        <div className="text-sm text-white font-medium">{title}</div>
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      </div>

      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/10" />
      )}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create TechStack section**

Create `components/TechStack.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { TECH_STACK, PROCESS_STEPS } from "@/lib/constants";
import ProcessStep from "./ProcessStep";

export default function TechStack() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The tools and technologies I use to deliver quality at speed.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {TECH_STACK.map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-lg border border-white/5 text-sm"
              style={{
                backgroundColor: `${tech.color}08`,
                color: tech.color,
              }}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How I Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={step.step}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit TechStack**

```bash
git add components/ProcessStep.tsx components/TechStack.tsx
git commit -m "feat: add Tech Stack and Process section with animated steps"
```

---

### Task 9: Social Proof & About Section

**Files:**
- Create: `components/TrustCard.tsx`
- Create: `components/About.tsx`

- [ ] **Step 1: Create TrustCard component**

Create `components/TrustCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface TrustCardProps {
  value: string;
  label: string;
  index: number;
}

export default function TrustCard({ value, label, index }: TrustCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface p-4 rounded-lg text-center border border-white/5"
    >
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create About section**

Create `components/About.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { TRUST_SIGNALS, BIO_EN, BIO_ZH, SOCIAL_LINKS } from "@/lib/constants";
import TrustCard from "./TrustCard";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#080810]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Shian
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">{BIO_EN}</p>
            <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-accent/30 pl-4">
              {BIO_ZH}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Trust Signals
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {TRUST_SIGNALS.map((signal, i) => (
                <TrustCard
                  key={signal.label}
                  value={signal.value}
                  label={signal.label}
                  index={i}
                />
              ))}
            </div>

            <div className="flex gap-4 mt-8 justify-center lg:justify-start">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                X / Twitter
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                YouTube
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit About**

```bash
git add components/TrustCard.tsx components/About.tsx
git commit -m "feat: add About section with bio, trust signals, and social links"
```

---

### Task 10: Contact Form Section

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create Contact form with Formspree integration**

Create `components/Contact.tsx`:

```tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_TYPES, BUDGET_RANGES, SOCIAL_LINKS } from "@/lib/constants";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/PLACEHOLDER_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s build something great.
          </h2>
          <p className="text-gray-400 mb-10">
            Tell me about your project — I&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16"
            >
              <div className="text-5xl mb-4">✅</div>
              <p className="text-xl text-white font-medium">
                Message sent!
              </p>
              <p className="text-gray-400 mt-2">
                I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="text-left space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Project Type *
                  </label>
                  <select
                    name="project_type"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Tell me about your project *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Describe your idea..."
                />
              </div>

              {status === "error" && (
                <p className="text-coral text-sm">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <a
            href={SOCIAL_LINKS.email}
            className="bg-surface px-4 py-2 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/20 transition-colors"
          >
            📧 hello@shian.studio
          </a>
          <a
            href="#"
            className="bg-surface px-4 py-2 rounded-lg text-sm text-gray-400 border border-white/5 hover:border-white/20 transition-colors"
          >
            📅 Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit Contact**

```bash
git add components/Contact.tsx
git commit -m "feat: add Contact form section with Formspree integration"
```

---

### Task 11: Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer**

Create `components/Footer.tsx`:

```tsx
import { BRAND, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            X
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            YouTube
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            Email
          </a>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {BRAND.name} Studio. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 mt-1">{BRAND.footerTag}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit Footer**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with social links and copyright"
```

---

### Task 12: Compose Main Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Create main page composing all sections**

Replace the contents of `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the full site renders**

Run:
```bash
cd g:/agent/trae/code
npm run dev
```

Expected: Site renders at http://localhost:3000 with all 6 sections, navbar, and footer. No console errors.

- [ ] **Step 3: Commit main page**

```bash
git add app/page.tsx
git commit -m "feat: compose main page with all sections"
```

---

### Task 13: Build Verification and Deploy Prep

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Configure Next.js for static export**

Replace the contents of `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

- [ ] **Step 2: Run production build**

Run:
```bash
cd g:/agent/trae/code
npm run build
```

Expected: Build completes successfully with no errors. Static files generated in `out/` directory.

- [ ] **Step 3: Commit and tag**

```bash
git add -A
git commit -m "feat: complete SHIAN Studio portfolio website v1"
git tag v1.0.0
```

- [ ] **Step 4: Deploy to Vercel (manual step)**

Run:
```bash
cd g:/agent/trae/code
npx vercel
```

Follow prompts to link to Vercel account and deploy. The site will be live on a `.vercel.app` subdomain. Custom domain (shian.io or shian.studio) can be configured in the Vercel dashboard after deployment.

---

## Post-Deployment Checklist

After the site is live, complete these manual steps:
1. Create Formspree account and replace `PLACEHOLDER_FORM_ID` in `components/Contact.tsx` with real form ID
2. Create Calendly account and update the "Book a Call" link in `components/Contact.tsx`
3. Update social links in `lib/constants.ts` with actual GitHub/X/YouTube URLs
4. Replace `PLACEHOLDER_*` YouTube IDs in `lib/constants.ts` with real video IDs after publishing videos
5. Configure custom domain in Vercel dashboard
6. Add real video thumbnails to `public/videos/`
7. Run Lighthouse audit and verify Performance > 95
