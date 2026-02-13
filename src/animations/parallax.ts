/**
 * Parallax Animation Utilities
 * Scroll-based parallax effects using Framer Motion
 */

import { MotionValue } from 'framer-motion';

// Parallax speed presets
export const parallaxSpeeds = {
  slow: 0.1,
  medium: 0.3,
  fast: 0.5,
  faster: 0.7,
} as const;

export type ParallaxSpeed = keyof typeof parallaxSpeeds;

// Calculate parallax transform value
export function createParallaxTransform(
  scrollProgress: MotionValue<number>,
  speed: number = 0.3,
  direction: 'up' | 'down' = 'up',
): MotionValue<number> {
  // This is used with useTransform in components
  // The actual implementation happens in the useParallax hook
  return scrollProgress;
}

// Parallax configuration types
export interface ParallaxConfig {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: { start: number; end: number };
  opacity?: { start: number; end: number };
  rotate?: { start: number; end: number };
}

// Default parallax configurations
export const parallaxPresets = {
  hero: {
    speed: 0.5,
    direction: 'up' as const,
    opacity: { start: 1, end: 0 },
  },
  background: {
    speed: 0.2,
    direction: 'up' as const,
  },
  foreground: {
    speed: 0.6,
    direction: 'up' as const,
  },
  floating: {
    speed: 0.4,
    direction: 'down' as const,
    scale: { start: 1, end: 1.1 },
  },
  subtle: {
    speed: 0.1,
    direction: 'up' as const,
  },
  reveal: {
    speed: 0.3,
    opacity: { start: 0, end: 1 },
    scale: { start: 0.9, end: 1 },
  },
} as const;

export type ParallaxPreset = keyof typeof parallaxPresets;
