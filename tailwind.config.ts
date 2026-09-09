import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Classic Modern palette
        cream: "#F9F6F0",
        "cream-dark": "#EFE9DF",
        charcoal: "#2C2C2C",
        navy: "#0F2340",
        "navy-light": "#1A3A6B",
        "navy-muted": "#243D63",
        gold: "#C9923E",
        "gold-light": "#E8B96A",
        "gold-pale": "#F5E6CE",
        muted: "#6B6B6B",
        "border-classic": "#E2DDD5",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  }
} satisfies Config;

