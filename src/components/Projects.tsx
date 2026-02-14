/**
 * Projects Section
 * Stacked sticky cards - each scrolls over the previous one
 */

import { motion, useScroll, useMotionValue, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Project images
import worldsoftImg from '@/assets/worldsoft/image-2026-02-10-14.15.02.jpeg';
import linxImg from '@/assets/linx/linx-screenshot.png';
import hztechImg from '@/assets/hztech/hztech-screenshot.png';

// Project data based on CV - uses translation keys for i18n
const projects = [
  {
    id: 1,
    key: 'worldsoft',
    title: 'WorldSoft Group',
    tags: ['Angular', 'React Native', 'Node.js', 'GDS'],
    color: '#6b6b6b',
    image: worldsoftImg,
    url: null,
  },
  {
    id: 2,
    key: 'linxexpress',
    title: 'Linxexpress',
    tags: ['React Native', 'React', 'PostgreSQL', 'WebSocket'],
    color: '#9a9a9a',
    image: linxImg,
    url: 'https://linxexpress.tn',
  },
  {
    id: 3,
    key: 'hztech',
    title: 'HZ Tech',
    tags: ['React Native', 'Redux', 'Google Maps', 'Stripe'],
    color: '#4a4a4a',
    image: hztechImg,
    url: 'https://hezlidz.com',
  },
  {
    id: 4,
    key: 'erathis',
    title: 'Erathis',
    tags: ['React 18', 'TypeScript', 'Design Systems'],
    color: '#7a7a7a',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    url: null,
  },
];

// Animated Counter Component - Only visible within projects section
function AnimatedCounter({
  currentIndex,
  total,
  t,
}: {
  currentIndex: number;
  total: number;
  t: (key: string) => string;
}) {
  const displayNumber = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState('01');

  useEffect(() => {
    const controls = animate(displayNumber, currentIndex + 1, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(String(Math.round(latest)).padStart(2, '0'));
      },
    });
    return controls.stop;
  }, [currentIndex, displayNumber]);

  return (
    <motion.div
      className='project-counter'
      style={{
        position: 'sticky',
        top: '12%',
        left: '5%',
        zIndex: 100,
        pointerEvents: 'none',
        height: 0,
        overflow: 'visible',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          border: '1px solid rgba(0,0,0,0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <span
          style={{
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-neutral)',
          }}
        >
          {t('projects.counter').toUpperCase()}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <motion.span
            key={displayValue}
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--color-light)',
            }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayValue}
          </motion.span>
          <span style={{ color: 'var(--color-neutral)', fontSize: '0.9rem' }}>
            |
          </span>
          <span style={{ fontSize: '1.1rem', color: 'var(--color-neutral)' }}>
            {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Individual Project Card - Clean minimal design
function ProjectCard({
  project,
  index,
  t,
}: {
  project: (typeof projects)[0];
  index: number;
  t: (key: string) => string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate stacking offset - cards stop below navbar
  const topOffset = 60; // px below top to stay under navbar

  return (
    <div
      className='project-card-wrapper'
      style={{
        height: '100vh',
        position: 'sticky',
        top: topOffset,
        zIndex: index + 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '90%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0',
      }}
    >
      <motion.div
        ref={cardRef}
        className='project-card'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          height: `calc(100vh - ${topOffset}px - 1rem)`,
          width: '100%',
          overflow: 'hidden',
          borderRadius: '20px',
          background: '#f8f8f8',
          border: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left: Content Section */}
        <div
          className='project-content'
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Category */}
          <motion.span
            style={{
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#666',
              marginBottom: '1rem',
            }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t(`projects.${project.key}.category`)}
          </motion.span>

          {/* Title */}
          <motion.h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              color: '#0a0a0a',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {project.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            style={{
              fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
              color: '#555',
              lineHeight: 1.75,
              maxWidth: '500px',
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {t(`projects.${project.key}.description`)}
          </motion.p>
        </div>

        {/* Right: Image + Tags + CTA Section */}
        <div
          className='project-right-section'
          style={{
            flex: '0 0 45%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image - Fixed height */}
          <motion.div
            className='project-image-section'
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ececec',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Tags + CTA under image - Fixed height */}
          <motion.div
            className='project-footer'
            style={{
              flex: '0 0 auto',
              padding: 'clamp(1rem, 2vw, 1.25rem)',
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                flex: '1 1 auto',
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 'clamp(0.6rem, 0.9vw, 0.7rem)',
                    color: '#666',
                    padding: '0.35rem 0.7rem',
                    background: 'rgba(0,0,0,0.06)',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            {project.url && (
              <motion.a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='project-cta'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.25rem',
                  background: '#0a0a0a',
                  color: '#fff',
                  borderRadius: '100px',
                  fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  flex: '0 0 auto',
                }}
                whileHover={{ scale: 1.03, gap: '0.75rem' }}
                whileTap={{ scale: 0.98 }}
              >
                {t('projects.visitSite')}
                <span>→</span>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Decorative number */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(1rem, 3vw, 2rem)',
            right: 'clamp(1.5rem, 4vw, 3rem)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 200,
            color: 'rgba(0,0,0,0.04)',
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .project-card {
            flex-direction: column !important;
            background: #f8f8f8 !important;
          }
          .project-content {
            flex: none !important;
            padding: 1.5rem !important;
            padding-bottom: 1rem !important;
          }
          .project-right-section {
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .project-image-section {
            flex: 1 !important;
            min-height: 200px !important;
          }
          .project-footer {
            padding: 1rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Update active index based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1,
      );
      setActiveIndex(newIndex);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id='projects'
      style={{
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Fixed counter */}
      <AnimatedCounter
        currentIndex={activeIndex}
        total={projects.length}
        t={t}
      />

      {/* Stacked sticky cards */}
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} t={t} />
      ))}
    </section>
  );
}
