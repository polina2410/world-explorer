'use client';

import styles from './ContinentSelector.module.css';
import Button from '@/components/Button/Button';

type ContinentSelectorProps = {
  continents: string[];
  selectedContinent: string;
  onSelectAction: (continent: string) => void;
};

export default function ContinentSelector({
  continents,
  selectedContinent,
  onSelectAction,
}: ContinentSelectorProps) {
  return (
    <div className={styles.container}>
      <Button
        active={selectedContinent === 'All'}
        onClick={() => onSelectAction('All')}
      >
        All
      </Button>

      {continents.map((continent) => (
        <Button
          key={continent}
          active={selectedContinent === continent}
          onClick={() => onSelectAction(continent)}
        >
          {continent}
        </Button>
      ))}
    </div>
  );
}
