/**
 * About Section
 * Clean, minimal design matching the portfolio aesthetic
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const stats = [
  { number: '3+', key: 'yearsExp' },
  { number: '10+', key: 'projectsDelivered' },
  { number: '4', key: 'companies' },
];

const timeline = [
  {
    year: '2024 - Present',
    company: 'WorldSoft Group',
    key: 'worldsoft',
  },
  {
    year: '2024',
    company: 'Linxexpress',
    key: 'linxexpress',
  },
  {
    year: '2023 - 2024',
    company: 'HZ Technologie',
    key: 'hztech',
  },
  {
    year: '2022 - 2023',
    company: 'ERATHIS',
    key: 'erathis',
  },
];

export function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id='about'
      className='about-section'
      style={{
        padding: '6rem 5%',
        background: 'var(--color-dark)',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
      }}
    >
      {/* Empty left third for grid alignment */}
      <div className='about-spacer' />

      <div>
        {/* Section header */}
        <motion.div
          style={{ marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-neutral)',
            }}
          >
            {t('about.label')}
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              color: 'var(--color-light)',
              marginTop: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            {t('about.title')}
          </h2>
        </motion.div>

        {/* About content grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          {/* Intro paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.2,
                color: 'var(--color-neutral-light)',
                maxWidth: '500px',
              }}
            >
              {t('about.intro')}
            </p>
          </motion.div>

          {/* Experience paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.2,
                color: 'var(--color-neutral-light)',
                maxWidth: '500px',
              }}
            >
              {t('about.experience')}
            </p>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.2,
                color: 'var(--color-neutral-light)',
                maxWidth: '500px',
                marginTop: '1.5rem',
              }}
            >
              {t('about.linxStory')}
              <span
                style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}
              >
                {' '}
                {t('about.oneVision')}
              </span>
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
            marginBottom: '6rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              style={{ textAlign: 'left' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <span
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 300,
                  color: 'var(--color-accent)',
                  display: 'block',
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-neutral)',
                }}
              >
                {t(`about.${stat.key}`)}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <motion.h3
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              color: 'var(--color-accent)',
              marginBottom: '3rem',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('about.careerPath')}
          </motion.h3>

          {/* Animated timeline line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '0',
              top: '5rem',
              bottom: '0',
              width: '1px',
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                background: 'var(--color-accent)',
                height: lineHeight,
              }}
            />
          </motion.div>

          {/* Timeline items */}
          <div style={{ paddingLeft: '2.5rem' }}>
            {timeline.map((item, index) => (
              <motion.div
                key={item.company}
                style={{
                  marginBottom: '2.5rem',
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Dot */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '0.4rem',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    transform: 'translateX(-50%)',
                  }}
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                />

                <span
                  style={{
                    fontSize: '0.5rem',
                    color: 'var(--color-neutral)',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.year}
                </span>
                <h4
                  style={{
                    marginTop: '0.3rem',
                    marginBottom: '0.2rem',
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    color: 'var(--color-light)',
                  }}
                >
                  {item.company}
                </h4>
                <span
                  style={{
                    fontSize: '1rem',
                    color: 'var(--color-accent)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  {t(`about.timeline.${item.key}.role`)}
                </span>
                <p
                  style={{
                    marginTop: '0.5rem',
                    color: 'var(--color-neutral-light)',
                    lineHeight: 1.7,
                    maxWidth: '600px',
                    fontSize: '1rem',
                  }}
                >
                  {t(`about.timeline.${item.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .about-section {
            display: block !important;
          }
          .about-spacer {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
