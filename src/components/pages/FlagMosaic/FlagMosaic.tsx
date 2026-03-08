'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import Button from '@/components/UI/Button/Button';
import Dropdown from '@/components/UI/Dropdown/Dropdown';
import { useCloseOnAnyClick } from '@/hooks/useCloseOnAnyClick';
import styles from './FlagMosaic.module.css';
import SearchPanel from '@/components/pages/SearchPanel/SearchPanel';
import { getContinents } from '@/utils/getContinents';

type FlagMosaicProps = {
  id?: string;
};

export default function FlagMosaic({ id }: FlagMosaicProps) {
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
    timeoutRef.current = setTimeout(() => setFlipped(null), 2500);
  };

  useCloseOnAnyClick({ onCloseAction: closeCard, ignoreRef: containerRef });

  const continents = getContinents(countries);

  const processedCountries = useMemo(() => {
    return (countries ?? [])
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
  }, [countries, selectedContinent, searchTerm, sortOrder]);

  const hasNoResults =
    !loading && processedCountries.length === 0 && (countries ?? []).length > 0;

  return (
    <div id={id ?? 'flag-mosaic'} className={styles.wrapper}>
      <div className={styles.controls} id="flag-mosaic-controls">
        <SearchPanel
          id="flag-mosaic-search"
          value={searchTerm}
          onChangeAction={(value) => {
            setSearchTerm(value);
            setFlipped(null);
          }}
        />

        <Button
          id="flag-mosaic-sort"
          onClick={() => {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
            setFlipped(null);
          }}
        >
          Sort: {sortOrder === 'asc' ? 'A – Z' : 'Z – A'}
        </Button>

        <Dropdown
          id="flag-mosaic-dropdown"
          value={selectedContinent}
          options={['All', ...continents]}
          onChangeAction={(value) => {
            setSelectedContinent(value);
            setFlipped(null);
          }}
        />
      </div>

      <DataLoader
        data={countries}
        loading={loading}
        error={error}
        emptyMessage="No countries available"
      >
        {() =>
          hasNoResults ? (
            <div className={styles.noResults} id="flag-mosaic-no-results">
              {searchTerm
                ? `No countries found matching "${searchTerm}"`
                : 'No countries found. Try adjusting your filters.'}
            </div>
          ) : (
            <div
              ref={containerRef}
              className={styles.mosaicContainer}
              id="flag-mosaic-container"
            >
              {processedCountries.map((country) => {
                const isFlipped = flipped === country.name;
                const isDimmed = flipped && flipped !== country.name;

                return (
                  <div
                    key={country.name}
                    id={`flag-card-${country.name}`}
                    className={`${styles.flagCard} ${
                      isFlipped ? styles.active : ''
                    } ${isDimmed ? styles.dimmed : ''}`}
                    onClick={() => {
                      if (isFlipped) {
                        closeCard();
                      } else {
                        handleClick(country.name);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (isFlipped) {
                          closeCard();
                        } else {
                          handleClick(country.name);
                        }
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isFlipped}
                  >
                    <div
                      className={`${styles.flagInner} ${
                        isFlipped ? styles.flipped : ''
                      }`}
                    >
                      <div
                        className={styles.flagFront}
                        id={`flag-front-${country.name}`}
                      >
                        <div
                          className={`${styles.flagImageWrapper} flex-center`}
                        >
                          <Image
                            id={`flag-image-${country.name}`}
                            src={country.flag}
                            alt={country.name}
                            width={90}
                            height={60}
                            className={styles.flagImage}
                            sizes="90px"
                          />
                        </div>
                      </div>

                      <div
                        className={`${styles.flagBack} flex-center`}
                        id={`flag-back-${country.name}`}
                      >
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
    </div>
  );
}
