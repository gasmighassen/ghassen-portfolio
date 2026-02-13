/**
 * ParallaxContainer Component
 * Wrapper for scroll-based parallax effects
 */

import { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { ParallaxPreset, ParallaxConfig } from '@/animations/parallax';

interface ParallaxContainerProps {
  children: ReactNode;
  preset?: ParallaxPreset;
  config?: ParallaxConfig;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

export function ParallaxContainer({
  children,
  preset,
  config,
  className,
  style,
  as = 'div',
}: ParallaxContainerProps) {
  const { ref, y, x, scale, opacity, rotate } = useParallax({
    preset,
    config,
  });

  const MotionComponent = motion[
    as as keyof typeof motion
  ] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      style={{
        y,
        x,
        scale,
        opacity,
        rotate,
        ...style,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
