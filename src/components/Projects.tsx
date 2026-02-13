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

// Project data based on CV
const projects = [
  {
    id: 1,
    title: 'WorldSoft Group',
    subtitle: 'Travel Platform',
    category: 'TRAVEL BOOKING PLATFORM',
    description:
      'B2B/B2C travel booking with GDS integration, e-visa applications, and secure authentication systems.',
    tags: ['Angular', 'React Native', 'Node.js', 'GDS'],
    color: '#E1D9BC',
    image: worldsoftImg,
    url: null,
  },
  {
    id: 2,
    title: 'Linxexpress',
    subtitle: 'Logistics',
    category: 'ON-DEMAND LOGISTICS',
    description:
      'Complete delivery platform built solo — customer apps, driver apps, real-time tracking, VoIP, payment systems.',
    tags: ['React Native', 'React', 'PostgreSQL', 'WebSocket'],
    color: '#ACBAC4',
    image: linxImg,
    url: 'https://linxexpress.tn',
  },
  {
    id: 3,
    title: 'HZ Tech',
    subtitle: 'Mobile Apps',
    category: 'MOBILE APPLICATION',
    description:
      'Customer & driver apps with real-time GPS tracking, Stripe payments, and push notifications.',
    tags: ['React Native', 'Redux', 'Google Maps', 'Stripe'],
    color: '#30364F',
    image: hztechImg,
    url: 'https://hezlidz.com',
  },
  {
    id: 4,
    title: 'Erathis',
    subtitle: 'Enterprise',
    category: 'ENTERPRISE PLATFORM',
    description:
      'Enterprise web application with comprehensive design system and documentation.',
    tags: ['React 18', 'TypeScript', 'Design Systems'],
    color: '#F0F0DB',
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
        left: '4%',
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
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(30, 35, 50, 0.9)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
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
            style={{ fontSize: '1.1rem', fontWeight: 600 }}
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

// Individual Project Card - Now sticky
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
  const topOffset = 80; // px below top to stay under navbar

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
        width: '98%',
        margin: '0 auto',
        padding: '0.5rem 0',
      }}
    >
      <motion.div
        ref={cardRef}
        className='project-card'
        style={{
          position: 'relative',
          height: `calc(100vh - ${topOffset}px - 1rem)`,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1.5rem, 4vw, 4rem) clamp(2rem, 5vw, 6rem)',
          background: 'rgba(20, 25, 40, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          borderRadius: 'clamp(16px, 2vw, 24px)',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background image with blur - positioned on left */}
        <div
          className='project-blur-bg'
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-20%',
            width: '70%',
            height: '150%',
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(80px)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        {/* Dark overlay for readability */}
        <div
          className='project-dark-overlay'
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(30, 35, 50, 0.5) 0%, rgba(30, 35, 50, 0.85) 50%, rgba(30, 35, 50, 0.95) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Gradient overlay from project color */}
        <div
          className='project-gradient-overlay'
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 70% 50%, ${project.color}20 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Top edge highlight */}
        <div
          className='project-top-highlight'
          style={{
            position: 'absolute',
            top: 0,
            left: '24px',
            right: '24px',
            height: '1px',
            background: `linear-gradient(90deg, transparent 0%, ${project.color}60 50%, transparent 100%)`,
            borderRadius: '24px 24px 0 0',
          }}
        />

        {/* Main content */}
        <div
          className='project-content'
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto 1fr',
            alignItems: 'start',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left: Title and description - positioned at bottom */}
          <motion.div
            className='project-title-section'
            style={{
              alignSelf: 'end',
              paddingLeft: 'clamp(1rem, 3vw, 3rem)',
              paddingBottom: 'clamp(2rem, 4vw, 4rem)',
              gridRow: '1 / 3',
            }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                lineHeight: 1.1,
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {project.title}
              <br />
              {project.subtitle}
            </motion.h2>

            <motion.p
              style={{
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.8,
                maxWidth: '450px',
                marginBottom: '1.5rem',
              }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {project.description}
            </motion.p>

            {/* Visit button with parentheses like screenshot */}
            {project.url && (
              <motion.a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-light)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                whileHover={{ opacity: 0.7 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: 200 }}>(</span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {t('projects.visitSite').toUpperCase()}
                  <motion.span
                    animate={{ x: isHovered ? 3 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 200 }}>)</span>
              </motion.a>
            )}
          </motion.div>

          {/* Right top: Category + Tags */}
          <motion.div
            className='project-tags-section'
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingTop: 'clamp(1.5rem, 3vw, 3rem)',
              paddingRight: 'clamp(1rem, 3vw, 3rem)',
            }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category label */}
            <motion.span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '0.75rem',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {project.category}
            </motion.span>

            {/* Separator line */}
            <motion.div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.2)',
                marginBottom: '0.75rem',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Stack tags with dots */}
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {tag}
                  {i < project.tags.length - 1 && (
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right bottom: Project image - positioned at absolute bottom */}
          <motion.div
            className='project-image-container'
            style={{
              position: 'absolute',
              bottom: 'clamp(1.5rem, 3vw, 3rem)',
              right: 'clamp(2rem, 4vw, 5rem)',
              zIndex: 2,
            }}
            initial={{ opacity: 0, x: 50, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              style={{
                position: 'relative',
                width: 'clamp(280px, 35vw, 480px)',
                aspectRatio: '16/10',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}
              />
              {/* Subtle gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
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
