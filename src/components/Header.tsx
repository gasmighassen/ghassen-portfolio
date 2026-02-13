/**
 * Header Component
 * Fixed navigation with burger menu
 */

import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/config/motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { key: 'projects', href: '#projects' },
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'contact', href: '#contact' },
];

const languages = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <motion.header
        className='header'
        initial='hidden'
        animate='visible'
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.5rem 3%',
          zIndex: 100,
        }}
      >
        <a href='#' className='logo'>
          GG
        </a>

        {/* Burger Menu Button - Vertical bars like indicator */}
        <button
          className='burger-menu'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 110,
          }}
        >
          <motion.span
            style={{
              width: '3px',
              height: isOpen ? '24px' : '16px',
              background: isOpen ? '#fff' : 'rgba(255,255,255,0.3)',
              display: 'block',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
          <motion.span
            style={{
              width: '3px',
              height: isOpen ? '16px' : '24px',
              background: '#fff',
              display: 'block',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
          <motion.span
            style={{
              width: '3px',
              height: isOpen ? '24px' : '16px',
              background: isOpen ? '#fff' : 'rgba(255,255,255,0.3)',
              display: 'block',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
        </button>
      </motion.header>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 98,
              }}
            />
            {/* Dropdown */}
            <motion.div
              className='menu-dropdown'
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: '70px',
                right: '20px',
                background: 'rgba(30, 35, 50, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1rem 0',
                zIndex: 99,
                minWidth: '180px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.key}
                  className='menu-link'
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    transition: 'background 0.2s ease',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {t(`nav.${link.key}`)}
                </motion.button>
              ))}

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  margin: '0.5rem 1.5rem',
                }}
              />

              {/* Download Resume Button */}
              <motion.a
                href='/Belgacem-ghassen-gasmi-cv-fullstack-js.pdf'
                download='Belgacem-ghassen-gasmi-cv-fullstack-js.pdf'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-accent)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                }}
                onClick={() => setIsOpen(false)}
              >
                <svg
                  width='14'
                  height='14'
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
                {t('nav.resume')}
              </motion.a>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  margin: '0.5rem 1.5rem',
                }}
              />

              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: (navLinks.length + 1) * 0.05,
                }}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.4rem 0.75rem',
                      background:
                        i18n.language === lang.code
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'none',
                      border:
                        i18n.language === lang.code
                          ? '1px solid var(--color-accent)'
                          : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      color:
                        i18n.language === lang.code
                          ? 'var(--color-accent)'
                          : 'var(--color-neutral)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
