/**
 * Services Section
 * Microsoft AI-inspired immersive scroll-driven depth animation
 * Images emerge from depth one by one as user scrolls through the section
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

// Original services data
const services = [
  {
    id: 1,
    key: 'devops',
    image:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&h=600&fit=crop',
  },
  {
    id: 2,
    key: 'web',
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=600&fit=crop',
  },
  {
    id: 3,
    key: 'backend',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=600&fit=crop',
  },
  {
    id: 4,
    key: 'mobile',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=600&fit=crop',
  },
  {
    id: 5,
    key: 'maps',
    image:
      'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=500&h=600&fit=crop',
  },
  {
    id: 6,
    key: 'payments',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=600&fit=crop',
  },
];

// Image positions around the central text (closer to center but avoiding middle area)
const imagePositions = [
  { x: '18%', y: '8%', width: 260, height: 320 }, // Top left
  { x: '62%', y: '5%', width: 240, height: 200 }, // Top right
  { x: '16%', y: '55%', width: 240, height: 300 }, // Bottom left
  { x: '60%', y: '52%', width: 250, height: 320 }, // Bottom right
  { x: '22%', y: '28%', width: 220, height: 270 }, // Mid left
  { x: '58%', y: '26%', width: 230, height: 280 }, // Mid right
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
          {/* Floating Images - emerge from depth one by one */}
          {services.map((service, index) => (
            <DepthImage
              key={service.id}
              service={service}
              index={index}
              total={services.length}
              position={imagePositions[index]}
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
 * Individual image that emerges from depth based on scroll position
 */
function DepthImage({
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
  // Each image has its own animation window within the scroll progress
  // They animate sequentially: image 0 starts first, image 5 starts last
  const imageWindow = 0.6 / total; // Each image gets a portion of 60% of scroll (slower)
  const startPoint = 0.08 + index * imageWindow; // Staggered start
  const peakPoint = startPoint + imageWindow * 0.6; // Midpoint - fully visible (longer peak)
  const endPoint = startPoint + imageWindow + 0.2; // End - exits forward (longer exit)

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

  // Slight horizontal drift as image approaches
  const x = useTransform(
    scrollProgress,
    [startPoint, endPoint],
    ['0%', index % 2 === 0 ? '-15%' : '15%'],
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
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'var(--color-dark-mid)',
        }}
      >
        <img
          src={service.image}
          alt={t(`services.${service.key}.title`)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading='lazy'
        />
        {/* Service label overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.5rem',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          }}
        >
          <span
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              color: '#fff',
              letterSpacing: '-0.01em',
            }}
          >
            {t(`services.${service.key}.title`)}
          </span>
        </div>
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
            marginBottom: '2rem',
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
