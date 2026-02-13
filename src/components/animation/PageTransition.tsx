/**
 * PageTransition Component
 * Wrapper for page-level transitions
 */

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from '@/animations/variants';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function PageTransition({
  children,
  className,
  style,
}: PageTransitionProps) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={pageTransition}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
