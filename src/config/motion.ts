/**
 * Motion Configuration
 * Centralized animation presets and variants for Framer Motion
 */

import { Variants, Transition } from 'framer-motion';

// ========================================
// Transition Presets
// ========================================

export const transitions = {
  // Smooth cinematic transitions
  smooth: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1], // ease-out-expo
  } as Transition,

  // Snappy for UI elements
  snappy: {
    duration: 0.4,
    ease: [0.25, 1, 0.5, 1], // ease-out-quart
  } as Transition,

  // Slow reveal for dramatic effect
  slow: {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,

  // Spring physics
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 1,
  } as Transition,

  // Bouncy spring
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
  } as Transition,
} as const;

// ========================================
// Animation Variants
// ========================================

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
};

// Reveal animations (clip-path based)
export const revealUp: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { ...transitions.smooth, duration: 1 },
  },
};

export const revealLeft: Variants = {
  hidden: {
    clipPath: 'inset(0% 100% 0% 0%)',
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { ...transitions.smooth, duration: 1 },
  },
};

// Text reveal (character by character)
export const textReveal: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Hover effects
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: transitions.snappy,
  },
};

export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: transitions.snappy,
  },
};

// Line/underline animation
export const lineReveal: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    transition: transitions.smooth,
  },
};

// Page transitions
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// Loader animation
export const loaderSlide: Variants = {
  initial: { y: 0 },
  exit: {
    y: '-100%',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

// Hero-specific animations
export const heroTitle: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
    rotateX: -20,
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { ...transitions.smooth, duration: 1.2 },
  },
};

export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...transitions.smooth, delay: 0.5 },
  },
};

// Image reveal
export const imageReveal: Variants = {
  hidden: {
    scale: 1.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { ...transitions.slow },
  },
};

// Card hover
export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  },
  hover: {
    y: -10,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    transition: transitions.snappy,
  },
};

// Magnetic effect helper
export const magneticEffect = {
  x: 0,
  y: 0,
  transition: transitions.bouncy,
};

// ========================================
// Scroll-triggered animation configs
// ========================================

export const scrollTriggerConfig = {
  once: true,
  amount: 0.3,
  margin: '-100px 0px',
};

export const scrollTriggerEarly = {
  once: true,
  amount: 0.1,
  margin: '-50px 0px',
};

// ========================================
// Utility functions
// ========================================

export const createStaggerDelay = (index: number, baseDelay = 0.1) => ({
  delay: index * baseDelay,
});

export const createCustomTransition = (
  duration: number,
  delay = 0,
  ease: number[] = [0.16, 1, 0.3, 1],
): Transition => ({
  duration,
  delay,
  ease,
});
