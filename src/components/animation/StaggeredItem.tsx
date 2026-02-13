/**
 * StaggeredItem Component
 * Child component for StaggeredContainer with individual animation
 */

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  fadeInLeft,
  fadeInRight,
} from '@/animations/variants';

type ItemAnimation =
  | 'fadeInUp'
  | 'fadeIn'
  | 'scaleIn'
  | 'fadeInLeft'
  | 'fadeInRight';

interface StaggeredItemProps {
  children: ReactNode;
  animation?: ItemAnimation;
  customVariants?: Variants;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

const animationMap: Record<ItemAnimation, Variants> = {
  fadeInUp,
  fadeIn,
  scaleIn,
  fadeInLeft,
  fadeInRight,
};

export function StaggeredItem({
  children,
  animation = 'fadeInUp',
  customVariants,
  className,
  style,
  as = 'div',
}: StaggeredItemProps) {
  const variants = customVariants || animationMap[animation];
  const MotionComponent = motion[
    as as keyof typeof motion
  ] as typeof motion.div;

  return (
    <MotionComponent variants={variants} className={className} style={style}>
      {children}
    </MotionComponent>
  );
}
