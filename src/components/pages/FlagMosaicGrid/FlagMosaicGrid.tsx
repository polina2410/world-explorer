'use client';

import FlagMosaicCard from '@/components/pages/FlagMosaicCard/FlagMosaicCard';
import styles from './FlagMosaicGrid.module.css';
import { Country } from '@/utils/generateQuestions';

const COLUMNS = 8;

type Props = {
  countries: Country[];
  hasInitialAnimationPlayed: boolean;
  setHasInitialAnimationPlayed: (v: boolean) => void;
};

export default function FlagMosaicGrid({
  countries,
  hasInitialAnimationPlayed,
  setHasInitialAnimationPlayed,
}: Props) {
  return (
    <div className={styles.mosaicContainer} id="flag-mosaic-container">
      {countries.map((country, index) => {
        const row = Math.floor(index / COLUMNS);

        return (
          <FlagMosaicCard
            key={country.name}
            country={country}
            row={row}
            index={index}
            totalCountries={countries.length}
            hasInitialAnimationPlayed={hasInitialAnimationPlayed}
            setHasInitialAnimationPlayed={setHasInitialAnimationPlayed}
          />
        );
      })}
    </div>
  );
}
