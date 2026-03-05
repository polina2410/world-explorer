'use client';

import { useRef, useState } from 'react';
import { useCountries } from '@/hooks/CountriesProvider';
import Image from 'next/image';
import styles from './FlagMosaic.module.css';
import { useCloseOnAnyClick } from '@/hooks/useCloseOnAnyClick';
import DataLoader from '@/components/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';

export default function FlagMosaic() {
  const { countries, loading, error } = useCountries();
  const [flipped, setFlipped] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
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

  const continents = Array.from(
    new Set((countries ?? []).flatMap((c) => c.continents))
  ).sort();

  const processedCountries = (countries ?? [])
    .filter((country) =>
      selectedContinent === 'All'
        ? true
        : country.continents.includes(selectedContinent)
    )
    .filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const hasNoResults =
    !loading && processedCountries.length === 0 && (countries ?? []).length > 0;

  const getFlagStyle = (countryName: string) => {
    const specialFlags = ['Nepal', 'Switzerland', 'Vatican City'];
    return specialFlags.includes(countryName)
      ? { transform: 'scale(0.85)' }
      : {};
  };

  return (
    <>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setFlipped(null);
          }}
          className={styles.searchInput}
        />

        <button
          onClick={() => {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
            setFlipped(null);
          }}
        >
          Sort: {sortOrder === 'asc' ? 'A–Z' : 'Z–A'}
        </button>

        <select
          value={selectedContinent}
          onChange={(e) => {
            setSelectedContinent(e.target.value);
            setFlipped(null);
          }}
        >
          <option value="All">All Continents</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>

      <DataLoader
        data={countries}
        loading={loading}
        error={error}
        emptyMessage={EMPTY_COUNTRIES_MESSAGE}
      >
        {() =>
          hasNoResults ? (
            <div className={styles.noResults}>
              No countries found matching "{searchTerm}"
            </div>
          ) : (
            <div ref={containerRef} className={styles.mosaicContainer}>
              {processedCountries.map((country) => {
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
                      className={`${styles.flagInner} ${
                        isFlipped ? styles.flipped : ''
                      }`}
                    >
                      <div className={styles.flagFront}>
                        <div
                          className={`${styles.flagImageWrapper} flex-center`}
                        >
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
          )
        }
      </DataLoader>
    </>
  );
}
