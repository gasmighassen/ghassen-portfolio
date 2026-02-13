/**
 * AnimatedText Component
 * Text with character/word reveal animations
 */

import { motion, Variants } from 'framer-motion';
import { useSplitText } from '@/hooks';
import { CSSProperties, ElementType } from 'react';

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  splitBy?: 'chars' | 'words';
  className?: string;
  style?: CSSProperties;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

const itemVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function AnimatedText({
  text,
  as: Component = 'span',
  splitBy = 'chars',
  className,
  style,
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: AnimatedTextProps) {
  const { elements } = useSplitText(text, splitBy);
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={className}
      style={{
        ...style,
        display: 'inline-flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once, amount: 0.5 }}
      custom={staggerDelay}
      transition={{ delayChildren: delay }}
    >
      {elements.map((element, index) => (
        <span
          key={index}
          style={{ overflow: 'hidden', display: 'inline-block' }}
        >
          <motion.span
            variants={itemVariants}
            style={{
              display: 'inline-block',
              whiteSpace: splitBy === 'words' ? 'pre' : 'normal',
            }}
          >
            {element}
            {splitBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}
