import styles from './Header.module.css';
import { NavLink } from '../NavLink/NavLink';
import { ROUTES } from '@/styles/routes';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="flex-between">
          <NavLink href={ROUTES.home} variant="logo">
            CountriesQuiz
          </NavLink>

          <nav className={styles.nav}>
            <NavLink href={ROUTES.home}>Home</NavLink>
            <NavLink href={ROUTES.game}>Game</NavLink>
            <NavLink href={ROUTES.countries}>Countries</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
