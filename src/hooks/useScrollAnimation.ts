/**
 * useScrollAnimation Hook
 * Triggers animations when elements enter the viewport
 */

import { useRef, useEffect, useState } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

interface UseScrollAnimationOptions extends Omit<UseInViewOptions, 'root'> {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

interface ScrollAnimationResult {
  ref: React.RefObject<HTMLDivElement>;
  isInView: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {},
): ScrollAnimationResult {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '-50px',
    ...inViewOptions
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isInView = useInView(ref, {
    amount: threshold,
    margin: rootMargin,
    once: triggerOnce,
    ...inViewOptions,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isInView,
    hasAnimated,
  };
}
