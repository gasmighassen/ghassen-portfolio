/**
 * Services Section
 * Microsoft AI-inspired immersive scroll-driven depth animation
 * Text cards emerge from depth one by one as user scrolls through the section
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Services data
const services = [
  { id: 1, key: 'devops' },
  { id: 2, key: 'web' },
  { id: 3, key: 'backend' },
  { id: 4, key: 'mobile' },
  { id: 5, key: 'maps' },
  { id: 6, key: 'payments' },
];

// Card positions around the central text (moved down to avoid navbar)
const cardPositions = [
  { x: '12%', y: '18%', width: 280, height: 160 }, // Top left
  { x: '58%', y: '14%', width: 300, height: 150 }, // Top right
  { x: '8%', y: '62%', width: 290, height: 160 }, // Bottom left
  { x: '55%', y: '58%', width: 310, height: 155 }, // Bottom right
  { x: '5%', y: '20%', width: 270, height: 150 }, // Far left top
  { x: '70%', y: '60%', width: 280, height: 160 }, // Far right bottom
];

// Height multiplier for scroll distance (more height = slower animation)
const SCROLL_MULTIPLIER = 6;

export function Services() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress through the tall section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the scroll for cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <section
      id='services'
      ref={sectionRef}
      style={{
        // Tall section creates scroll room for animation
        height: `${100 * SCROLL_MULTIPLIER}vh`,
        position: 'relative',
        background: 'var(--color-dark-deeper)',
      }}
    >
      {/* Sticky viewport - stays in view while user scrolls through the tall section */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 3D Scene Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating Text Cards - emerge from depth one by one */}
          {services.map((service, index) => (
            <DepthCard
              key={service.id}
              service={service}
              index={index}
              total={services.length}
              position={cardPositions[index]}
              scrollProgress={smoothProgress}
              t={t}
            />
          ))}

          {/* Central Text Content */}
          <CentralContent scrollProgress={smoothProgress} t={t} />
        </div>
      </div>
    </section>
  );
}

/**
 * Individual text card that emerges from depth based on scroll position
 */
function DepthCard({
  service,
  index,
  total,
  position,
  scrollProgress,
  t,
}: {
  service: (typeof services)[0];
  index: number;
  total: number;
  position: { x: string; y: string; width: number; height: number };
  scrollProgress: MotionValue<number>;
  t: (key: string) => string;
}) {
  // Each card has its own animation window within the scroll progress
  // They animate sequentially: card 0 starts first, card 5 starts last
  const cardWindow = 0.6 / total; // Each card gets a portion of 60% of scroll (slower)
  const startPoint = 0.08 + index * cardWindow; // Staggered start
  const peakPoint = startPoint + cardWindow * 0.6; // Midpoint - fully visible (longer peak)
  const endPoint = startPoint + cardWindow + 0.2; // End - exits forward (longer exit)

  // Z-axis: starts far in background, comes forward, then passes the viewer
  const z = useTransform(
    scrollProgress,
    [startPoint, peakPoint, endPoint, 1],
    [-1500, 0, 400, 400],
  );

  // Blur: sharp when close, blurry when far (depth of field effect)
  const blur = useTransform(
    scrollProgress,
    [startPoint, startPoint + 0.08, peakPoint, endPoint],
    [20, 4, 0, 0],
  );

  // Scale: small when far, normal at peak, larger when passing by
  const scale = useTransform(
    scrollProgress,
    [startPoint, peakPoint, endPoint],
    [0.3, 1, 1.5],
  );

  // Opacity: fade in, stay visible, fade out as it passes
  const opacity = useTransform(
    scrollProgress,
    [startPoint, startPoint + 0.05, peakPoint, endPoint - 0.05, endPoint],
    [0, 1, 1, 0.8, 0],
  );

  // Rotation for dynamic perspective
  const rotateY = useTransform(
    scrollProgress,
    [startPoint, peakPoint, endPoint],
    [index % 2 === 0 ? -20 : 20, 0, index % 2 === 0 ? 10 : -10],
  );

  const rotateX = useTransform(
    scrollProgress,
    [startPoint, peakPoint, endPoint],
    [15, 0, -8],
  );

  // Horizontal drift - move towards center at peak for readability
  const x = useTransform(
    scrollProgress,
    [startPoint, peakPoint, endPoint],
    ['0%', '25%', '20%'],
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: position.width,
        height: position.height,
        z,
        scale,
        opacity,
        rotateY,
        rotateX,
        x,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <h3
          style={{
            fontSize: '1.125rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            color: 'var(--color-light)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          {t(`services.${service.key}.title`)}
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            color: 'var(--color-neutral-light)',
            lineHeight: 1.6,
          }}
        >
          {t(`services.${service.key}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Central text content (Microsoft AI style)
 */
function CentralContent({
  scrollProgress,
  t,
}: {
  scrollProgress: MotionValue<number>;
  t: (key: string) => string;
}) {
  // Text fades in early and stays visible through most of the animation
  const opacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.85, 0.95],
    [0, 1, 1, 0],
  );

  const y = useTransform(scrollProgress, [0, 0.1, 0.85, 0.95], [40, 0, 0, -30]);

  const scale = useTransform(
    scrollProgress,
    [0, 0.1, 0.85, 0.95],
    [0.96, 1, 1, 0.98],
  );

  return (
    <motion.div
      className='services-central'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        alignItems: 'center',
        padding: '0 5%',
        opacity,
        y,
        scale,
        zIndex: 100,
      }}
    >
      {/* Empty left third for grid alignment */}
      <div className='services-spacer' />

      <div
        className='services-content'
        style={{
          textAlign: 'left',
        }}
      >
        {/* Section Label */}
        <motion.span
          style={{
            display: 'block',
            fontSize: 'clamp(0.7rem, 2vw, 0.875rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '1rem',
          }}
        >
          {t('services.label')}
        </motion.span>

        {/* Main Heading */}
        <motion.h2
          style={{
            fontSize: 'clamp(1.25rem, 5vw, 2.25rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'var(--color-light)',
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
            maxWidth: '100%',
          }}
        >
          {t('services.title')}
        </motion.h2>

        {/* Description */}
        <motion.p
          style={{
            fontSize: 'clamp(0.875rem, 3vw, 1.0625rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--color-neutral-light)',
            marginBottom: '2.5rem',
            maxWidth: '480px',
          }}
        >
          {t('services.description')}
        </motion.p>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .services-central {
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }
          .services-spacer {
            display: none;
          }
          .services-content {
            text-align: center !important;
          }
          .services-content p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
