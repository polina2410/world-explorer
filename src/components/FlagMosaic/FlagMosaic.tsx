'use client';

import { useRef, useState } from 'react';
import { useCountries } from '@/hooks/CountriesProvider';
import Image from 'next/image';
import styles from './FlagMosaic.module.css';
import { useCloseOnAnyClick } from '@/hooks/useCloseOnAnyClick';
import DataLoader from '@/components/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE, SPECIAL_FLAGS } from '@/constants';
import SearchPanel from '@/components/FlagMosaic/SearchPanel/SearchPanel';
import Button from '../Button/Button';
import Dropdown from '@/components/FlagMosaic/Dropdown/Dropdown';
import { getContinents } from '@/utils/getContinents';

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

  const continents = getContinents(countries);

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
    return SPECIAL_FLAGS.includes(countryName)
      ? { transform: 'scale(0.85)' }
      : {};
  };

  return (
    <>
      <div className={styles.controls}>
        <SearchPanel
          value={searchTerm}
          onChangeAction={(value) => {
            setSearchTerm(value);
            setFlipped(null);
          }}
        />

        <Button
          onClick={() => {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
            setFlipped(null);
          }}
        >
          Sort: {sortOrder === 'asc' ? 'A – Z' : 'Z – A'}
        </Button>

        <Dropdown
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
        emptyMessage={EMPTY_COUNTRIES_MESSAGE}
      >
        {() =>
          hasNoResults ? (
            <div className={styles.noResults}>
              {searchTerm
                ? `No countries found matching "${searchTerm}"`
                : 'No countries found. Try adjusting your filters.'}
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
