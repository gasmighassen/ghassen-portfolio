/**
 * AnimatedText Component
 * Text reveal animations with character/word splitting
 */

import { ReactNode, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type TextAnimation = 'fadeInUp' | 'fadeIn' | 'slideUp' | 'reveal';
type SplitType = 'characters' | 'words' | 'lines' | 'none';

interface AnimatedTextProps {
  children: string;
  animation?: TextAnimation;
  splitBy?: SplitType;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  triggerOnce?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const characterVariants: Record<TextAnimation, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  },
  slideUp: {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
    },
  },
  reveal: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  },
};

export function AnimatedText({
  children,
  animation = 'fadeInUp',
  splitBy = 'words',
  staggerDelay = 0.03,
  className,
  style,
  threshold = 0.1,
  triggerOnce = true,
  as = 'p',
}: AnimatedTextProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  const splitContent = useMemo(() => {
    if (splitBy === 'none') {
      return [children];
    }
    if (splitBy === 'characters') {
      return children.split('');
    }
    if (splitBy === 'words') {
      return children.split(' ');
    }
    if (splitBy === 'lines') {
      return children.split('\n');
    }
    return [children];
  }, [children, splitBy]);

  const modifiedContainerVariants: Variants = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const MotionComponent = motion[as] as typeof motion.p;

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={modifiedContainerVariants}
      className={className}
      style={{ ...style, display: 'flex', flexWrap: 'wrap' }}
      aria-label={children}
    >
      {splitContent.map((segment, index) => (
        <motion.span
          key={index}
          variants={characterVariants[animation]}
          style={{
            display: 'inline-block',
            whiteSpace: splitBy === 'words' ? 'pre' : 'normal',
          }}
        >
          {segment}
          {splitBy === 'words' && index < splitContent.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
