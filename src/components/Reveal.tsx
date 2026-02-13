/**
 * Reveal Component
 * Scroll-triggered reveal animations
 */

import { motion, Variants } from 'framer-motion';
import { ReactNode, CSSProperties, forwardRef } from 'react';
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  revealUp,
} from '@/config/motion';

type RevealVariant =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scale'
  | 'reveal';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  threshold?: number;
}

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp: fadeInUp,
  fadeDown: fadeInDown,
  fadeLeft: fadeInLeft,
  fadeRight: fadeInRight,
  scale: scaleIn,
  reveal: revealUp,
};

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  (
    {
      children,
      variant = 'fadeUp',
      delay = 0,
      duration = 0.8,
      className,
      style,
      once = true,
      threshold = 0.3,
    },
    ref,
  ) => {
    const variants = variantMap[variant];

    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        initial='hidden'
        whileInView='visible'
        viewport={{ once, amount: threshold }}
        variants={variants}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  },
);

Reveal.displayName = 'Reveal';
