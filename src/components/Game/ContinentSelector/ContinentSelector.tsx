'use client';

import styles from './ContinentSelector.module.css';

type ContinentSelectorProps = {
  continents: string[];
  selectedContinent: string;
  onSelect: (continent: string) => void;
};

export default function ContinentSelector({
  continents,
  selectedContinent,
  onSelect,
}: ContinentSelectorProps) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${selectedContinent === 'All' ? styles.active : ''}`}
        onClick={() => onSelect('All')}
      >
        All
      </button>

      {continents.map((continent) => (
        <button
          key={continent}
          className={`${styles.button} ${selectedContinent === continent ? styles.active : ''}`}
          onClick={() => onSelect(continent)}
        >
          {continent}
        </button>
      ))}
    </div>
  );
}
