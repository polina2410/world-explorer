'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useCountries } from '@/context/CountriesContext';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import Alphabet from '@/components/features/CountriesPage/Alphabet/Alphabet';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import CountriesTable from '@/components/features/CountriesPage/CountriesTable/CountriesTable';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';
import { fadeUpVariants, pageVariants } from '@/animations';

export default function CountriesPageClient() {
  const { countries, loading, error } = useCountries();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredCountries =
    countries?.filter((country) =>
      selectedLetter
        ? country.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true
    ) ?? [];

  const sortedCountries = [...filteredCountries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <section id="countries-page">
      <DataLoader
        data={countries}
        loading={loading}
        error={error}
        emptyMessage={EMPTY_COUNTRIES_MESSAGE}
      >
        {() => (
          <motion.div variants={pageVariants} className="page">
            <motion.div variants={fadeUpVariants}>
              <MainTitle id="countries-page-title">
                Alphabetical list of countries
              </MainTitle>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              id="countries-alphabet-filter"
              role="region"
              aria-labelledby="countries-page-title"
            >
              <Alphabet onSelectAction={setSelectedLetter} />
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              key={selectedLetter ?? 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              id="countries-table-section"
              role="region"
              aria-labelledby="countries-page-title"
            >
              <CountriesTable countries={sortedCountries} selectedLetter={selectedLetter} />
            </motion.div>
          </motion.div>
        )}
      </DataLoader>
    </section>
  );
}
