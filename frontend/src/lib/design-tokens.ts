/**
 * Design tokens extracted from Figma "The Designer Brand Kit"
 * Used by Tailwind config and component CSS variables
 */

export const colors = {
  // Brand Primary - Coral Pink
  primary: {
    DEFAULT: '#F05050',
    50: '#FEF2F2',
    100: '#FCE4E4',
    200: '#F9C8C8',
    300: '#F5ABAB',
    400: '#F07070',
    500: '#F05050',
    600: '#E63D3D',
    700: '#CC3030',
    800: '#992424',
    900: '#661818',
    soft: '#F8C0C8',
  },

  // Brand Accent - Coral Red (main CTA accent)
  accent: {
    DEFAULT: '#E12E6D',
    light: '#F472B6',
    soft: '#FADADA',
    muted: 'rgba(225, 46, 109, 0.15)',
  },

  // Secondary - Purple (used in gradients with accent)
  secondary: {
    DEFAULT: '#A855F7',
    50: '#F5EFED',
    100: '#EDE4FF',
    200: '#D8B8FF',
    300: '#C084FC',
    400: '#A855F7',
    500: '#9333EA',
    600: '#7E22CE',
    700: '#6B21A8',
  },

  // Backgrounds (Dark theme)
  background: {
    primary: '#0F0F0F',
    secondary: '#1A1A1A',
    card: '#1E1E1E',
    elevated: '#2A2A2A',
    subtle: '#242424',
  },

  // Surfaces
  surface: {
    DEFAULT: '#FFFFFF',
    primary: '#1E1E1E',
    secondary: '#2A2A2A',
    elevated: '#F5F5F5',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0A0',
    muted: '#6B6B6B',
    inverse: '#0F0F0F',
    tertiary: '#4B5563',
  },

  // Borders
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.1)',
    subtle: 'rgba(255, 255, 255, 0.06)',
    emphasis: 'rgba(255, 255, 255, 0.2)',
  },

  // Semantic colors
  success: {
    DEFAULT: '#10B981',
    soft: 'rgba(16, 185, 129, 0.15)',
  },
  warning: {
    DEFAULT: '#F59E0B',
    soft: 'rgba(245, 158, 11, 0.15)',
  },
  error: {
    DEFAULT: '#EF4444',
    soft: 'rgba(239, 68, 68, 0.15)',
  },
  info: {
    DEFAULT: '#2A82EB',
    soft: 'rgba(42, 130, 235, 0.15)',
  },
};

export const radii = {
  sm: '8px',
  DEFAULT: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '28px',
  '3xl': '32px',
  full: '9999px',
};

export const shadows = {
  card: '0 2px 12px rgba(0, 0, 0, 0.08)',
  elevated: '0 4px 20px rgba(0, 0, 0, 0.12)',
  button: '0 2px 8px rgba(225, 46, 109, 0.3)',
  fab: '0 4px 20px rgba(225, 46, 109, 0.4)',
  dropdown: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

export const theme = {
  colors,
  radii,
  shadows,
};

export default theme;
