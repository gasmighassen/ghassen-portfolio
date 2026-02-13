/**
 * ScrollProgress Component
 * Visual progress indicator for scroll position
 */

import { motion, useScroll, useSpring } from 'framer-motion';
import { colors } from '@/theme';

interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export function ScrollProgress({
  position = 'top',
  height = 4,
  color = colors.accent.main,
  backgroundColor = 'transparent',
  className,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={className}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        [position]: 0,
        height,
        backgroundColor,
        zIndex: 9999,
        transformOrigin: '0%',
        scaleX,
        background: color,
      }}
    />
  );
}
