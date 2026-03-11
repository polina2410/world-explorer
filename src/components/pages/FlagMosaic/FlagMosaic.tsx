'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import Button from '@/components/UI/Button/Button';
import Dropdown from '@/components/UI/Dropdown/Dropdown';
import { useCloseOnAnyClick } from '@/hooks/useCloseOnAnyClick';
import styles from './FlagMosaic.module.css';
import SearchPanel from '@/components/UI/SearchPanel/SearchPanel';
import { getContinents } from '@/utils/getContinents';
import { basicVariants } from '@/animations/animations';
import { DELAYS_FLAGS } from '@/animations/delays';

const COLUMNS = 8;

type FlagMosaicProps = {
  id?: string;
};

export default function FlagMosaic({ id }: FlagMosaicProps) {
  const { countries, loading, error } = useCountries();
  const [flipped, setFlipped] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] =
    useState(false);
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

  useEffect(() => {
    if (countries && countries.length > 0) {
      const timer = setTimeout(() => {
        setHasInitialAnimationPlayed(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [countries]);

  return (
    <div id={id ?? 'flag-mosaic'} className={styles.flagMosaicPageWrapper}>
      <motion.div
        variants={basicVariants}
        initial="hidden"
        animate="visible"
        custom={DELAYS_FLAGS.FLAG_MOSAIC_CONTROLS}
      >
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
      </motion.div>

      <DataLoader
        data={countries}
        loading={loading}
        error={error}
        emptyMessage="No countries available"
      >
        {() => {
          if (hasNoResults) {
            return (
              <div className={styles.noResults} id="flag-mosaic-no-results">
                {searchTerm
                  ? `No countries found matching "${searchTerm}"`
                  : 'No countries found. Try adjusting your filters.'}
              </div>
            );
          }

          return (
            <div
              ref={containerRef}
              className={styles.mosaicContainer}
              id="flag-mosaic-container"
            >
              {processedCountries.map((country, index) => {
                const isFlipped = flipped === country.name;
                const isDimmed = flipped && flipped !== country.name;
                const row = Math.floor(index / COLUMNS);

                return (
                  <motion.div
                    key={country.name}
                    id={`flag-card-${country.name}`}
                    className={`${styles.flagCard} ${
                      isFlipped ? styles.active : ''
                    } ${isDimmed ? styles.dimmed : ''}`}
                    initial={
                      !hasInitialAnimationPlayed ? { opacity: 0, y: 10 } : false
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      !hasInitialAnimationPlayed
                        ? {
                            duration: 0.3,
                            delay: row * 0.1,
                          }
                        : { duration: 0 }
                    }
                    onAnimationComplete={() => {
                      if (
                        !hasInitialAnimationPlayed &&
                        index === processedCountries.length - 1
                      ) {
                        setHasInitialAnimationPlayed(true);
                      }
                    }}
                    onClick={() =>
                      isFlipped ? closeCard() : handleClick(country.name)
                    }
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
                            width={120}
                            height={80}
                            className={styles.flagImage}
                            sizes="120px"
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
                  </motion.div>
                );
              })}
            </div>
          );
        }}
      </DataLoader>
    </div>
  );
}
