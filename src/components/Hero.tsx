/**
 * Hero Section
 * Clean, minimal hero with large typography
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);

  const isFrench = i18n.language === 'fr';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id='hero'
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        alignItems: 'center',
        padding: '0 5%',
        overflow: 'hidden',
        background: 'var(--color-dark)',
      }}
    >
      {/* Empty left third */}
      <div />

      {/* Main hero content - right half (starts from middle) */}
      <motion.div
        style={{
          textAlign: 'left',
          y,
          opacity,
        }}
      >
        {/* Large styled tagline */}
        <motion.h1
          style={{
            fontSize: isFrench
              ? 'clamp(2rem, 6vw, 6rem)'
              : 'clamp(2.5rem, 8vw, 8rem)',
            fontWeight: 400,
            fontFamily: 'var(--font-heading)',
            lineHeight: 0.9,
            margin: 0,
            color: 'var(--color-light)',
            cursor: 'default',
            transition: 'text-shadow 0.3s ease, font-size 0.3s ease',
            textShadow: isHoveredFirst
              ? '0 0 0 #ccc, 2px 2px 0 #ccc, 4px 4px 0 #ccc, 6px 6px 0 #ccc, 8px 8px 0 #ccc'
              : 'none',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHoveredFirst(true)}
          onMouseLeave={() => setIsHoveredFirst(false)}
        >
          {t('hero.tagline1')}
        </motion.h1>

        <motion.h1
          style={{
            fontSize: isFrench
              ? 'clamp(2rem, 6vw, 6rem)'
              : 'clamp(2.5rem, 8vw, 8rem)',
            fontWeight: 400,
            fontFamily: 'var(--font-heading)',
            lineHeight: 0.9,
            margin: 0,
            marginBottom: '4rem',
            color: 'var(--color-neutral)',
            cursor: 'default',
            transition: 'text-shadow 0.3s ease, font-size 0.3s ease',
            textShadow: isHoveredSecond
              ? '0 0 0 #999, 2px 2px 0 #999, 4px 4px 0 #999, 6px 6px 0 #999, 8px 8px 0 #999'
              : 'none',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHoveredSecond(true)}
          onMouseLeave={() => setIsHoveredSecond(false)}
        >
          {t('hero.tagline2')}
        </motion.h1>

        {/* Intro text - under the taglines */}
        <motion.p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--color-neutral)',
            marginBottom: '0.5rem',
            textAlign: 'left',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('hero.intro')}
        </motion.p>

        <motion.p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--color-neutral)',
            textAlign: 'left',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('hero.welcome')}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '3rem',
          right: '5%',
          zIndex: 50,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          style={{
            width: '4px',
            height: '60px',
            background: '#0a0a0a',
            borderRadius: '2px',
            transformOrigin: 'top',
          }}
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          #hero {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
          }
          #hero > div:first-child {
            display: none !important;
          }
          #hero h1,
          #hero p {
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
