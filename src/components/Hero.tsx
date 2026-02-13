/**
 * Hero Section
 * Clean, minimal hero with large typography
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 5%',
        overflow: 'hidden',
        background: 'var(--color-dark)',
      }}
    >
      {/* Main hero content */}
      <motion.div
        style={{
          textAlign: 'center',
          y,
          opacity,
          maxWidth: '1200px',
        }}
      >
        {/* Intro text */}
        <motion.p
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--color-neutral)',
            marginBottom: '1rem',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {
            t('hero.intro', {
              defaultValue:
                "I'm Ghassen Gasmi, a fullstack and mobile developer.",
            }).split('<1>')[0]
          }
          <span style={{ color: 'var(--color-light)', fontWeight: 400 }}>
            Ghassen Gasmi
          </span>
          {t('hero.intro', {
            defaultValue:
              "I'm Ghassen Gasmi, a fullstack and mobile developer.",
          }).split('</1>')[1] || ', a fullstack and mobile developer.'}
        </motion.p>

        <motion.p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--color-neutral)',
            marginBottom: '3rem',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('hero.welcome')}
        </motion.p>

        {/* Large styled tagline */}
        <motion.h1
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 12rem)',
            fontWeight: 400,
            fontFamily: "'Yatra One', cursive",
            lineHeight: 0.9,
            margin: 0,
            color: 'var(--color-light)',
            cursor: 'default',
            transition: 'text-shadow 0.3s ease',
            textShadow: isHoveredFirst
              ? '0 0 0 #E1D9BC, 2px 2px 0 #E1D9BC, 4px 4px 0 #E1D9BC, 6px 6px 0 #E1D9BC, 8px 8px 0 #E1D9BC'
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
            fontSize: 'clamp(3.5rem, 12vw, 12rem)',
            fontWeight: 400,
            fontFamily: "'Yatra One', cursive",
            lineHeight: 0.9,
            margin: 0,
            color: 'var(--color-accent)',
            cursor: 'default',
            transition: 'text-shadow 0.3s ease',
            textShadow: isHoveredSecond
              ? '0 0 0 #ACBAC4, 2px 2px 0 #ACBAC4, 4px 4px 0 #ACBAC4, 6px 6px 0 #ACBAC4, 8px 8px 0 #ACBAC4'
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

        {/* Download Resume Button */}
        <motion.a
          href='/Belgacem-ghassen-gasmi-cv-fullstack-js.pdf'
          download='Belgacem-ghassen-gasmi-cv-fullstack-js.pdf'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2.5rem',
            padding: '1rem 2rem',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            color: 'var(--color-light)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
            <polyline points='7 10 12 15 17 10' />
            <line x1='12' y1='15' x2='12' y2='3' />
          </svg>
          {t('hero.downloadResume')}
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          style={{
            width: '1px',
            height: '50px',
            background:
              'linear-gradient(to bottom, var(--color-neutral), transparent)',
          }}
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
