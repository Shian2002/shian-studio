# SHIAN Studio — Personal Portfolio Website Design Spec

**Date:** 2026-06-10
**Author:** Shian (时安)
**Status:** Draft — Pending Review

---

## 1. Project Overview

### Goal
Build a single-page portfolio website for **SHIAN Studio** — a personal brand / digital product studio. The site serves as the central hub for acquiring ToB clients who need custom development services (websites, mini programs, SaaS products). All social media efforts (X, YouTube, GitHub) will drive traffic here.

### Target Audience
- **Primary:** Overseas SMB owners, startup founders, non-technical entrepreneurs seeking custom development
- **Secondary:** Chinese businesses needing WeChat mini programs, websites, or internal tools
- **Tertiary:** English-speaking clients on Upwork/Fiverr discovering the site through content marketing

### Key Metrics for Success
- Visitor converts to inquiry (contact form submission or Calendly booking)
- Average time on page > 2 minutes (engagement with video content)
- Bounce rate < 50%

---

## 2. Brand Identity

| Element | Value |
|---------|-------|
| **Brand Name** | SHIAN |
| **Subtitle** | Digital Product Studio |
| **Tagline** | Your AI-powered full-stack partner. |
| **Domain** | shian.io or shian.studio (TBD — .dev as fallback) |
| **Visual Style** | Dark theme, minimalist, premium tech aesthetic |
| **Primary Colors** | Deep navy (#0a1628), accent blue (#4a9eff), mint (#50e3c2) |
| **Secondary Colors** | Purple (#bd10e0), amber (#f5a623), coral (#ff6b6b) |
| **Typography** | Inter (headings + body), monospace for code snippets |
| **Language** | English primary, Chinese secondary (selective bilingual) |

---

## 3. Site Architecture

Single-page scroll-driven layout with 6 sections. Sticky top navigation for quick jumps.

```
┌─────────────────────────────────┐
│ Sticky Nav: Logo | Services | Portfolio | Contact │
├─────────────────────────────────┤
│ ① HERO                         │
│   Name, tagline, dual CTA       │
├─────────────────────────────────┤
│ ② SERVICES & PRICING           │
│   3 standard + 1 custom card    │
├─────────────────────────────────┤
│ ③ PORTFOLIO / VIDEO SHOWCASE   │
│   Video grid + tech tags        │
├─────────────────────────────────┤
│ ④ TECH STACK & PROCESS         │
│   Tool logos + 4-step workflow  │
├─────────────────────────────────┤
│ ⑤ SOCIAL PROOF & ABOUT         │
│   Bio + trust signals + links   │
├─────────────────────────────────┤
│ ⑥ CONTACT & CTA                │
│   Form + email + calendly       │
├─────────────────────────────────┤
│ FOOTER                          │
│   Social links + copyright      │
└─────────────────────────────────┘
```

---

## 4. Section Specifications

### 4.1 Hero Section

**Purpose:** Hook the visitor in 3 seconds — who you are, what you do, how to reach you.

**Content:**
- Brand name: **SHIAN** (large, light-weight, letter-spaced)
- Separator line (accent color)
- Subtitle: *Digital Product Studio*
- Tagline: *"Your AI-powered full-stack partner."*
- Dual CTA buttons:
  - Primary: **"View My Work"** (scrolls to Portfolio)
  - Secondary: **"Get a Quote"** (scrolls to Contact)
- Background: Dark gradient with subtle animated particles or flowing gradient effect

**Behavior:**
- Full viewport height (100vh)
- Background animation runs at 60fps, pauses when not visible
- CTA buttons have hover glow effect
- Responsive: text scales down on mobile, buttons stack vertically

### 4.2 Services & Pricing

**Purpose:** Transparent pricing to filter qualified leads and reduce back-and-forth.

**Layout:** 4 pricing cards in a horizontal row (desktop) or stacked (mobile).

**Cards:**

| Tier | Name | Price | Target | Delivery |
|------|------|-------|--------|----------|
| Starter | Landing Page / Portfolio | $499 | Solo entrepreneurs, small promos | 3 days |
| Professional ⭐ | Full Website / Mini Program | $1,999 | SMBs, core target segment | 7 days |
| Enterprise | SaaS / Dashboard / Custom System | $4,999+ | Tech-savvy companies | 2-4 weeks |
| Custom | Bespoke Project | Free Quote | Any non-standard need | TBD |

**Starter ($499) includes:**
- Responsive single-page design
- Up to 5 sections
- Contact form integration
- SEO basics + mobile-first
- 3-day delivery

**Professional ($1,999) includes:**
- Multi-page website OR mini program
- Custom UI/UX design
- CMS / Admin panel included
- Database + API integration
- 2 rounds of revision
- 7-day delivery

**Enterprise ($4,999+) includes:**
- Full-stack application development
- User auth + role management
- Payment integration
- Deployment + DevOps setup
- 30-day post-launch support
- 2-4 week delivery

**Custom card:**
- No price listed
- CTA: "Get a Free Quote →" (scrolls to contact form with pre-filled project type)
- Descriptive copy: "Have a unique idea? Let's discuss your needs and build something great."

**Footer note:** "All prices are starting rates. Final quote based on project scope."

**Behavior:**
- Professional card highlighted with accent border and ⭐ badge
- Cards have subtle hover lift animation
- On mobile: horizontal swipe carousel or vertical stack

### 4.3 Portfolio / Video Showcase

**Purpose:** Prove capability through process demonstration videos, even without prior client work.

**Content Strategy (S1 + S3 combined):**
- **Speed Build Videos:** Time-lapse recordings of building real projects from scratch (e.g., "Building a SaaS Dashboard in 4 Hours")
- **This Website Itself:** Meta-project — the portfolio site is proof of skill
- **Future Client Work:** Slot for adding real client projects over time

**Layout:** 3-column card grid (desktop), single column (mobile). Each card contains:
- Video thumbnail with play button overlay
- "VIDEO" badge (top-left)
- Progress bar (bottom) on hover
- Title (e.g., "Building a SaaS Dashboard in 4 Hours")
- Description (e.g., "Time-lapse: AI-powered full-stack development")
- Tech stack tags (colored pills: React, Node.js, AI Coding, etc.)

**Initial Videos (to be produced):**
1. "Building a SaaS Dashboard in 4 Hours" — React + Node.js + AI Coding
2. "WeChat Mini Program: E-Commerce MVP" — UniApp + WeChat
3. "This Website Itself: Built with AI" — Next.js + AI Coding

**Behavior:**
- Click opens YouTube embed inline (no page navigation)
- Bottom CTA: "Want something like this? Let's talk →" links to Contact
- Cards animate in on scroll (fade-up)

### 4.4 Tech Stack & Process

**Purpose:** Show technical credibility and set expectations for the development workflow.

**Tech Stack Display:**
- Horizontal tag cloud with icons and colored labels
- Technologies: React / Next.js, Node.js, Python, Vue / UniApp, Firebase, PostgreSQL, Docker, Codex / Claude Code
- Each tag has its ecosystem color on dark background

**"How I Work" Process:**
4-step horizontal timeline with icons:
1. **💬 Discovery Call** — Understand your needs
2. **📐 Design & Plan** — Wireframes + timeline
3. **⚡ AI-Powered Build** — Fast, quality code
4. **🚀 Launch & Support** — Deploy + iterate

**Behavior:**
- Steps animate sequentially on scroll
- Each step has a subtle connecting line/arrow to the next
- Mobile: vertical stack with connecting line

### 4.5 Social Proof & About

**Purpose:** Build trust through credentials, background, and social presence.

**Layout:** Two-column (desktop), stacked (mobile).

**Left column — About Shian:**
- English bio (2-3 sentences): CS graduate, IoT specialization, full-stack, AI-powered workflow
- Chinese bio (2-3 sentences): 中文简介，强调全栈能力和 AI 驱动交付
- Tone: Professional but approachable

**Right column — Trust Signals:**
- 2x2 grid of stat cards:
  - **CS** — Degree Holder
  - **Full** — Stack Dev
  - **AI** — Native Workflow
  - **3-5x** — Faster Delivery

**Social Links Row:**
- GitHub: [Shian's GitHub username — to be created]
- X (Twitter): [Shian's X handle — to be created]
- YouTube: [Shian's YouTube channel — to be created]

**Behavior:**
- Trust signal cards have subtle counter animation on scroll
- Social links open in new tab

### 4.6 Contact & CTA

**Purpose:** Convert visitor to lead — the primary conversion point.

**Content:**
- Headline: "Let's build something great."
- Subtext: "Tell me about your project — I'll get back within 24 hours."

**Form Fields:**
| Field | Type | Required |
|-------|------|----------|
| Your Name | Text input | Yes |
| Email | Email input | Yes |
| Project Type | Dropdown: Landing Page / Website / Mini Program / SaaS / Dashboard / Other | Yes |
| Budget Range | Dropdown: Under $500 / $500-$2,000 / $2,000-$5,000 / $5,000+ / Not Sure | Yes |
| Tell me about your project | Textarea | Yes |

**Below form:**
- Email: [Shian's actual email — to be provided before deployment]
- Calendly booking link: [Shian's Calendly URL — to be created before deployment]

**Behavior:**
- Form validation with inline error messages
- Submission via Formspree or EmailJS (free tier)
- Success state: "Message sent! I'll get back to you within 24 hours." with checkmark animation
- CTA button has loading spinner during submission

### 4.7 Footer

**Content:**
- Social icons: GitHub, X, YouTube, Email
- Copyright: "© 2026 SHIAN Studio. All rights reserved."
- Tagline: "Built with ❤️ and AI"
- Optional: Language toggle (EN / 中文)

---

## 5. Technical Architecture

### Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 (App Router) | SSG for speed, React for interactivity, good SEO |
| Styling | Tailwind CSS | Rapid dark-theme development, utility-first |
| Animations | Framer Motion | Scroll animations, page transitions |
| Video | YouTube embeds (lite-youtube-embed) | Lazy-loaded, no layout shift |
| Contact Form | Formspree (free tier) or EmailJS | Zero backend needed |
| Deployment | Vercel (free tier) | Zero-config Next.js hosting, global CDN |
| Domain | shian.io or shian.studio | Professional, memorable |
| Analytics | Vercel Analytics or Umami | Privacy-friendly, lightweight |

### Performance Targets
- Lighthouse Performance: > 95
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.0s
- Cumulative Layout Shift: < 0.05
- Total bundle size: < 200KB (first load JS)

### SEO
- Meta tags per Open Graph and Twitter Card standards
- Structured data (JSON-LD): Person + ProfessionalService schema
- Sitemap.xml auto-generated by Next.js
- Robots.txt allowing all crawlers

### Responsive Breakpoints
| Breakpoint | Layout |
|-----------|--------|
| < 640px (mobile) | Single column, stacked cards, hamburger nav |
| 640-1024px (tablet) | 2-column grids, compact pricing cards |
| > 1024px (desktop) | Full layout, 3-4 column grids, all animations |

---

## 6. Content Production Plan

### Phase 1: Website Launch (Week 1-2)
- Build and deploy the portfolio site
- The site itself becomes Portfolio Item #1

### Phase 2: Speed Build Videos (Week 2-4)
Produce 3 initial videos:
1. **"Building a SaaS Dashboard in 4 Hours"** — Record screen, compress to 8-12 min video
2. **"WeChat Mini Program: E-Commerce MVP"** — Full walkthrough demo
3. **"This Portfolio Site: Built with AI in 3 Days"** — Meta-project, behind-the-scenes

Publish to YouTube, cross-post clips to X.

### Phase 3: Content Marketing Engine (Ongoing)
- **Weekly:** GitHub trending repo analysis video (short form, 2-5 min)
- **Bi-weekly:** AI tool comparison / tutorial video (8-15 min)
- **Monthly:** Case study or project deep-dive
- All content links back to SHIAN Studio site

### Phase 4: Social Media Distribution
- **X (Twitter):** Daily tweets with dev tips, thread versions of videos, engagement with indie hacker / vibe coding community
- **YouTube:** Weekly upload, SEO-optimized titles and descriptions
- **GitHub:** Maintain active profile with pinned projects
- **Future:** LinkedIn, Dev.to, Hashnode for article cross-posting

---

## 7. Go-to-Market Strategy

### Channel Priority
1. **X (Twitter)** — Fastest for building audience in dev/indie hacker community
2. **YouTube** — Long-form content builds deepest trust
3. **Upwork / Fiverr** — Active bidding on projects, profile links to site
4. **GitHub** — Technical credibility, open source as portfolio

### Client Acquisition Funnel
```
Social Media Content → Curiosity Click → Portfolio Site
  → Watch Speed Build Video → Trust Established
    → View Pricing Cards → Qualified Lead
      → Submit Contact Form → Close Deal
```

### Pricing Positioning
- Market positioning: **Mid-tier pricing, premium delivery**
- Compete on: speed (AI-powered 3-5x faster), quality (CS background + code review), value (full-stack = one person does it all)
- Do NOT compete on: lowest price (race to bottom), or enterprise-level complexity

### Initial Client Strategy
1. First 2-3 clients at 50% discount to get testimonials
2. After 3 testimonials, raise to full pricing
3. After 10 completed projects, consider raising Enterprise tier to $7,999+

---

## 8. Future Expansion (Out of Scope for V1)

These are explicitly **not** in the current build but noted for future iteration:
- Blog section (markdown-based articles)
- Client testimonial carousel (after first reviews)
- Chinese language full translation toggle
- Interactive project calculator (quote estimator)
- Newsletter signup + email drip sequence
- Case study detail pages
- Dark/light theme toggle
