/**
 * useScrollReveal Hook
 * Trigger animations when elements enter viewport
 */

import { useRef } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

interface ScrollRevealOptions extends Omit<UseInViewOptions, 'root'> {
  threshold?: number;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const { threshold = 0.3, once = true, margin = '-100px 0px' } = options;

  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin,
  });

  return { ref, isInView };
}

/**
 * useScrollProgress Hook
 * Track scroll progress of an element or the page
 */
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ScrollProgressOptions {
  target?: RefObject<HTMLElement>;
  offset?: ['start' | 'end' | 'center', 'start' | 'end' | 'center'][];
  smooth?: boolean;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const {
    target,
    offset = [
      ['start', 'end'],
      ['end', 'start'],
    ],
    smooth = true,
    springConfig = { stiffness: 100, damping: 30, mass: 0.5 },
  } = options;

  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement> | undefined,
    offset: offset as any,
  });

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return {
    progress: smooth ? smoothProgress : scrollYProgress,
    rawProgress: scrollYProgress,
  };
}

/**
 * useParallax Hook
 * Create parallax effects based on scroll
 */
interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inputRange?: [number, number];
  outputRange?: [number, number];
}

export function useParallax(
  scrollProgress: MotionValue<number>,
  options: ParallaxOptions = {},
) {
  const {
    speed = 0.5,
    direction = 'up',
    inputRange = [0, 1],
    outputRange,
  } = options;

  const defaultOutput = (() => {
    const distance = 100 * speed;
    switch (direction) {
      case 'up':
        return [distance, -distance];
      case 'down':
        return [-distance, distance];
      case 'left':
        return [distance, -distance];
      case 'right':
        return [-distance, distance];
    }
  })();

  const output = outputRange || defaultOutput;

  const value = useTransform(scrollProgress, inputRange, output);

  return direction === 'left' || direction === 'right'
    ? { x: value }
    : { y: value };
}
