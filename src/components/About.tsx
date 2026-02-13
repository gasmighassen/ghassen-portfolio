/**
 * About Section
 * Clean, minimal design matching the portfolio aesthetic
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';

// Personal photos
import photo1 from '@/assets/photos/IMG_0919-madrid.jpeg';
import photo2 from '@/assets/photos/IMG_0985-toledo.jpeg';
import photo3 from '@/assets/photos/IMG_1201.jpeg';
import photo4 from '@/assets/photos/IMG_1275.jpeg';
import photo5 from '@/assets/photos/IMG_1400.jpeg';

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
      style={{
        padding: '8rem 5%',
        background: 'var(--color-dark)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              fontSize: '0.875rem',
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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginBottom: '5rem',
          }}
        >
          {/* Left column - intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-accent)',
                marginBottom: '1rem',
              }}
            >
              {t('about.whoIAm')}
            </p>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'var(--color-neutral-light)',
              }}
            >
              <Trans
                i18nKey='about.intro'
                components={{
                  1: <strong style={{ color: 'var(--color-light)' }} />,
                  2: <strong style={{ color: 'var(--color-light)' }} />,
                }}
              />
            </p>
          </motion.div>

          {/* Right column - narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'var(--color-neutral-light)',
              }}
            >
              <Trans
                i18nKey='about.experience'
                components={{
                  1: <strong style={{ color: 'var(--color-light)' }} />,
                  2: <strong style={{ color: 'var(--color-light)' }} />,
                }}
              />
            </p>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'var(--color-neutral-light)',
                marginTop: '1.5rem',
              }}
            >
              <Trans
                i18nKey='about.linxStory'
                components={{
                  1: <strong style={{ color: 'var(--color-light)' }} />,
                }}
              />
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
              style={{ textAlign: 'center' }}
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
                  fontSize: '0.85rem',
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
                    fontSize: '0.8rem',
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
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    color: 'var(--color-light)',
                  }}
                >
                  {item.company}
                </h4>
                <span
                  style={{
                    fontSize: '0.9rem',
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
                    fontSize: '0.95rem',
                  }}
                >
                  {t(`about.timeline.${item.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Gallery - Full Width */}
      <div
        style={{ marginTop: '6rem', padding: '0 5%', paddingBottom: '4rem' }}
      >
        <motion.h3
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            color: 'var(--color-accent)',
            marginBottom: '1rem',
            maxWidth: '1200px',
            margin: '0 auto 1rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.beyondCode')}
        </motion.h3>

        <motion.p
          style={{
            fontSize: '1rem',
            color: 'var(--color-neutral)',
            maxWidth: '1200px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('about.beyondDesc')}
        </motion.p>

        <div
          className='photo-gallery'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: 'minmax(200px, auto)',
            gap: '1rem',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* Photo 1 - Large vertical */}
          <motion.div
            style={{
              gridColumn: 'span 4',
              gridRow: 'span 2',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              style={{
                height: '100%',
                minHeight: '450px',
                background: 'var(--color-dark-mid)',
                backgroundImage: `url(${photo1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.5rem 1.5rem',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent)',
                }}
              >
                {t('gallery.travel')}
              </span>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-light)',
                  marginTop: '0.25rem',
                }}
              >
                {t('gallery.madrid')}
              </p>
            </div>
          </motion.div>

          {/* Photo 2 - Horizontal */}
          <motion.div
            style={{
              gridColumn: 'span 5',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              style={{
                aspectRatio: '16/10',
                background: 'var(--color-dark-mid)',
                backgroundImage: `url(${photo2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.5rem 1rem',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent)',
                }}
              >
                {t('gallery.travel')}
              </span>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-light)',
                  marginTop: '0.25rem',
                }}
              >
                {t('gallery.toledo')}
              </p>
            </div>
          </motion.div>

          {/* Photo 3 - Square */}
          <motion.div
            style={{
              gridColumn: 'span 3',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              style={{
                aspectRatio: '1/1',
                background: 'var(--color-dark-mid)',
                backgroundImage: `url(${photo3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1rem 1rem',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              <span
                style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent)',
                }}
              >
                {t('gallery.travel')}
              </span>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-light)',
                  marginTop: '0.25rem',
                }}
              >
                {t('gallery.paris')}
              </p>
            </div>
          </motion.div>

          {/* Photo 4 - Wide */}
          <motion.div
            style={{
              gridColumn: 'span 5',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              style={{
                aspectRatio: '16/9',
                background: 'var(--color-dark-mid)',
                backgroundImage: `url(${photo4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.5rem 1rem',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent)',
                }}
              >
                {t('gallery.travel')}
              </span>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-light)',
                  marginTop: '0.25rem',
                }}
              >
                {t('gallery.paris')}
              </p>
            </div>
          </motion.div>

          {/* Photo 5 - Tall */}
          <motion.div
            style={{
              gridColumn: 'span 3',
              gridRow: 'span 2',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div
              style={{
                height: '100%',
                minHeight: '400px',
                background: 'var(--color-dark-mid)',
                backgroundImage: `url(${photo5})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.5rem 1.5rem',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent)',
                }}
              >
                {t('gallery.travel')}
              </span>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-light)',
                  marginTop: '0.25rem',
                }}
              >
                {t('gallery.paris')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
