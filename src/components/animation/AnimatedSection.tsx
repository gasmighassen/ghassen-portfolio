/**
 * AnimatedSection Component
 * Scroll-triggered animated wrapper with multiple animation variants
 */

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import * as animations from '@/animations/variants';

type AnimationVariant =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'scaleInCenter'
  | 'blurIn'
  | 'rotateIn'
  | 'slideInFromBottom'
  | 'slideInFromTop';

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  customVariants?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const variantMap: Record<AnimationVariant, Variants> = {
  fadeIn: animations.fadeIn,
  fadeInUp: animations.fadeInUp,
  fadeInDown: animations.fadeInDown,
  fadeInLeft: animations.fadeInLeft,
  fadeInRight: animations.fadeInRight,
  scaleIn: animations.scaleIn,
  scaleInCenter: animations.scaleInCenter,
  blurIn: animations.blurIn,
  rotateIn: animations.rotateIn,
  slideInFromBottom: animations.slideInFromBottom,
  slideInFromTop: animations.slideInFromTop,
};

export function AnimatedSection({
  children,
  variant = 'fadeInUp',
  customVariants,
  delay = 0,
  duration,
  className,
  style,
  threshold = 0.1,
  triggerOnce = true,
  as = 'div',
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  const selectedVariants = customVariants || variantMap[variant];

  // Apply delay and duration overrides
  const modifiedVariants: Variants = {
    ...selectedVariants,
    visible: {
      ...selectedVariants.visible,
      transition: {
        ...(typeof selectedVariants.visible === 'object' &&
        'transition' in selectedVariants.visible
          ? selectedVariants.visible.transition
          : {}),
        delay,
        ...(duration && { duration }),
      },
    },
  };

  const MotionComponent = motion[
    as as keyof typeof motion
  ] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={modifiedVariants}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}
