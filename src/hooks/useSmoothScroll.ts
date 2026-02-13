/**
 * useSmoothScroll Hook
 * Provides smooth scroll progress values for page-wide animations
 */

import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

interface UseSmoothScrollOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

interface SmoothScrollResult {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  smoothScrollY: MotionValue<number>;
  smoothScrollYProgress: MotionValue<number>;
}

export function useSmoothScroll(
  options: UseSmoothScrollOptions = {},
): SmoothScrollResult {
  const { stiffness = 100, damping = 30, mass = 1 } = options;

  const { scrollY, scrollYProgress } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness,
    damping,
    mass,
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness,
    damping,
    mass,
  });

  return {
    scrollY,
    scrollYProgress,
    smoothScrollY,
    smoothScrollYProgress,
  };
}

// Helper hook for creating scroll-linked values
export function useScrollValue<T>(
  inputRange: number[],
  outputRange: T[],
  options?: UseSmoothScrollOptions,
) {
  const { smoothScrollYProgress } = useSmoothScroll(options);
  return useTransform(
    smoothScrollYProgress,
    inputRange,
    outputRange as number[],
  );
}
