/**
 * Theme Configuration
 * Centralized design tokens
 */

export const theme = {
  colors: {
    dark: '#30364F',
    darkDeeper: '#1a1d2e',
    darkMid: '#3d4563',
    neutral: '#ACBAC4',
    neutralLight: '#c5cfd6',
    accent: '#E1D9BC',
    light: '#F0F0DB',
  },

  fonts: {
    heading: "'Space Grotesk', -apple-system, sans-serif",
    body: "'Inter', -apple-system, sans-serif",
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  transitions: {
    fast: '0.2s ease',
    normal: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type Theme = typeof theme;
