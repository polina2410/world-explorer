import { CONTINENT_COLORS } from '@/constants';
import styles from './ContinentLegend.module.css';

export const ContinentLegend = () => {
  return (
    <div className={styles.legend} aria-label="Continent color legend">
      <p className={styles.title}>Continents</p>
      <ul className={styles.list} role="list">
        {Object.entries(CONTINENT_COLORS).map(([continent, color]) => (
          <li key={continent} className={styles.item}>
            <span
              className={styles.dot}
              style={{ '--dot-color': color } as React.CSSProperties}
              aria-hidden="true"
            />
            <span className={styles.label}>{continent}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
