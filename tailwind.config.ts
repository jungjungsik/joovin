import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e8ba30",
        "background-light": "#f8f7f6",
        "background-dark": "#211d11",
        "muted-gray": "#1a1a1a", // Darkened from #333333 for better contrast
        "gold-muted": "#8b7734", // Darkened from #97854e for better readability
      },
      fontFamily: {
        display: ["Work Sans", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
