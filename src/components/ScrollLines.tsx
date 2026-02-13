import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollLines() {
  const { scrollYProgress } = useScroll();

  const pathLength = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.9],
    [0, 0.35, 0.6, 0.85, 1],
  );

  // Fade out when reaching footer
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.85, 0.95, 1],
    [1, 1, 0.3, 0],
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        opacity: opacity,
      }}
    >
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Single smooth flowing line from right side */}
        <motion.path
          d='M 95 0
             C 90 8, 85 12, 80 18
             C 72 26, 78 35, 70 45
             C 62 55, 72 62, 65 72
             C 58 82, 68 90, 60 100'
          fill='none'
          stroke='rgba(255, 255, 255, 0.4)'
          strokeWidth='0.1'
          strokeLinecap='round'
          strokeLinejoin='round'
          style={{
            pathLength: pathLength,
          }}
        />
      </svg>
    </motion.div>
  );
}
