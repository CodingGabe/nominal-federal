import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: "#00865a",
        neutral: {
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        background: {
          DEFAULT: "#27272a",
          muted: "#18181b",
          hover: "#ffffff13",
          active: "#ffffff20",
          disabled: "#27272a",
          overlay: "#12121266",
        },
        foreground: {
          DEFAULT: "#d4d4d8",
          muted: "#a1a1aa",
          active: "#ffffff",
          disabled: "#52525b",
          destructive: "#fca5a5",
          positive: "#bbf7d0",
          warning: "#fef08a",
        },
        border: {
          DEFAULT: "#ffffff14",
          muted: "#ffffff0d",
        },
        status: {
          destructive: "#ef4444",
          positive: "#22c55e",
          warning: "#facc15",
        },
        "btn-primary": {
          bg: "#ffffff",
          fg: "#18181b",
          border: "#3f3f46",
          "border-hover": "#71717a",
        },
        "btn-secondary": {
          bg: "#27272a",
          fg: "#f4f4f5",
          border: "#3f3f46",
          "border-hover": "#52525b",
        },
      },
      fontFamily: {
        muoto: ["Muoto", "ui-sans-serif", "system-ui", "sans-serif"],
        "fraktion-mono": [
          "Fraktion Mono",
          "ui-monospace",
          "Menlo",
          "monospace",
        ],
        "jetbrains-mono": [
          "JetBrains Mono",
          "ui-monospace",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        h1: ["82.89px", { lineHeight: "1", letterSpacing: "0em" }],
        h2: ["36px", { lineHeight: "1.2", letterSpacing: "0em" }],
        h3: ["36px", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        h4: ["28px", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "body-nom": ["20px", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        btn: ["16px", { lineHeight: "1.35", letterSpacing: "0em" }],
      },
      spacing: {
        "header-height": "64px",
        "editor-header-height": "48px",
      },
    },
  },
};

export default config;
