'use client';

import styles from './Header.module.css';
import { NavLink } from '@/components/NavLink/NavLink';
import { APP_ROUTES } from '@/routes/appRoutes';
import { useGame } from '@/context/GameContext';

export default function Header() {
  const { resetGame } = useGame();

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
          </nav>
        </div>
      </div>
    </header>
  );
}
