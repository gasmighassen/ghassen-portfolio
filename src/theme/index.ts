/**
 * Theme Configuration
 * Centralized color palette and design tokens
 */

export const colors = {
  // Primary palette - White
  primary: {
    dark: '#ffffff',
    main: '#ffffff',
  },

  // Secondary palette - Gray
  secondary: {
    neutral: '#6b6b6b',
    main: '#6b6b6b',
  },

  // Accent - Black
  accent: {
    main: '#0a0a0a',
    light: '#1a1a1a',
  },

  // Background
  background: {
    light: '#ffffff',
    main: '#ffffff',
    paper: '#f0f0f0',
  },

  // Text colors derived from palette
  text: {
    primary: '#0a0a0a',
    secondary: '#6b6b6b',
    light: '#0a0a0a',
  },
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
} as const;

export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Fira Code', 'SF Mono', Consolas, monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(48, 54, 79, 0.05)',
  md: '0 4px 6px -1px rgba(48, 54, 79, 0.1), 0 2px 4px -1px rgba(48, 54, 79, 0.06)',
  lg: '0 10px 15px -3px rgba(48, 54, 79, 0.1), 0 4px 6px -2px rgba(48, 54, 79, 0.05)',
  xl: '0 20px 25px -5px rgba(48, 54, 79, 0.1), 0 10px 10px -5px rgba(48, 54, 79, 0.04)',
} as const;

export const borderRadius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const;

export const transitions = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
  },
  easing: {
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    spring: [0.43, 0.13, 0.23, 0.96],
  },
} as const;

// Complete theme object
export const theme = {
  colors,
  spacing,
  typography,
  breakpoints,
  shadows,
  borderRadius,
  transitions,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
