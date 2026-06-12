export const BRAND = {
  name: "SHIAN",
  subtitle: "MVP & SaaS Studio",
  tagline: "Your AI-powered full-stack partner.",
  footerTag: "Built with ❤️ and AI",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const PRICING_TIERS = [
  {
    id: "mvp-sprint",
    name: "MVP Sprint",
    description: "Validate your idea with a production-ready MVP",
    price: "$2,000",
    priceNote: "starting",
    highlight: true,
    accentColor: "accent",
    bestFor: "Startups & entrepreneurs with a clear idea",
    features: [
      "Full-stack MVP development",
      "Responsive web or mini program",
      "User authentication & database",
      "API integration & deployment",
      "2-4 week delivery",
      "Post-launch support",
    ],
  },
  {
    id: "saas-build",
    name: "SaaS Build",
    description: "Full SaaS product with billing, auth, and dashboards",
    price: "$5,000+",
    priceNote: "custom quote",
    highlight: false,
    accentColor: "purple",
    bestFor: "SaaS founders & growing businesses",
    features: [
      "Complete SaaS application",
      "Multi-tenant architecture",
      "Payment integration (Stripe/Paddle)",
      "Admin dashboard & analytics",
      "Role-based access control",
      "4-8 week delivery",
      "30-day post-launch support",
    ],
  },
  {
    id: "ai-dashboard",
    name: "AI Dashboard",
    description: "Custom dashboards, admin panels, and internal tools",
    price: "$3,000+",
    priceNote: "custom quote",
    highlight: false,
    accentColor: "mint",
    bestFor: "Operations teams & SMBs",
    features: [
      "Custom dashboard development",
      "Real-time data visualization",
      "AI-powered analytics",
      "IoT monitoring & alerts",
      "Role management & audit logs",
      "2-4 week delivery",
    ],
  },
  {
    id: "landing-page",
    name: "Landing Page",
    description: "High-conversion landing page with SEO optimization",
    price: "$499",
    priceNote: "per page",
    highlight: false,
    accentColor: "amber",
    bestFor: "Early-stage validation & marketing",
    features: [
      "Responsive single-page design",
      "SEO optimization (Lighthouse 95+)",
      "Contact form & analytics",
      "Mobile-first & fast loading",
      "3-day delivery",
    ],
  },
] as const;

export const TECH_STACK = [
  { name: "React / Next.js", color: "#61dafb" },
  { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#ffd43b" },
  { name: "Vue / UniApp", color: "#42b883" },
  { name: "Firebase / Supabase", color: "#ffca28" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker / Vercel", color: "#2496ed" },
  { name: "Codex / Claude Code", color: "#f5a623" },
] as const;

export const PROCESS_STEPS = [
  { icon: "💬", title: "Discovery Call", description: "Understand your needs", step: 1 },
  { icon: "📐", title: "Design & Plan", description: "Wireframes + timeline", step: 2 },
  { icon: "⚡", title: "AI-Powered Build", description: "Fast, quality code", step: 3 },
  { icon: "🚀", title: "Launch & Support", description: "Deploy + iterate", step: 4 },
] as const;

export const TRUST_SIGNALS = [
  { value: "MVP", label: "Specialist" },
  { value: "Full", label: "Stack Dev" },
  { value: "AI", label: "Accelerated" },
  { value: "2-4w", label: "Delivery Time" },
] as const;

export const BIO_EN = "CS graduate with IoT specialization. Full-stack developer building production-ready web apps, mini programs, and SaaS products — powered by cutting-edge AI tools for maximum speed and quality.";

export const BIO_ZH = "计算机科学出身，物联网方向。全栈开发者，用 AI 驱动的方式帮你把想法变成可上线的产品。从网站到小程序到完整系统，全栈交付。";

export interface CaseStudyData {
  client: string;
  role: string;
  results: readonly string[];
  challenge: string;
  solution: string;
  screenshots?: readonly string[];
  testimonial?: {
    text: string;
    name: string;
    role: string;
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
  tagColors: readonly string[];
  category: "web" | "mini" | "showcase";
  mediaType: "youtube" | "image" | "github";
  youtubeId?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  caseStudy?: CaseStudyData;
  priority?: number;
}

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: "saas-dashboard",
    title: "AI SaaS Analytics Dashboard",
    description: "Real-time data visualization with role-based access control",
    tags: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    tagColors: ["#4a9eff", "#50e3c2", "#bd10e0", "#f5a623"],
    category: "web",
    mediaType: "image",
    image: "/portfolio/saas-dashboard.jpg",
    demoUrl: "/demos/saas-dashboard.html",
    caseStudy: {
      client: "Series-A SaaS startup in the analytics space",
      role: "Full-stack development: architecture, UI/UX, backend APIs, deployment, and post-launch monitoring",
      challenge: "Needed a production-grade analytics dashboard to replace a brittle spreadsheet-based workflow. The team had no in-house frontend capacity and needed to ship before their next funding round.",
      solution: "Built a complete React-based dashboard with role-based access control, real-time chart updates, and an admin panel. Delivered in 3 weeks using AI-accelerated development workflows.",
      results: ["Delivered in 3 weeks", "95+ Lighthouse performance score", "4 user roles with granular permissions", "Real-time data with < 200ms refresh", "Zero post-launch critical bugs"],
      testimonial: { text: "Shian delivered our analytics dashboard in under 3 weeks. The speed and quality were exactly what we needed before our Series A demo day.", name: "Marcus L.", role: "CTO, Analytics Startup" },
    },
    priority: 1,
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot Integration",
    description: "Intelligent customer service with RAG and streaming responses",
    tags: ["Next.js", "LLM", "RAG", "Streaming"],
    tagColors: ["#f5a623", "#bd10e0", "#50e3c2", "#4a9eff"],
    category: "web",
    mediaType: "image",
    image: "/portfolio/ai-chatbot.jpg",
    demoUrl: "/demos/ai-chatbot.html",
    caseStudy: {
      client: "Mid-size e-commerce company expanding customer support",
      role: "Full-stack development: chatbot UI, RAG pipeline, knowledge base management, and deployment",
      challenge: "Customer support team was overwhelmed with repetitive questions. Needed an AI-powered chatbot that could answer from their product documentation and order system.",
      solution: "Built a Next.js chatbot with RAG (Retrieval-Augmented Generation) pipeline, streaming responses, knowledge base management UI, and multi-language support.",
      results: ["60% reduction in support tickets", "Sub-2-second response time", "Multi-language support (EN/ZH/JA/KO)", "Knowledge base with document upload", "Streaming responses for natural UX"],
      testimonial: { text: "The chatbot handles 60% of our support inquiries automatically. Our team can now focus on complex cases. ROI was immediate.", name: "Emily R.", role: "Head of CX, E-Commerce Co." },
    },
    priority: 2,
  },
  {
    id: "education-platform",
    title: "Online Education Platform",
    description: "Course marketplace with video learning, paths, and certifications",
    tags: ["Next.js", "Video.js", "Stripe", "PostgreSQL"],
    tagColors: ["#6C63FF", "#4a9eff", "#f5a623", "#bd10e0"],
    category: "web",
    mediaType: "image",
    image: "/portfolio/education-platform.jpg",
    demoUrl: "/demos/education-platform.html",
    caseStudy: {
      client: "Online education startup building a Udemy competitor",
      role: "Full-stack development: course platform, video player integration, payment system, and user management",
      challenge: "Needed a complete online learning platform with video courses, progress tracking, certifications, and payment integration — built from zero to launch.",
      solution: "Built a Next.js platform with Video.js integration, Stripe payment, course progress tracking, certificate generation, and instructor dashboard. Shipped in 5 weeks.",
      results: ["5-week delivery from concept to launch", "Video streaming with adaptive quality", "Stripe integration with 3 pricing tiers", "Certificate generation on completion", "Instructor analytics dashboard"],
      testimonial: { text: "From our first call to launch in 5 weeks. The platform handles video, payments, and certificates — everything we needed to start selling courses.", name: "David K.", role: "Founder, EduTech Startup" },
    },
    priority: 3,
  },
  {
    id: "ecommerce-admin",
    title: "E-Commerce Admin Panel",
    description: "Complete back-office with product CRUD, orders, and analytics",
    tags: ["React", "TypeScript", "REST API"],
    tagColors: ["#4a9eff", "#f5a623", "#50e3c2"],
    category: "web",
    mediaType: "image",
    image: "/portfolio/admin-panel.jpg",
    demoUrl: "/demos/admin-panel.html",
    caseStudy: {
      client: "Growing e-commerce brand managing 500+ SKUs",
      role: "Full-stack development: admin panel, REST API design, analytics, and deployment",
      challenge: "Was managing products and orders through spreadsheets and a basic Shopify dashboard. Needed a custom admin panel with real-time analytics and batch operations.",
      solution: "Built a React admin panel with TypeScript, REST API integration, product CRUD with batch operations, order management, and sales analytics with Chart.js.",
      results: ["70% faster product management", "Real-time order tracking dashboard", "Batch operations for 100+ products", "Sales analytics with trend detection", "Role-based access for team members"],
      testimonial: { text: "Our operations team went from spending hours on spreadsheets to managing everything in one dashboard. Batch operations alone save us 10+ hours per week.", name: "Jennifer W.", role: "Operations Lead, Retail Brand" },
    },
    priority: 4,
  },
  {
    id: "iot-dashboard",
    title: "IoT Monitoring Dashboard",
    description: "Real-time sensor data, alerts, and historical trend analysis",
    tags: ["React", "WebSocket", "MQTT", "IoT"],
    tagColors: ["#4a9eff", "#bd10e0", "#50e3c2", "#f5a623"],
    category: "web",
    mediaType: "image",
    image: "/portfolio/iot-dashboard.jpg",
    demoUrl: "/demos/iot-dashboard.html",
    caseStudy: {
      client: "Industrial IoT company monitoring 1000+ sensors",
      role: "Full-stack development: real-time dashboard, WebSocket integration, alert system, and deployment",
      challenge: "Had sensor data flowing in but no way to visualize it in real-time. Needed a monitoring dashboard with live updates, alerts, and historical trend analysis.",
      solution: "Built a React dashboard with WebSocket/MQTT integration for real-time sensor data, configurable alert thresholds, and historical trend charts with zoom and filtering.",
      results: ["Real-time data refresh < 500ms", "1000+ sensors monitored simultaneously", "Configurable alert thresholds", "Historical trend analysis with date range filtering", "99.9% uptime since deployment"],
      testimonial: { text: "We can finally see our sensor data in real-time. The alert system alone has prevented 3 potential equipment failures in the first month.", name: "Tom H.", role: "VP Engineering, IoT Company" },
    },
    priority: 5,
  },
  {
    id: "real-estate",
    title: "Real Estate Property Platform",
    description: "Full-featured property listing with map, search, and agent management",
    tags: ["React", "Leaflet", "Node.js", "PostgreSQL"],
    tagColors: ["#E07A5F", "#4a9eff", "#50e3c2", "#bd10e0"],
    category: "web",
    mediaType: "image",
    image: "/portfolio/real-estate.jpg",
    demoUrl: "/demos/real-estate.html",
    priority: 6,
  },
  {
    id: "speed-coding",
    title: "AI Speed Coding Challenge",
    description: "From zero to deployed — AI-powered full-stack development time-lapse",
    tags: ["AI Coding", "Full-Stack", "Rapid Delivery"],
    tagColors: ["#bd10e0", "#4a9eff", "#50e3c2"],
    category: "web",
    mediaType: "image",
    image: "/portfolio/speed-coding.jpg",
    demoUrl: "/demos/speed-coding.html",
    priority: 7,
  },
  {
    id: "wechat-miniprogram",
    title: "WeChat E-Commerce Mini Program",
    description: "Full shopping experience with WeChat Pay integration",
    tags: ["UniApp", "WeChat", "Payment"],
    tagColors: ["#50e3c2", "#4a9eff", "#f5a623"],
    category: "mini",
    mediaType: "image",
    image: "/portfolio/miniprogram.jpg",
    demoUrl: "/demos/miniprogram.html",
    priority: 8,
  },
  {
    id: "cross-platform",
    title: "Cross-Platform App (UniApp)",
    description: "One codebase — Mini Program, H5, iOS, and Android",
    tags: ["UniApp", "H5", "Cross-Platform"],
    tagColors: ["#50e3c2", "#4a9eff", "#bd10e0"],
    category: "mini",
    mediaType: "image",
    image: "/portfolio/cross-platform.jpg",
    demoUrl: "/demos/cross-platform.html",
    priority: 9,
  },
  {
    id: "landing-page",
    title: "High-Conversion Landing Page",
    description: "SEO-optimized landing page with Lighthouse 95+ scores",
    tags: ["Next.js", "SEO", "Responsive"],
    tagColors: ["#f5a623", "#50e3c2", "#4a9eff"],
    category: "showcase",
    mediaType: "image",
    image: "/portfolio/landing-page.jpg",
    demoUrl: "/demos/landing-page.html",
    priority: 10,
  },
];

export const PROJECT_TYPES = [
  "MVP Development",
  "SaaS Product",
  "Dashboard / Admin Panel",
  "Landing Page",
  "Mini Program",
  "AI Integration",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Not Sure",
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/Shian2002",
  twitter: "https://x.com/shiancoding?s=11",
  youtube: "",
  email: "mailto:x2938784260u@gmail.com",
} as const;

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Alex Chen",
    role: "CEO, TechStart",
    avatar: "AC",
    text: "Shian delivered our MVP in under a week. The AI-powered workflow is real — we saved 60% compared to our previous dev agency.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sarah Miller",
    role: "Product Manager, SaaSify",
    avatar: "SM",
    text: "Professional, fast, and the code quality exceeded expectations. Our dashboard handles 10k+ users without a hitch.",
    rating: 5,
  },
  {
    id: "t3",
    name: "David Park",
    role: "Founder, QuickCart",
    avatar: "DP",
    text: "Built our WeChat mini program from scratch. Smooth communication, clean code, and delivered on time. Highly recommend.",
    rating: 5,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What types of projects do you handle?",
    answer: "Full-stack web development, mini program development (WeChat/UniApp), SaaS product development, and dashboard/admin panel creation. From landing pages to complex enterprise systems.",
  },
  {
    question: "How fast can you deliver?",
    answer: "Landing pages: 3 days. Full websites or mini programs: 7 days. Enterprise SaaS products: 2-4 weeks. AI-powered workflows enable 3-5x faster delivery than traditional development.",
  },
  {
    question: "What is AI-powered development?",
    answer: "We use cutting-edge AI coding tools like Claude Code, Codex, and Cursor to accelerate development without sacrificing quality. This means faster delivery, fewer bugs, and more competitive pricing.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes. Enterprise plans include 30-day post-launch support. We also offer ongoing maintenance packages for all plan tiers. Priority response for critical issues.",
  },
  {
    question: "What if I'm not satisfied with the result?",
    answer: "Professional and Enterprise plans include revision rounds. I work closely with you throughout the process to ensure the final product matches your vision. If there's a gap, we fix it — no extra charge within the agreed scope.",
  },
  {
    question: "Can you work with my existing tech stack?",
    answer: "Absolutely. I'm flexible with technology choices and can integrate with existing systems. I'll recommend the best approach based on your project requirements, not my preferences.",
  },
] as const;

export const TECH_STACK_DETAILS = [
  { name: "React / Next.js", color: "#61dafb", category: "Frontend", description: "Server-side rendering, static generation, and full-stack React applications." },
  { name: "Node.js", color: "#68a063", category: "Backend", description: "RESTful APIs, GraphQL servers, and real-time applications." },
  { name: "Python", color: "#ffd43b", category: "Backend", description: "FastAPI, Django, data processing, and automation scripts." },
  { name: "Vue / UniApp", color: "#42b883", category: "Frontend", description: "Cross-platform mini programs and progressive web apps." },
  { name: "Firebase / Supabase", color: "#ffca28", category: "Backend", description: "Serverless backends, real-time databases, and authentication." },
  { name: "PostgreSQL", color: "#336791", category: "Database", description: "Relational databases, complex queries, and data modeling." },
  { name: "Docker / Vercel", color: "#2496ed", category: "DevOps", description: "Containerized deployments and serverless hosting." },
  { name: "Claude Code / Codex", color: "#f5a623", category: "AI Tools", description: "AI-powered development for maximum speed and quality." },
] as const;

export const STATS = [
  { num: 2, suffix: "-4w", label: "MVP delivery" },
  { num: 24, suffix: "h", label: "Response time" },
  { num: 10, suffix: "+", label: "Products shipped" },
  { num: 30, suffix: "d", label: "Post-launch support" },
] as const;
