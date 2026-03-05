'use client';

import { useState, useRef } from 'react';
import { useCountries } from '@/hooks/CountriesProvider';
import Image from 'next/image';
import styles from './FlagMosaic.module.css';
import { useCloseOnAnyClick } from '@/hooks/useCloseOnAnyClick';
import DataLoader from '@/components/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';

export default function FlagMosaic() {
  const { countries, loading, error } = useCountries();
  const [flipped, setFlipped] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeCard = () => {
    setFlipped(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleClick = (name: string) => {
    if (flipped === name) {
      closeCard();
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setFlipped(name);

    timeoutRef.current = setTimeout(() => {
      setFlipped(null);
    }, 2500);
  };

  useCloseOnAnyClick({ onCloseAction: closeCard, ignoreRef: containerRef });

  const getFlagStyle = (countryName: string) => {
    const specialFlags = ['Nepal', 'Switzerland', 'Vatican City'];
    return specialFlags.includes(countryName)
      ? { transform: 'scale(0.85)' }
      : {};
  };

  return (
    <DataLoader
      data={countries}
      loading={loading}
      error={error}
      emptyMessage={EMPTY_COUNTRIES_MESSAGE}
    >
      {() => (
        <div ref={containerRef} className={styles.mosaicContainer}>
          {(countries ?? []).map((country) => {
            const isFlipped = flipped === country.name;
            const isDimmed = flipped && flipped !== country.name;

            return (
              <div
                key={country.name}
                className={`${styles.flagCard} 
                  ${isFlipped ? styles.active : ''} 
                  ${isDimmed ? styles.dimmed : ''}`}
                onClick={() =>
                  isFlipped ? closeCard() : handleClick(country.name)
                }
              >
                <div
                  className={`${styles.flagInner} ${isFlipped ? styles.flipped : ''}`}
                >
                  <div className={styles.flagFront}>
                    <div className={`${styles.flagImageWrapper} flex-center`}>
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={90}
                        height={60}
                        className={styles.flagImage}
                        style={getFlagStyle(country.name)}
                        sizes="90px"
                      />
                    </div>
                  </div>

                  <div className={`${styles.flagBack} flex-center`}>
                    {country.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DataLoader>
  );
}
