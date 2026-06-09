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
