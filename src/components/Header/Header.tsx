'use client';

import styles from './Header.module.css';
import { NavLink } from '@/components/NavLink/NavLink';
import { APP_ROUTES } from '@/routes/appRoutes';
import { useGame } from '@/context/GameContext';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/Header/ThemeToggle/ThemeToggle';

export default function Header() {
  const { resetGame } = useGame();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className="flex-between">
          <NavLink href={APP_ROUTES.home} variant="logo">
            CountriesExplorer
          </NavLink>

          <nav className={styles.nav} aria-label="Main navigation">
            <NavLink href={APP_ROUTES.home}>Home</NavLink>
            <NavLink href={APP_ROUTES.game} onClick={resetGame}>
              Quiz
            </NavLink>
            <NavLink href={APP_ROUTES.countries}>Countries</NavLink>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </nav>
        </div>
      </div>
    </header>
  );
}
