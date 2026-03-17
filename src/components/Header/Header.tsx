'use client';

import styles from './Header.module.css';
import { NavLink } from '@/components/NavLink/NavLink';
import { APP_ROUTES } from '@/routes/appRoutes';
import { useGame } from '@/context/GameContext';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/Header/ThemeToggle/ThemeToggle';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useOnClickOutsideMobileMenu } from '@/hooks/useOnClickOutsideMobileMenu';

export default function Header() {
  const { resetGame } = useGame();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useOnClickOutsideMobileMenu(headerRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const handleNavClick = (callback?: () => void) => {
    setIsOpen(false);
    callback?.();
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <div className="container flex-between">
        <NavLink href={APP_ROUTES.home} variant="logo">
          CountriesExplorer
        </NavLink>

        <motion.button
          className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </motion.button>

        <motion.nav
          className={`${styles.nav} ${isOpen ? styles.open : ''}`}
          aria-label="Main navigation"
        >
          <NavLink href={APP_ROUTES.home} onClick={() => handleNavClick()}>
            Home
          </NavLink>

          <NavLink
            href={APP_ROUTES.game}
            onClick={() => handleNavClick(resetGame)}
          >
            Quiz
          </NavLink>

          <NavLink href={APP_ROUTES.countries} onClick={() => handleNavClick()}>
            Countries
          </NavLink>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </motion.nav>
      </div>
    </header>
  );
}
