'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import styles from './FlagMosaic.module.css';
import { getContinents } from '@/utils/getContinents';
import { basicVariants } from '@/animations/animations';
import { DELAYS_FLAGS } from '@/animations/delays';
import { FlagMosaicProvider } from '@/context/FlagMosaicContext';
import FlagMosaicGrid from '@/components/pages/FlagMosaicGrid/FlagMosaicGrid';
import FlagMosaicControls from '@/components/pages/FlagMosaicControls/FlagMosaicControls';

export default function FlagMosaic() {
  const { countries, loading, error } = useCountries();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] =
    useState(false);

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
    <FlagMosaicProvider>
      <div className={styles.flagMosaicPageWrapper}>
        <motion.div
          variants={basicVariants}
          initial="hidden"
          animate="visible"
          custom={DELAYS_FLAGS.FLAG_MOSAIC_CONTROLS}
        >
          <FlagMosaicControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedContinent={selectedContinent}
            setSelectedContinent={setSelectedContinent}
            continents={continents}
          />
        </motion.div>

        <DataLoader
          data={countries}
          loading={loading}
          error={error}
          emptyMessage="No countries available"
        >
          {() => {
            return (
              <FlagMosaicGrid
                countries={processedCountries}
                hasInitialAnimationPlayed={hasInitialAnimationPlayed}
                setHasInitialAnimationPlayed={setHasInitialAnimationPlayed}
              />
            );
          }}
        </DataLoader>
      </div>
    </FlagMosaicProvider>
  );
}
