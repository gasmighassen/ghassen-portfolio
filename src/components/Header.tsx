/**
 * Header Component
 * Desktop nav with burger menu for mobile only
 */

import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/config/motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { key: 'projects', href: '#projects', isRoute: false },
  { key: 'about', href: '/about', isRoute: true },
  { key: 'services', href: '#services', isRoute: false },
  { key: 'contact', href: '#contact', isRoute: false },
];

const languages = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    // If we're not on home page, navigate to home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.5rem 5%',
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Logo - Black on left (first third) */}
        <Link
          to='/'
          className='logo'
          style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            color: '#0a0a0a',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            justifySelf: 'start',
          }}
        >
          GG
        </Link>

        {/* Desktop Navigation - Second half: nav links start at left, lang+hire at right */}
        <nav
          className='desktop-nav'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Nav links - start from left of second half (middle of screen) */}
          <div
            className='nav-links-center'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
          >
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.key}
                  to={link.href}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0a0a0a',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: 0,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ) : (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0a0a0a',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: 0,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {t(`nav.${link.key}`)}
                </button>
              ),
            )}
          </div>

          {/* Right side: Language + Hire Me */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {/* Language Selector */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: i18n.language === lang.code ? '#0a0a0a' : '#999',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Hire Me - Underlined text */}
            <a
              href='#contact'
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              style={{
                color: '#0a0a0a',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {t('nav.hire')}
            </a>
          </div>
        </nav>

        {/* Burger Menu Button - Mobile only */}
        <button
          className='burger-menu'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
          style={{
            display: 'none',
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
              background: isOpen ? '#0a0a0a' : 'rgba(0,0,0,0.3)',
              display: 'block',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
          <motion.span
            style={{
              width: '3px',
              height: isOpen ? '16px' : '24px',
              background: '#0a0a0a',
              display: 'block',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
          <motion.span
            style={{
              width: '3px',
              height: isOpen ? '24px' : '16px',
              background: isOpen ? '#0a0a0a' : 'rgba(0,0,0,0.3)',
              display: 'block',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
        </button>

        {/* Mobile styles */}
        <style>{`
          @media (max-width: 768px) {
            .header {
              display: flex !important;
              justify-content: space-between !important;
            }
            .desktop-nav {
              display: none !important;
            }
            .burger-menu {
              display: flex !important;
            }
          }
        `}</style>
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
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                padding: '1rem 0',
                zIndex: 99,
                minWidth: '180px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              {navLinks.map((link, index) =>
                link.isRoute ? (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className='menu-link'
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#0a0a0a',
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
                    >
                      {t(`nav.${link.key}`)}
                    </Link>
                  </motion.div>
                ) : (
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
                      color: '#0a0a0a',
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
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {t(`nav.${link.key}`)}
                  </motion.button>
                ),
              )}

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  margin: '0.5rem 1.5rem',
                }}
              />

              {/* Hire Me Link */}
              <motion.a
                href='#contact'
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                style={{
                  display: 'block',
                  padding: '0.75rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: '#0a0a0a',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  transition: 'background 0.2s ease',
                }}
                whileHover={{
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }}
              >
                {t('nav.hire')}
              </motion.a>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(0, 0, 0, 0.1)',
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
                          ? 'rgba(0, 0, 0, 0.08)'
                          : 'none',
                      border:
                        i18n.language === lang.code
                          ? '1px solid #0a0a0a'
                          : '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '20px',
                      color: i18n.language === lang.code ? '#0a0a0a' : '#666',
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
