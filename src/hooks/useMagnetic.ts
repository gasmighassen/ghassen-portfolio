/**
 * useMagnetic Hook
 * Creates magnetic cursor attraction effect on hover
 */

import { useRef, useState, useCallback } from 'react';
import { useSpring, useMotionValue, useTransform } from 'framer-motion';

interface MagneticOptions {
  strength?: number;
  ease?: number;
  damping?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { strength = 0.3, ease = 0.1, damping = 20 } = options;

  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping });
  const springY = useSpring(y, { stiffness: 150, damping });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      x.set(deltaX);
      y.set(deltaY);
    },
    [strength, x, y],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    style: {
      x: springX,
      y: springY,
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    isHovered,
  };
}
