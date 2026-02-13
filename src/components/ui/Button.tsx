/**
 * Button Component
 * Animated button with multiple variants
 */

import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { colors, borderRadius, typography } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends MotionProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: colors.primary.dark,
    color: colors.text.light,
    border: 'none',
  },
  secondary: {
    backgroundColor: colors.secondary.neutral,
    color: colors.primary.dark,
    border: 'none',
  },
  accent: {
    backgroundColor: colors.accent.main,
    color: colors.primary.dark,
    border: 'none',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.primary.dark,
    border: `2px solid ${colors.primary.dark}`,
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: '0.5rem 1rem',
    fontSize: typography.fontSize.sm,
  },
  md: {
    padding: '0.75rem 1.5rem',
    fontSize: typography.fontSize.base,
  },
  lg: {
    padding: '1rem 2rem',
    fontSize: typography.fontSize.lg,
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  onClick,
  ...motionProps
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    borderRadius: borderRadius.md,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.sans,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    outline: 'none',
  };

  return (
    <motion.button
      className={className}
      style={baseStyle}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
