import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A94F",
          dark: "#00843D",
          light: "#00C85E",
        },
        surface: "#FFFFFF",
        background: "#F4F5F7",
        border: "#E5E7EB",
        muted: "#6B7280",
        danger: "#EF4444",
        warning: "#F59E0B",
        info: "#2563EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
