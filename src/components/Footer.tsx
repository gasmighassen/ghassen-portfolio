/**
 * Footer / Contact Section
 * Matching the clean, minimal design language
 */

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { staggerContainer, fadeInUp } from '@/config/motion';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ghassen-gasmi-gm/' },
  { label: 'GitHub', href: 'https://github.com/gasmighassen' },
  { label: 'Email', href: 'mailto:gasmi.ghassen@gmail.com' },
];

const languages = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
];

export function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer
      id='contact'
      style={{
        background: 'var(--color-dark)',
        padding: '8rem 5% 3rem',
        position: 'relative',
      }}
    >
      <div className='container'>
        {/* Section header - matching About section style */}
        <Reveal variant='fadeUp'>
          <div className='section-header' style={{ marginBottom: '4rem' }}>
            <span className='section-label'>{t('footer.label')}</span>
            <h2>{t('footer.title')}</h2>
          </div>
        </Reveal>

        {/* Main CTA */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <Reveal variant='fadeUp' delay={0.1}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--color-neutral)',
                maxWidth: '500px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
            >
              {t('footer.cta')}
            </p>
          </Reveal>

          <Reveal variant='fadeUp' delay={0.2}>
            <motion.a
              href='mailto:gasmi.ghassen@gmail.com'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                padding: '1rem 2.5rem',
                background: 'var(--color-accent)',
                color: 'var(--color-dark)',
                borderRadius: '100px',
                fontWeight: 600,
                transition: 'all 0.4s var(--ease-out-expo)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t('footer.getInTouch')}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </Reveal>

          <Reveal variant='fadeUp' delay={0.3}>
            <p
              style={{
                marginTop: '1.5rem',
                color: 'var(--color-neutral)',
                fontSize: '0.95rem',
              }}
            >
              gasmi.ghassen@gmail.com
            </p>
          </Reveal>
        </div>

        {/* Social Links */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={
                link.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-neutral)',
                transition: 'color 0.3s ease',
              }}
              variants={fadeInUp}
              whileHover={{ color: 'var(--color-accent)' }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Languages */}
        <Reveal variant='fadeUp' delay={0.4}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  background: 'none',
                  border:
                    i18n.language === lang.code
                      ? '1px solid var(--color-accent)'
                      : '1px solid transparent',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  color:
                    i18n.language === lang.code
                      ? 'var(--color-accent)'
                      : 'var(--color-neutral)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                whileHover={{
                  color: 'var(--color-accent)',
                  borderColor: 'var(--color-accent)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.85rem',
            color: 'var(--color-neutral)',
          }}
        >
          <span>© {new Date().getFullYear()} Ghassen Gasmi</span>
          <span>{t('footer.location')}</span>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-neutral)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            whileHover={{ color: 'var(--color-accent)' }}
          >
            {t('footer.backToTop')}
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
