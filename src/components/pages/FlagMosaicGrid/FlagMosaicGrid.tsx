'use client';

import FlagMosaicCard from '@/components/pages/FlagMosaicCard/FlagMosaicCard';
import styles from './FlagMosaicGrid.module.css';
import { Country } from '@/utils/generateQuestions';
import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const grid = containerRef.current;
      const computed = window.getComputedStyle(grid);
      const columnCount = computed.gridTemplateColumns.split(' ').length;

      setColumns(columnCount);
    };

    updateColumns();

    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={styles.mosaicContainer} id="flag-mosaic-container">
      {countries.map((country, index) => {
        const row = Math.floor(index / columns);

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
