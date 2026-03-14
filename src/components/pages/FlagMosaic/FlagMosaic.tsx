'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import { getContinents } from '@/utils/getContinents';
import { FlagMosaicProvider } from '@/context/FlagMosaicContext';
import FlagMosaicGrid from '@/components/pages/FlagMosaicGrid/FlagMosaicGrid';
import FlagMosaicControls from '@/components/pages/FlagMosaicControls/FlagMosaicControls';
import { containerVariants, fadeUpVariants } from '@/animations/animations';

export default function FlagMosaic() {
  const { countries, loading, error } = useCountries();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] =
    useState(false);

  const continents = getContinents(countries);

  const processedCountries = useMemo(() => {
    return [...(countries ?? [])]
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
      <motion.div variants={containerVariants}>
        <motion.div variants={fadeUpVariants}>
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

        <motion.div variants={fadeUpVariants}>
          <DataLoader
            data={countries}
            loading={loading}
            error={error}
            emptyMessage="No countries available"
          >
            {() => (
              <FlagMosaicGrid
                countries={processedCountries}
                hasInitialAnimationPlayed={hasInitialAnimationPlayed}
                setHasInitialAnimationPlayed={setHasInitialAnimationPlayed}
              />
            )}
          </DataLoader>
        </motion.div>
      </motion.div>
    </FlagMosaicProvider>
  );
}
