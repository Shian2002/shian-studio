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
    badge: "Product delivery for founders & teams",
    titlePrefix: "Turn your idea into",
    titleSuffix: "a launched product.",
    words: [
      "a product people can use.",
      "a website that converts.",
      "an internal system your team can run.",
      "an online service ready to sell.",
    ],
    description:
      "I help teams deliver real products online: websites, landing pages, MVPs, SaaS systems, dashboards, mini programs, and business automation tools. From requirements to deployment, I handle design, development, and iteration.",
    viewWork: "Send Project Inquiry",
    seePricing: "View Portfolio",
    trustPoints: ["Clear Scope", "One Owner End-to-End", "Demo-Ready Delivery", "Post-Launch Iteration"],
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
        name: "Operations Dashboard",
        subtitle: "For businesses that need internal tools",
        description: "Custom dashboards, admin panels, and internal tools",
        features: [
          "Custom dashboard development",
          "Real-time data visualization",
          "Behavior and trend analytics",
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
    title: "What I Can Build",
    description:
      "From idea to shipped project: web platforms, SaaS systems, dashboards, mini programs, and business tools that can be used immediately.",
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
      { title: "SaaS Analytics Dashboard", description: "A real-time business dashboard with role-based access and exportable reports for operations teams." },
      { title: "Customer Service Integration", description: "A customer support flow with FAQ search, handoff rules, and multi-language response handling." },
      { title: "Creative Studio Workflow", description: "A content workflow for image assets, editing, and style management for small teams." },
      { title: "Online Education Platform", description: "A course platform with structured learning paths, certification flow, and progress tracking." },
      { title: "E-Commerce Admin Panel", description: "A full back-office system with product lifecycle, order flows, and sales overview." },
      { title: "Project Management Workspace", description: "Team planning with boards, timelines, delivery tracking, and status reporting." },
      { title: "IoT Monitoring Dashboard", description: "Live monitoring for device data, alert rules, trend charts, and status dashboards." },
      { title: "Property Listing Platform", description: "A property and lead management system with map search, filters, and agent workflows." },
      { title: "Fast MVP Challenge", description: "A rapid MVP build that turns raw requirements into a verifiable product." },
      { title: "WeChat E-Commerce Mini Program", description: "A complete commerce mini program with browsing, cart, checkout, and payment flow." },
      { title: "Cross-Platform App", description: "One codebase for mini program, H5, iOS, and Android with shared product logic." },
      { title: "High-Conversion Landing Page", description: "A marketing page designed for lead conversion with SEO structure and experimentation support." },
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
      "A lean delivery process — from first text to production deployment.",
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
        text: "From wireframe to working mini program in 10 days. The workflow and execution pace made the difference.",
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
    bio: "CS graduate with IoT specialization. I build MVPs and SaaS products for startups and SMBs worldwide, from idea to production in weeks, not months.",
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
      "Quality-first full-stack delivery",
    ],
  },
  faq: {
    badge: "FAQ",
    title: "Common Questions",
    description: "Quick answers to things clients usually ask before we start.",
    footer: "I typically respond within a few hours.",
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
          "Landing pages: 3 days. Full websites or mini programs: 7 days. Enterprise SaaS products: 2-4 weeks. We keep this fast by using reusable components and short iteration cycles.",
      },
      {
        question: "How do you keep delivery fast and safe?",
        answer:
          "I use clear delivery milestones, reusable templates, and mandatory release checklists. The result is faster progress with less rework and stable execution.",
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
    title2: "Product",
    description:
      "Tell me what you want to build, your target users, and timeline. I'll turn that into a clear implementation plan, milestone list, and estimate.",
    emailMe: "Email Me",
    whatsapp: "Email",
    email: "x2938784260u@gmail.com",
    wechat: "Scan to add on WeChat",
    replyTime: "Usually replies within 24h",
  },
  footer: {
    tagline: "From idea to launch-ready web products for startups and SMBs.",
    navigation: "Navigation",
    contactHeading: "Get in Touch",
    remoteFirst: "Remote-first · Worldwide",
    builtWith: "Built with Next.js · Tailwind CSS · Delivery Workflow",
  },
  process: {
    steps: [
      { title: "Text Consult", description: "Share your needs" },
      { title: "Design & Plan", description: "Wireframes + timeline" },
      { title: "Build", description: "Implementation and integration" },
      { title: "Launch & Support", description: "Deploy + iterate" },
    ],
  },
  trust: {
    signals: [
      { label: "Degree Holder" },
      { label: "Stack Dev" },
      { label: "Product Delivery" },
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
          "Fast first response",
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
          "Fast first response",
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
          "Priority draft review",
          "Weekly async check-ins",
        ],
        cta: "Get started",
      },
    ],
    popular: "Most popular",
    trust1Title: "Bounded workload",
    trust1Desc: "Monthly message limits prevent overload. You control your time.",
    trust2Title: "Structured triage",
    trust2Desc: "Common questions are filtered and grouped before each response for faster progress.",
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
          { q: "What's your development process?", a: "Four steps: (1) Text consult to understand your needs, (2) Design & planning — wireframes + timeline, (3) Build & integration with quality review points, (4) Launch & support — deploy + iterate. The entire process is text-based, no meetings required." },
          { q: "Do you work with clients in different time zones?", a: "Absolutely. Our entire workflow is async and text-based, specifically designed for cross-timezone collaboration. You'll never need to wake up early for a meeting — just send a message and get a reply within 24h." },
          { q: "How do I communicate with you during the project?", a: "Slack, WeChat, or email — your choice. All communication is text-based. No video calls, no phone calls. This keeps everything documented and efficient. You can expect responses within 24h (12h for active sprint phases)." },
        ],
      },
      {
        title: "Tech & Capabilities",
        items: [
          { q: "What tech stack do you use?", a: "Next.js + TypeScript + Tailwind CSS for frontend. Node.js / Python for backend. PostgreSQL / Supabase / MongoDB for databases. Vercel / Netlify for deployment. We also build integrations with WeChat Mini Programs, AI services, and Stripe payments." },
          { q: "Do you use AI tools in development?", a: "I use productivity tooling where it helps, but every project is planned, reviewed, and finalized through a human-led process focused on security and maintainability." },
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
