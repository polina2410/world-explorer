'use client';

import styles from './Header.module.css';
import { NavLink } from '@/components/layout/NavLink/NavLink';
import { APP_ROUTES } from '@/constants/routes';
import { useQuiz } from '@/context/QuizContext';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/layout/Header/ThemeToggle/ThemeToggle';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useToggle } from '@/hooks/useToggle';
import { SCALE, SPRING_INTERACTIVE } from '@/animations';

export default function Header() {
  const { resetGame } = useQuiz();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, toggleMenu, setIsOpen] = useToggle(false);
  const headerRef = useRef<HTMLElement>(null);

  useClickOutside(() => setIsOpen(false), { ref: headerRef, touch: true });

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
          whileTap={{ scale: SCALE.PRESS }}
          whileHover={{ scale: SCALE.HOVER }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={SPRING_INTERACTIVE}
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
            href={APP_ROUTES.quiz}
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
