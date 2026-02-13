/**
 * Container Component
 * Responsive container with max-width constraints
 */

import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps extends MotionProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
  style?: React.CSSProperties;
  centered?: boolean;
}

const maxWidths: Record<ContainerSize, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: '100%',
};

export function Container({
  children,
  size = 'lg',
  className,
  style,
  centered = true,
  ...motionProps
}: ContainerProps) {
  const containerStyle: React.CSSProperties = {
    maxWidth: maxWidths[size],
    width: '100%',
    margin: centered ? '0 auto' : undefined,
    padding: '0 1rem',
    ...style,
  };

  return (
    <motion.div className={className} style={containerStyle} {...motionProps}>
      {children}
    </motion.div>
  );
}
