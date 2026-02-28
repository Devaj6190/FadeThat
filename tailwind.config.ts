import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        epilogue: ["Epilogue", "sans-serif"],
        space: ["'Space Mono'", "monospace"],
        poppins: ["Poppins", "sans-serif"],
        instrument: ["'Instrument Serif'", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-up": "fadeUp 0.5s ease forwards",
        dotpulse: "dotpulse 2.5s ease-in-out infinite",
        "progress-bar": "progress-bar 5s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        dotpulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "progress-bar": {
          "0%": { width: "0%" },
          "60%": { width: "70%" },
          "80%": { width: "84%" },
          "100%": { width: "94%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
