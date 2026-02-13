/**
 * HoverCard Component
 * Interactive card with hover animations
 */

import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { hoverLift, hoverScale, tapScale } from '@/animations/variants';
import { colors, borderRadius, shadows } from '@/theme';

type HoverEffect = 'lift' | 'scale' | 'glow' | 'border';

interface HoverCardProps extends MotionProps {
  children: ReactNode;
  effect?: HoverEffect;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const hoverEffects: Record<HoverEffect, object> = {
  lift: hoverLift,
  scale: hoverScale,
  glow: {
    boxShadow: `0 0 30px ${colors.accent.main}40`,
    transition: { duration: 0.3 },
  },
  border: {
    borderColor: colors.accent.main,
    transition: { duration: 0.3 },
  },
};

export function HoverCard({
  children,
  effect = 'lift',
  className,
  style,
  onClick,
  ...motionProps
}: HoverCardProps) {
  const defaultStyle: React.CSSProperties = {
    backgroundColor: colors.background.paper,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    padding: '1.5rem',
    cursor: onClick ? 'pointer' : 'default',
    border: effect === 'border' ? `2px solid transparent` : undefined,
    ...style,
  };

  return (
    <motion.div
      className={className}
      style={defaultStyle}
      whileHover={hoverEffects[effect]}
      whileTap={onClick ? tapScale : undefined}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
