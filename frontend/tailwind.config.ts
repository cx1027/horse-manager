import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Pastel category palette
    "bg-[#FFF4D6]",
    "bg-[#EDE4FF]",
    "bg-[#FFE2E5]",
    "bg-[#D8F4EE]",
    "bg-[#DDF2D6]",
    "bg-[#FFD9D5]",
    "bg-[#DCEBFF]",
    "bg-[#FFE7CC]",
    "text-[#C7870A]",
    "text-[#8A3FFC]",
    "text-[#FF4D6D]",
    "text-[#1A8870]",
    "text-[#41B853]",
    "text-[#FF3D2E]",
    "text-[#2A82EB]",
    "text-[#E6781A]",
    "stroke-[#FFB019]",
    "stroke-[#8A3FFC]",
    "stroke-[#FF4D6D]",
    "stroke-[#1A8870]",
    "stroke-[#41B853]",
    "stroke-[#FF3D2E]",
    "stroke-[#2A82EB]",
    "stroke-[#E6781A]",
    "fill-[#FFF4D6]",
    "fill-[#EDE4FF]",
    "fill-[#FFE2E5]",
    "fill-[#D8F4EE]",
    "fill-[#DDF2D6]",
    "fill-[#FFD9D5]",
    "fill-[#DCEBFF]",
    "fill-[#FFE7CC]",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Primary - Coral Pink
        primary: {
          DEFAULT: "#F05050",
          50: "#FEF2F2",
          100: "#FCE4E4",
          200: "#F9C8C8",
          300: "#F5ABAB",
          400: "#F07070",
          500: "#F05050",
          600: "#E63D3D",
          700: "#CC3030",
          800: "#992424",
          900: "#661818",
          soft: "#F8C0C8",
        },
        // Brand Accent - Coral Red (main CTA accent)
        accent: {
          DEFAULT: "#E12E6D",
          light: "#F472B6",
          soft: "#FADADA",
          muted: "rgba(225, 46, 109, 0.15)",
        },
        // Secondary - Purple (gradient partner with accent)
        secondary: {
          DEFAULT: "#A855F7",
          50: "#F5EFED",
          100: "#EDE4FF",
          200: "#D8B8FF",
          300: "#C084FC",
          400: "#A855F7",
          500: "#9333EA",
          600: "#7E22CE",
          700: "#6B21A8",
        },
        // Backgrounds (Dark theme)
        background: {
          primary: "#0F0F0F",
          secondary: "#1A1A1A",
          card: "#1E1E1E",
          elevated: "#2A2A2A",
          subtle: "#242424",
        },
        // Surfaces
        surface: {
          DEFAULT: "#FFFFFF",
          primary: "#1E1E1E",
          secondary: "#2A2A2A",
          elevated: "#F5F5F5",
        },
        // Text colors
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          muted: "#6B6B6B",
          inverse: "#0F0F0F",
          tertiary: "#4B5563",
        },
        // Border colors
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          subtle: "rgba(255, 255, 255, 0.06)",
          emphasis: "rgba(255, 255, 255, 0.2)",
        },
        // Semantic
        success: {
          DEFAULT: "#10B981",
          soft: "rgba(16, 185, 129, 0.15)",
        },
        warning: {
          DEFAULT: "#F59E0B",
          soft: "rgba(245, 158, 11, 0.15)",
        },
        error: {
          DEFAULT: "#EF4444",
          soft: "rgba(239, 68, 68, 0.15)",
        },
        info: {
          DEFAULT: "#2A82EB",
          soft: "rgba(42, 130, 235, 0.15)",
        },
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "28px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0, 0, 0, 0.08)",
        elevated: "0 4px 20px rgba(0, 0, 0, 0.12)",
        button: "0 2px 8px rgba(225, 46, 109, 0.3)",
        fab: "0 4px 20px rgba(225, 46, 109, 0.4)",
        dropdown: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #E12E6D, #A855F7)",
        "gradient-accent": "linear-gradient(135deg, #E12E6D, #F472B6)",
        "gradient-primary": "linear-gradient(135deg, #F05050, #E63D3D)",
      },
    },
  },
  plugins: [],
};

export default config;
