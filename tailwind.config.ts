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
        surface: "var(--bg-card)",
        "surface-light": "var(--bg-card-hover)",
        th: {
          bg: "var(--bg-primary)",
          bg2: "var(--bg-secondary)",
          bg3: "var(--bg-tertiary)",
          footer: "var(--bg-footer)",
          nav: "var(--bg-nav)",
          card: "var(--bg-card)",
          "card-h": "var(--bg-card-hover)",
          input: "var(--bg-input)",
          "bg-s": "var(--bg-subtle)",
          border: "var(--border-subtle)",
          "border-m": "var(--border-medium)",
          "border-s": "var(--border-strong)",
          text: "var(--text-primary)",
          text2: "var(--text-secondary)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
          faint: "var(--text-faint)",
          dim: "var(--text-dim)",
        },
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
