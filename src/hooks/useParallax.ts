/**
 * useParallax Hook
 * Creates scroll-based parallax effects using Framer Motion
 */

import { useRef } from 'react';
import { useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';
import {
  ParallaxConfig,
  parallaxPresets,
  ParallaxPreset,
} from '@/animations/parallax';

interface UseParallaxOptions {
  preset?: ParallaxPreset;
  config?: ParallaxConfig;
  offset?: ['start' | 'center' | 'end', 'start' | 'center' | 'end'];
  smooth?: boolean;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

interface ParallaxValues {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  x: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  rotate: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export function useParallax(options: UseParallaxOptions = {}): ParallaxValues {
  const {
    preset,
    config = {},
    offset = ['start', 'end'],
    smooth = true,
    springConfig = { stiffness: 100, damping: 30, mass: 1 },
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  // Get preset config if provided
  const presetConfig = preset ? parallaxPresets[preset] : {};
  const finalConfig: ParallaxConfig = { ...presetConfig, ...config };

  const {
    speed = 0.3,
    direction = 'up',
    scale: scaleConfig,
    opacity: opacityConfig,
    rotate: rotateConfig,
  } = finalConfig;

  // Track scroll progress for this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${offset[0]} end`, `${offset[1]} start`],
  });

  // Calculate movement range based on speed and direction
  const range = 100 * speed;
  const yRange =
    direction === 'up'
      ? [range, -range]
      : direction === 'down'
        ? [-range, range]
        : [0, 0];
  const xRange =
    direction === 'left'
      ? [range, -range]
      : direction === 'right'
        ? [-range, range]
        : [0, 0];

  // Create transforms
  const rawY = useTransform(scrollYProgress, [0, 1], yRange);
  const rawX = useTransform(scrollYProgress, [0, 1], xRange);
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleConfig ? [scaleConfig.start, scaleConfig.end] : [1, 1],
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    opacityConfig ? [opacityConfig.start, opacityConfig.end] : [1, 1],
  );
  const rawRotate = useTransform(
    scrollYProgress,
    [0, 1],
    rotateConfig ? [rotateConfig.start, rotateConfig.end] : [0, 0],
  );

  // Apply spring smoothing if enabled
  const y = smooth ? useSpring(rawY, springConfig) : rawY;
  const x = smooth ? useSpring(rawX, springConfig) : rawX;
  const scale = smooth ? useSpring(rawScale, springConfig) : rawScale;
  const opacity = smooth ? useSpring(rawOpacity, springConfig) : rawOpacity;
  const rotate = smooth ? useSpring(rawRotate, springConfig) : rawRotate;

  return {
    ref,
    y,
    x,
    scale,
    opacity,
    rotate,
    scrollYProgress,
  };
}
