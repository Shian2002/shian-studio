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
  },
  {
    id: "wechat-miniprogram",
    title: "WeChat Mini Program: E-Commerce MVP",
    description: "Full demo: from design to working prototype",
    tags: ["UniApp", "WeChat"],
    tagColors: ["#50e3c2", "#4a9eff"],
    youtubeId: "PLACEHOLDER_2",
  },
  {
    id: "this-website",
    title: "This Website Itself: Built with AI",
    description: "Meta-project: the portfolio site as proof of skill",
    tags: ["Next.js", "AI Coding"],
    tagColors: ["#f5a623", "#bd10e0"],
    youtubeId: "PLACEHOLDER_3",
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
