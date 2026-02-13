/**
 * StaggeredContainer Component
 * Animates children with staggered timing
 */

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
} from '@/animations/variants';

type StaggerSpeed = 'slow' | 'normal' | 'fast';

interface StaggeredContainerProps {
  children: ReactNode;
  speed?: StaggerSpeed;
  customStagger?: number;
  delayChildren?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const speedMap: Record<StaggerSpeed, Variants> = {
  slow: staggerContainerSlow,
  normal: staggerContainer,
  fast: staggerContainerFast,
};

export function StaggeredContainer({
  children,
  speed = 'normal',
  customStagger,
  delayChildren,
  className,
  style,
  threshold = 0.1,
  triggerOnce = true,
  as = 'div',
}: StaggeredContainerProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  let variants = speedMap[speed];

  // Apply custom stagger timing if provided
  if (customStagger !== undefined || delayChildren !== undefined) {
    variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: customStagger ?? 0.1,
          delayChildren: delayChildren ?? 0.1,
        },
      },
    };
  }

  const MotionComponent = motion[
    as as keyof typeof motion
  ] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}
