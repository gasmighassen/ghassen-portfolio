/**
 * Services Section
 * Perfectly centered symmetric arc carousel
 */

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

const CARD_WIDTH = 340;
const CARD_HEIGHT = 420;
const CARD_GAP = 60;
const ARC_RADIUS = 1000;
const ARC_HEIGHT = 80; // Max vertical displacement

export function Services() {
  const { t } = useTranslation();
  const x = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(services.length / 2),
  ); // Start from middle
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate center offset to position middle card at center
  const middleIndex = Math.floor(services.length / 2);
  const cardStep = CARD_WIDTH + CARD_GAP;
  const initialOffset = -middleIndex * cardStep; // Start with middle card centered

  useEffect(() => {
    // Initialize to center card
    x.set(initialOffset);
    setActiveIndex(middleIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    // Calculate which card should be centered
    const offset = currentX - initialOffset;
    const cardIndex = middleIndex - Math.round(offset / cardStep);
    const clampedIndex = Math.max(0, Math.min(cardIndex, services.length - 1));
    setActiveIndex(clampedIndex);

    // Snap to card
    const targetX = initialOffset - (clampedIndex - middleIndex) * cardStep;

    animate(x, targetX, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
  };

  const goToCard = (index: number) => {
    setActiveIndex(index);
    const targetX = initialOffset - (index - middleIndex) * cardStep;
    animate(x, targetX, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
  };

  // Calculate total drag bounds
  const maxDrag = (services.length - 1 - middleIndex) * cardStep;
  const minDrag = -middleIndex * cardStep;

  return (
    <section
      id='services'
      style={{
        padding: '8rem 0',
        background: '#1a1d2e',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 3,
      }}
    >
      {/* Section title */}
      <h2
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          color: 'var(--color-light)',
          marginBottom: '4rem',
          letterSpacing: '-0.02em',
        }}
      >
        {t('services.title')}
      </h2>

      {/* Arc line SVG - perfectly centered */}
      <svg
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '400px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox={`0 0 ${windowWidth} 400`}
        preserveAspectRatio='xMidYMid meet'
      >
        <path
          d={`M 0 350 Q ${windowWidth / 2} ${350 - ARC_HEIGHT * 3} ${windowWidth} 350`}
          fill='none'
          stroke='rgba(255,255,255,0.06)'
          strokeWidth='1'
        />
      </svg>

      {/* Carousel container - centered */}
      <div
        ref={constraintsRef}
        style={{
          position: 'relative',
          height: `${CARD_HEIGHT + ARC_HEIGHT + 80}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: `-${CARD_WIDTH / 2}px`,
            display: 'flex',
            gap: `${CARD_GAP}px`,
            x,
          }}
          drag='x'
          dragConstraints={{
            left: initialOffset + minDrag,
            right: initialOffset + maxDrag,
          }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {services.map((service, index) => (
            <ArcCard
              key={service.id}
              service={service}
              index={index}
              dragX={x}
              initialOffset={initialOffset}
              middleIndex={middleIndex}
              isActive={index === activeIndex}
              t={t}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginTop: '2.5rem',
        }}
      >
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            style={{
              width: index === activeIndex ? '28px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background:
                index === activeIndex
                  ? 'var(--color-accent)'
                  : 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}

function ArcCard({
  service,
  index,
  dragX,
  initialOffset,
  middleIndex,
  isActive,
  t,
}: {
  service: (typeof services)[0];
  index: number;
  dragX: ReturnType<typeof useMotionValue<number>>;
  initialOffset: number;
  middleIndex: number;
  isActive: boolean;
  t: (key: string) => string;
}) {
  const cardStep = CARD_WIDTH + CARD_GAP;

  // Calculate distance from center of viewport (where center card should be)
  const y = useTransform(dragX, (latestX: number) => {
    // How far this card is from the center position
    const cardOffset = (index - middleIndex) * cardStep;
    const currentOffset = latestX - initialOffset;
    const distanceFromCenter = cardOffset + currentOffset;

    // Symmetric arc using quadratic curve: y = (x/width)^2 * height
    const normalizedDistance = distanceFromCenter / (ARC_RADIUS * 0.8);
    const arcY = normalizedDistance * normalizedDistance * ARC_HEIGHT;

    return arcY;
  });

  // Rotation - symmetric, cards tilt towards center
  const rotateZ = useTransform(dragX, (latestX: number) => {
    const cardOffset = (index - middleIndex) * cardStep;
    const currentOffset = latestX - initialOffset;
    const distanceFromCenter = cardOffset + currentOffset;

    // Linear rotation based on distance from center
    const maxRotation = 12; // degrees
    const normalizedDistance = distanceFromCenter / (ARC_RADIUS * 0.5);
    return Math.max(
      -maxRotation,
      Math.min(normalizedDistance * maxRotation, maxRotation),
    );
  });

  // Scale - center card is larger
  const scale = useTransform(dragX, (latestX: number) => {
    const cardOffset = (index - middleIndex) * cardStep;
    const currentOffset = latestX - initialOffset;
    const distanceFromCenter = Math.abs(cardOffset + currentOffset);

    const normalizedDistance = Math.min(distanceFromCenter / (cardStep * 2), 1);
    return 1 - normalizedDistance * 0.12;
  });

  // Opacity - fade edges symmetrically
  const opacity = useTransform(dragX, (latestX: number) => {
    const cardOffset = (index - middleIndex) * cardStep;
    const currentOffset = latestX - initialOffset;
    const distanceFromCenter = Math.abs(cardOffset + currentOffset);

    const normalizedDistance = Math.min(
      distanceFromCenter / (cardStep * 2.5),
      1,
    );
    return 1 - normalizedDistance * 0.5;
  });

  return (
    <motion.div
      style={{
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        flexShrink: 0,
        y,
        scale,
        opacity,
        rotateZ,
        transformOrigin: 'center center',
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: isActive
            ? '0 30px 60px rgba(0,0,0,0.5)'
            : '0 15px 30px rgba(0,0,0,0.3)',
          border: isActive
            ? '2px solid rgba(255,255,255,0.15)'
            : '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
        }}
        animate={{
          boxShadow: isActive
            ? '0 30px 60px rgba(0,0,0,0.5)'
            : '0 15px 30px rgba(0,0,0,0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={service.image}
          alt={t(`services.${service.key}.title`)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          draggable={false}
        />
        {/* Text overlay on card */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem 1.5rem',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
          }}
        >
          <h4
            style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              color: '#fff',
              marginBottom: '0.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            {t(`services.${service.key}.title`)}
          </h4>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {t(`services.${service.key}.description`)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
