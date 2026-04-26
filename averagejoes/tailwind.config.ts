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
        black: "#0A0A0A",
        dark: "#111111",
        darker: "#0D0D0D",
        steel: "#1A1A2E",
        blue: {
          DEFAULT: "#4A6FFF",
          light: "#6B8FFF",
        },
        white: "#F5F5F5",
        gray: "#9A9A9A",
        border: "#222222",
        hyrox: "#FFD700",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "scroll-left": "scroll-left 40s linear infinite",
        pulse: "pulse-scale 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
