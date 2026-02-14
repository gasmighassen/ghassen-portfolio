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
        zIndex: 5,
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
        {/* Flowing line: starts in left white space, transitions to far right at About section */}
        <motion.path
          d='M 25 0
             C 30 3, 35 5, 38 8
             C 42 12, 35 15, 30 18
             C 22 22, 28 26, 35 30
             C 45 35, 55 38, 65 42
             C 78 47, 88 52, 92 58
             C 95 65, 92 72, 94 78
             C 96 84, 93 90, 95 96
             L 95 100'
          fill='none'
          stroke='rgba(0, 0, 0, 0.6)'
          strokeWidth='0.3'
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
