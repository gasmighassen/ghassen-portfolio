/**
 * Section Component
 * Layout section with consistent spacing and styling
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { colors, spacing } from '@/theme';

type SectionBackground = 'light' | 'dark' | 'accent' | 'transparent';

interface SectionProps {
  children: ReactNode;
  background?: SectionBackground;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  fullHeight?: boolean;
}

const backgroundColors: Record<SectionBackground, string> = {
  light: colors.background.light,
  dark: colors.primary.dark,
  accent: colors.accent.main,
  transparent: 'transparent',
};

const textColors: Record<SectionBackground, string> = {
  light: colors.text.primary,
  dark: colors.text.light,
  accent: colors.text.primary,
  transparent: colors.text.primary,
};

export function Section({
  children,
  background = 'transparent',
  className,
  style,
  id,
  fullHeight = false,
}: SectionProps) {
  const sectionStyle: React.CSSProperties = {
    backgroundColor: backgroundColors[background],
    color: textColors[background],
    padding: `${spacing['4xl']} ${spacing.xl}`,
    minHeight: fullHeight ? '100vh' : undefined,
    display: fullHeight ? 'flex' : undefined,
    flexDirection: fullHeight ? 'column' : undefined,
    justifyContent: fullHeight ? 'center' : undefined,
    ...style,
  };

  return (
    <motion.section id={id} className={className} style={sectionStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {children}
      </div>
    </motion.section>
  );
}
