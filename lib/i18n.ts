export type Locale = "en" | "zh" | "ja" | "ko";

export const LOCALES: { code: Locale; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

const en: Record<string, unknown> = {
  nav: {
    hero: "Hero",
    services: "Services & Pricing",
    portfolio: "Portfolio",
    blog: "Blog",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
    advisor: "Tech Advisor",
    getQuote: "Send Inquiry",
  },
  hero: {
    badge: "Available for MVP & SaaS projects · Q2 2026",
    titlePrefix: "Launch Your MVP or SaaS",
    titleSuffix: "Product in Weeks, Not Months",
    words: ["ship faster.", "deliver quality.", "scale reliably.", "iterate smarter."],
    description:
      "SHIAN Studio delivers production-ready MVPs, SaaS products, and dashboards for startups and SMBs — powered by AI-assisted full-stack workflows. From idea to launch, in as fast as 2 weeks.",
    viewWork: "Send Project Inquiry",
    seePricing: "View Portfolio",
    trustPoints: ["MVP in 2-4 Weeks", "Full-Stack Delivery", "AI-Accelerated Workflow", "Post-Launch Support"],
    techList: ["Next.js", "React", "Node.js", "Python", "Mini Programs", "SaaS"],
  },
  services: {
    badge: "Services",
    title: "How I Can Help",
    description: "Focused MVP and SaaS delivery for startups and SMBs. Transparent pricing, no hidden fees.",
    footer: "All prices are starting rates. Final quote based on project scope. Send a project inquiry to discuss.",
  },
  pricing: {
    footer: "All prices are starting rates. Final quote based on project scope.",
    cta: "Get Started",
    ctaCustom: "Contact Me",
    custom: "Custom",
    flagship: "Flagship",
    perProject: "per project",
    customQuote: "custom quote",
    perMonth: "/mo",
    tiers: [
      {
        name: "MVP Sprint",
        subtitle: "For startups validating their product",
        description: "Validate your idea with a production-ready MVP",
        features: [
          "Full-stack MVP development",
          "Responsive web or mini program",
          "User authentication & database",
          "API integration & deployment",
          "2-4 week delivery",
          "Post-launch support",
        ],
        bestFor: "Startups & entrepreneurs with a clear idea",
      },
      {
        name: "SaaS Build",
        subtitle: "For teams building a complete product",
        description: "Full SaaS product with billing, auth, and dashboards",
        features: [
          "Complete SaaS application",
          "Multi-tenant architecture",
          "Payment integration (Stripe/Paddle)",
          "Admin dashboard & analytics",
          "Role-based access control",
          "4-8 week delivery",
          "30-day post-launch support",
        ],
        bestFor: "SaaS founders & growing businesses",
      },
      {
        name: "AI Dashboard",
        subtitle: "For businesses that need internal tools",
        description: "Custom dashboards, admin panels, and internal tools",
        features: [
          "Custom dashboard development",
          "Real-time data visualization",
          "AI-powered analytics",
          "IoT monitoring & alerts",
          "Role management & audit logs",
          "2-4 week delivery",
        ],
        bestFor: "Operations teams & SMBs",
      },
      {
        name: "Landing Page",
        subtitle: "Fast entry point for your product",
        description: "High-conversion landing page with SEO optimization",
        features: [
          "Responsive single-page design",
          "SEO optimization (Lighthouse 95+)",
          "Contact form & analytics",
          "Mobile-first & fast loading",
          "3-day delivery",
        ],
        bestFor: "Early-stage validation & marketing",
      },
    ],
  },
  portfolio: {
    badge: "Portfolio",
    title: "Work Portfolio",
    description:
      "Explore 12 interactive demos across SaaS, AI, dashboards, mini programs, education, IoT, real estate, and landing pages.",
    filters: {
      all: "All Projects",
      web: "Web Apps",
      mini: "Mini Programs",
      showcase: "Showcase",
    },
    empty: "No projects in this category yet — more content coming soon.",
    cta: "View full portfolio",
    demo: "Demo",
    viewDemo: "Open Demo",
    viewDetails: "Details",
    scanWhatsApp: "Contact by email",
    demoProject: "Demo Project",
    moreProjects: "Demo Projects",
    items: [
      { title: "AI SaaS Analytics Dashboard", description: "Real-time data visualization with role-based access control and AI-powered insights." },
      { title: "AI Chatbot Integration", description: "Intelligent customer service chatbot with knowledge base, streaming responses, and multi-language support." },
      { title: "AI Image Generation Studio", description: "Prompt-based image generation, editing workflow, and style presets for creative teams." },
      { title: "Online Education Platform", description: "Course marketplace with video learning, structured learning paths, and certification system. Competes with Udemy and Coursera." },
      { title: "E-Commerce Admin Panel", description: "Complete back-office management with product CRUD, order processing, and sales analytics." },
      { title: "Project Management Workspace", description: "Kanban tasks, team planning, timelines, and delivery tracking in one workspace." },
      { title: "IoT Monitoring Dashboard", description: "Real-time IoT device monitoring with live sensor data, alerts, and trend analysis." },
      { title: "Real Estate Property Platform", description: "Full-featured property listing platform with interactive map, advanced search, and agent management. Built for modern real estate agencies." },
      { title: "AI Speed Coding Challenge", description: "From zero to deployed in record time — a time-lapse of AI-powered full-stack development." },
      { title: "WeChat E-Commerce Mini Program", description: "Full shopping experience with product browsing, cart, checkout, and WeChat Pay." },
      { title: "Cross-Platform App (UniApp)", description: "One codebase running on WeChat Mini Program, H5, iOS, and Android." },
      { title: "High-Conversion Landing Page", description: "SEO-optimized template with Lighthouse 95+ scores, A/B testing support." },
    ],
  },
  caseStudies: {
    badge: "Case Studies",
    title: "Proven Results",
    description: "Real products delivered to real clients. Each case study shows the problem, the build, and the results.",
    viewDetails: "View Details →",
    viewDemo: "Live Demo",
    backToList: "← Back to Case Studies",
    client: "Client Background",
    challenge: "The Challenge",
    solution: "The Solution",
    results: "Results",
    testimonial: "Client Testimonial",
    readyCta: "Want something similar? Send a project inquiry",
    prevProject: "Previous Project",
    nextProject: "Next Project",
    caseStudyComingSoon: "Full case study coming soon",
  },
  servicePages: {
    badge: "Services",
    title: "How I Can Help",
    description: "Focused MVP and SaaS delivery for startups and SMBs. Transparent pricing, no hidden fees.",
    learnMore: "Learn More →",
    bookCall: "Send Inquiry",
    notSure: "Not sure which service fits? Let's discuss.",
    backToList: "← Back to Services",
    whoIsFor: "Who It's For",
    included: "What's Included",
    notIncluded: "What's Not Included",
    workflow: "How It Works",
    faq: "FAQ",
    readyCta: "Ready to start? Send a project inquiry",
    prevService: "Previous Service",
    nextService: "Next Service",
  },
  techStack: {
    badge: "Toolbox",
    title: "Tech Stack",
    description:
      "The tools and technologies I use to deliver production-grade software at speed.",
    processBadge: "Workflow",
    processTitle: "How I Work",
    processDescription:
      "A lean, AI-powered process — from first call to production deployment.",
    stats: ["Faster delivery", "Response time", "Core technologies", "Post-launch support"],
  },
  testimonials: {
    badge: "Testimonials",
    title: "Client Feedback",
    description:
      "Hear what clients and collaborators have to say about working together.",
    items: [
      {
        text: "Shian delivered our MVP in under 2 weeks — the speed was unreal. The codebase was clean, well-documented, and easy to hand off to our internal team.",
        name: "Sarah Chen",
        role: "CTO, TechStart",
      },
      {
        text: "We needed a complex SaaS dashboard and Shian nailed it. Great communication, fast iterations, and genuinely cared about the end-user experience.",
        name: "Marcus Rivera",
        role: "Founder, SaaSify",
      },
      {
        text: "From wireframe to working mini program in 10 days. The AI-powered workflow really does make a difference — highly recommend for anyone who needs to move fast.",
        name: "Yuki Tanaka",
        role: "Product Lead, QuickCart",
      },
    ],
  },
  about: {
    badge: "About",
    title: "Who's Building This?",
    description:
      "A full-stack engineer with a bias for shipping and an obsession with quality.",
    bioTitle: "Bio",
    bio: "CS graduate with IoT specialization. I build MVPs and SaaS products for startups and SMBs worldwide. AI-powered full-stack delivery — from idea to production in weeks, not months.",
    competencies: "Core Competencies",
    connect: "Let's Connect",
    preferEmail: "Prefer email? x2938784260u@gmail.com",
    accepting:
      "Currently accepting 2–3 freelance projects per quarter to maintain quality and response time.",
    statFullStack: "Full",
    statAccelerated: "Faster Delivery",
    skills: [
      "Frontend (React / Next.js)",
      "Backend (Node.js / Python)",
      "Mini Programs (WeChat / UniApp)",
      "DevOps & Deployment",
      "AI-Powered Coding Workflow",
    ],
  },
  faq: {
    badge: "FAQ",
    title: "Common Questions",
    description: "Quick answers to things clients usually ask before we start.",
    footer: "— I typically respond within a few hours.",
    stillQuestions: "Still have questions?",
    reachOut: "Reach out directly",
    items: [
      {
        question: "What types of projects do you handle?",
        answer:
          "Full-stack web development, mini program development (WeChat/UniApp), SaaS product development, and dashboard/admin panel creation. From landing pages to complex enterprise systems.",
      },
      {
        question: "How fast can you deliver?",
        answer:
          "Landing pages: 3 days. Full websites or mini programs: 7 days. Enterprise SaaS products: 2-4 weeks. AI-powered workflows enable 3-5x faster delivery than traditional development.",
      },
      {
        question: "What is AI-powered development?",
        answer:
          "We use cutting-edge AI coding tools like Claude Code, Codex, and Cursor to accelerate development without sacrificing quality. This means faster delivery, fewer bugs, and more competitive pricing.",
      },
      {
        question: "Do you offer post-launch support?",
        answer:
          "Yes. Enterprise plans include 30-day post-launch support. We also offer ongoing maintenance packages for all plan tiers. Priority response for critical issues.",
      },
      {
        question: "What if I'm not satisfied with the result?",
        answer:
          "Professional and Enterprise plans include revision rounds. I work closely with you throughout the process to ensure the final product matches your vision. If there's a gap, we fix it — no extra charge within the agreed scope.",
      },
      {
        question: "Can you work with my existing tech stack?",
        answer:
          "Absolutely. I'm flexible with technology choices and can integrate with existing systems. I'll recommend the best approach based on your project requirements, not my preferences.",
      },
    ],
  },
  contact: {
    title1: "Let's Build Your",
    title2: "Product Together",
    description:
      "Whether you need an MVP, a SaaS dashboard, or a technical partner — send an inquiry and let's discuss via text.",
    emailMe: "Email Me",
    whatsapp: "Email",
    email: "x2938784260u@gmail.com",
    wechat: "Scan to add on WeChat",
    replyTime: "Usually replies within 24h",
  },
  footer: {
    tagline: "MVP & SaaS delivery for startups and SMBs.",
    navigation: "Navigation",
    contactHeading: "Get in Touch",
    remoteFirst: "Remote-first · Worldwide",
    builtWith: "Built with Next.js · Tailwind CSS · AI-First Workflow",
  },
  process: {
    steps: [
      { title: "Text Consult", description: "Share your needs" },
      { title: "Design & Plan", description: "Wireframes + timeline" },
      { title: "AI-Powered Build", description: "Fast, quality code" },
      { title: "Launch & Support", description: "Deploy + iterate" },
    ],
  },
  trust: {
    signals: [
      { label: "Degree Holder" },
      { label: "Stack Dev" },
      { label: "Native Workflow" },
      { label: "Faster Delivery" },
    ],
  },
  form: {
    name: "Name",
    email: "Work Email",
    company: "Company / Website",
    projectType: "What are you building?",
    budget: "Budget Range",
    timeline: "Desired Timeline",
    goal: "Main Goal",
    message: "Additional Details",
    submit: "Send Project Inquiry",
    sending: "Sending...",
    success: "Message sent! I usually reply within 24 hours.",
    successNext: "Want faster? Email me directly at 2938784260@qq.com.",
    whatsNextTitle: "What happens next?",
    whatsNext1Title: "Response within 24h",
    whatsNext1Desc: "I review every inquiry personally",
    whatsNext2Title: "Text-based consult",
    whatsNext2Desc: "We discuss your goals via text",
    whatsNext3Title: "Scope & quote in 48h",
    whatsNext3Desc: "Clear proposal, no surprises",
    error: "Submission failed temporarily. Please try again in a moment.",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    companyPlaceholder: "acme.com or leave blank",
    messagePlaceholder: "Tell me about your project goals, timeline, and anything else...",
    selectType: "Select project type",
    selectBudget: "Select budget range",
    selectTimeline: "Select timeline",
    projectTypes: ["MVP Development", "SaaS Product", "Dashboard / Admin Panel", "Landing Page", "Mini Program", "AI Integration", "Other"],
    budgetRanges: ["Under $2,000", "$2,000 - $5,000", "$5,000 - $10,000", "$10,000+", "Not Sure Yet"],
    timelines: ["ASAP", "Within 2 weeks", "Within 1 month", "Within 2 months", "Flexible"],
  },
  common: {
    home: "Home",
    scrollToTop: "Back to top",
    available: "Available for hire",
    availableText: "Available for MVP & SaaS projects · Q2 2026",
    switchTheme: "Toggle theme",
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
    step: "STEP",
    allRightsReserved: "All rights reserved.",
  },
  blog: {
    title: "Blog",
    description: "Practical insights on building MVPs, SaaS products, and AI dashboards. Real numbers, real timelines, real advice.",
    readArticle: "Read article",
    relatedServices: "Related Services",
    relatedPortfolio: "Related Portfolio",
    readyTitle: "Ready to build your product?",
    readyDesc: "Send a project inquiry and get a response within 24 hours.",
    sendInquiry: "Send Project Inquiry",
  },
  advisor: {
    badge: "Monthly subscription",
    title: "Tech Advisor Subscription",
    subtitle: "Not ready for a full project? Get ongoing technical guidance via text. No video calls, no phone — just async chat designed for global collaboration across time zones.",
    tiers: [
      {
        name: "Async Advisor",
        description: "Occasional technical guidance on your schedule",
        priceNote: "/mo",
        cnPrice: "CN: \u00a51,999/mo",
        timeCommit: "~1.5h/mo of your time",
        hourlyRate: "effective rate: $193/h",
        features: [
          "10 messages / month",
          "48h response window",
          "Text-only async (Slack / WeChat / Email)",
          "1 code review session / month",
          "AI-powered first response",
          "Full FAQ knowledge base access",
        ],
        cta: "Get started",
      },
      {
        name: "Standard Advisor",
        description: "Responsive support for active development",
        priceNote: "/mo",
        cnPrice: "CN: \u00a54,999/mo",
        timeCommit: "~4-5h/mo of your time",
        hourlyRate: "effective rate: $138/h",
        seatsLeft: "",
        features: [
          "30 messages / month",
          "24h response window",
          "Text-only async (Slack / WeChat / Email)",
          "Unlimited code reviews",
          "Sprint planning feedback",
          "Architecture template library",
          "AI-powered first response",
          "Monthly tech audit report",
        ],
        cta: "Get started",
      },
      {
        name: "Embedded Advisor",
        description: "Deep technical partnership for growing teams",
        priceNote: "/mo",
        cnPrice: "CN: \u00a510,999/mo",
        timeCommit: "~8-10h/mo of your time",
        hourlyRate: "effective rate: $149/h",
        seatsLeft: "Only 3 seats available",
        features: [
          "60 messages / month",
          "Same-day response",
          "Text-only async (dedicated channel)",
          "Tech decision deep-dive",
          "Hiring & vendor evaluation",
          "Roadmap co-creation",
          "Priority AI-assisted drafting",
          "Weekly async check-ins",
        ],
        cta: "Get started",
      },
    ],
    popular: "Most popular",
    trust1Title: "Bounded workload",
    trust1Desc: "Monthly message limits prevent overload. You control your time.",
    trust2Title: "AI-powered triage",
    trust2Desc: "An AI assistant handles common questions before they reach you.",
    trust3Title: "100% text-based",
    trust3Desc: "No video calls, no phone. Async chat only. Cancel anytime.",
  },
  advisorPreview: {
    title: "Need a Tech Advisor?",
    subtitle: "Subscribe monthly and get async text-based technical guidance. No video calls, no phone — just expert answers when you need them.",
    viewDetails: "View details",
    seeAll: "See all plans & details",
  },
  faqExtended: {
    title: "Frequently asked questions",
    subtitle: "Everything you need to know about working with SHIAN Studio. Can't find the answer? Send a message via the contact form.",
    badge: "FAQ",
    categories: [
      {
        title: "Pricing & Payment",
        items: [
          { q: "How much does a typical project cost?", a: "Project pricing depends on scope. MVP Sprints start at $2,000, full SaaS builds range $5,000-$10,000+, and mini programs start at $1,500. After a quick text consult, you'll get an exact quote — no surprises." },
          { q: "Do you offer monthly subscriptions?", a: "Yes. Our Tech Advisor subscription starts at $290/month for async text-based technical guidance. No video calls, no phone — just Slack/WeChat/email. Check out the /advisor page for details." },
          { q: "What payment methods do you accept?", a: "International clients: Stripe, PayPal, or wire transfer. CN clients: WeChat Pay, Alipay, or bank transfer. For projects, 50% upfront and 50% on delivery is standard. Subscriptions are billed monthly." },
          { q: "Can I get a refund if I'm not satisfied?", a: "For project work: if you're not happy with the initial design/wireframe phase, you get a full refund of your deposit. For subscriptions: cancel anytime, no questions asked — you just won't be billed for the next cycle." },
        ],
      },
      {
        title: "Process & Timeline",
        items: [
          { q: "How long does a typical MVP take?", a: "2-4 weeks for most MVPs. Simple landing pages can be done in 3-5 days. Full SaaS dashboards with auth, payments, and dashboards typically take 3-4 weeks. The exact timeline is confirmed after our initial text discussion." },
          { q: "What's your development process?", a: "Four steps: (1) Text consult to understand your needs, (2) Design & planning — wireframes + timeline, (3) AI-powered build — fast, quality code using Codex/GPT-5.5, (4) Launch & support — deploy + iterate. The entire process is text-based, no meetings required." },
          { q: "Do you work with clients in different time zones?", a: "Absolutely. Our entire workflow is async and text-based, specifically designed for cross-timezone collaboration. You'll never need to wake up early for a meeting — just send a message and get a reply within 24h." },
          { q: "How do I communicate with you during the project?", a: "Slack, WeChat, or email — your choice. All communication is text-based. No video calls, no phone calls. This keeps everything documented and efficient. You can expect responses within 24h (12h for active sprint phases)." },
        ],
      },
      {
        title: "Tech & Capabilities",
        items: [
          { q: "What tech stack do you use?", a: "Next.js + TypeScript + Tailwind CSS for frontend. Node.js / Python for backend. PostgreSQL / Supabase / MongoDB for databases. Vercel / Netlify for deployment. We also work with WeChat Mini Programs, AI integrations (OpenAI, Claude), and Stripe payments." },
          { q: "Do you use AI tools in development?", a: "Yes — this is a core advantage. We use Codex/GPT-5.5 to accelerate development without sacrificing quality. This means faster delivery, lower costs, and cleaner code. The AI assists; all architectural decisions are made by an experienced developer." },
          { q: "Can you work with my existing codebase?", a: "Yes. We can review your codebase, add features, fix bugs, or migrate to a new architecture. For subscription clients, code reviews are included (1/month for Tier 1, unlimited for Tier 2+)." },
          { q: "Do you provide ongoing maintenance after launch?", a: "Yes. Post-launch support is included for 30 days on all projects (bug fixes, small tweaks). For long-term support, the Tech Advisor subscription covers ongoing maintenance, updates, and new features." },
        ],
      },
      {
        title: "Getting Started",
        items: [
          { q: "How do I start a project?", a: "Simple: (1) Fill out the contact form on the Contact page, or (2) Add us on WeChat (scan the QR code). Share your idea, timeline, and budget. You'll get a response within 24h with next steps — no sales calls." },
          { q: "Do you sign NDAs?", a: "Yes. If you need an NDA before sharing project details, just ask. We're happy to sign before the initial discussion. Your ideas and data are always kept confidential." },
          { q: "What information should I prepare before contacting?", a: "Helpful but not required: a brief description of what you want to build, your target users, your timeline, and your budget range. If you have wireframes, mockups, or competitor links, even better. If you have nothing — that's fine too, we'll figure it out together." },
          { q: "Can you help with just a small task or bug fix?", a: "Yes. For one-off tasks (bug fix, small feature, deployment help), the Tech Advisor Tier 1 ($290/month) is the most cost-effective option. You get up to 10 messages/month and a code review session." },
        ],
      },
    ],
    stillQuestions: "Still have questions?",
    getInTouch: "Get in touch",
  },
};

// Only en is bundled by default; other locales are loaded on demand
export const translations: Record<Locale, Record<string, unknown>> = {
  en,
  zh: en, // placeholder, replaced on demand
  ja: en,
  ko: en,
};

const loadedLocales = new Set<Locale>(["en"]);

export async function loadLocale(locale: Locale): Promise<void> {
  if (loadedLocales.has(locale)) return;
  let data: Record<string, unknown>;
  switch (locale) {
    case "zh":
      data = (await import("./i18n/zh")).default;
      break;
    case "ja":
      data = (await import("./i18n/ja")).default;
      break;
    case "ko":
      data = (await import("./i18n/ko")).default;
      break;
    default:
      return;
  }
  translations[locale] = data;
  loadedLocales.add(locale);
}
