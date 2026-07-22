import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - Omofit Pink Theme
        background: {
          primary: '#121212',
          secondary: '#1E1E1E',
          card: '#1E1E1E',
        },
        accent: {
          DEFAULT: '#E12E6D',
          hover: '#F472B6',
          light: '#F9A8D4',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
        },
        warning: '#F59E0B',
        error: '#EF4444',
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#6B6B6B',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.2)',
        },
        surface: '#2A2A2A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        button: '12px',
        input: '8px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.3)',
        glow: '0 0 20px rgba(225, 46, 109, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(225, 46, 109, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(225, 46, 109, 0.5)' },
        },
      },
      borderRadius: {
        card: '20px',
        button: '12px',
        input: '8px',
        nav: '28px',
      },
    },
  },
  plugins: [],
};

export default config;
