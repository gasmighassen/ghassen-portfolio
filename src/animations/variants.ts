/**
 * Framer Motion Animation Variants
 * Reusable animation presets for consistent motion design
 */

import { Variants, Transition } from 'framer-motion';

// Default transition settings
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96], // Custom spring-like easing
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94],
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
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
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: -30,
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
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: 30,
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

export const scaleInCenter: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Slide animations
export const slideInFromBottom: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    y: '100%',
    opacity: 0,
  },
};

export const slideInFromTop: Variants = {
  hidden: {
    y: '-100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    y: '-100%',
    opacity: 0,
  },
};

// Reveal animations (for text and elements)
export const revealFromLeft: Variants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

export const revealFromRight: Variants = {
  hidden: {
    clipPath: 'inset(0 0 0 100%)',
  },
  visible: {
    clipPath: 'inset(0 0 0 0%)',
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

export const hoverLift = {
  y: -8,
  boxShadow: '0 20px 25px -5px rgba(48, 54, 79, 0.15)',
  transition: { duration: 0.3 },
};

export const tapScale = {
  scale: 0.95,
};

// Page transitions
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Blur animations
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
    },
  },
};

// Rotate animations
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: springTransition,
  },
};
