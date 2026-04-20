'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useCountries } from '@/context/CountriesContext';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import Alphabet from '@/components/features/CountriesPage/Alphabet/Alphabet';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import CountriesTable from '@/components/features/CountriesPage/CountriesTable/CountriesTable';
import { GlobeView } from '@/components/features/GlobeView/GlobeView';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';
import { fadeUpVariants, pageVariants } from '@/animations';
import styles from './CountriesPageClient.module.css';

type ViewMode = 'list' | 'globe';

export default function CountriesPageClient() {
  const { countries, error } = useCountries();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

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

            <motion.div variants={fadeUpVariants}>
              <div
                className={styles.viewToggle}
                role="group"
                aria-label="Select view mode"
              >
                <button
                  className={[
                    styles.toggleButton,
                    viewMode === 'list' ? styles.toggleButtonActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={viewMode === 'list'}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button
                  className={[
                    styles.toggleButton,
                    viewMode === 'globe' ? styles.toggleButtonActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={viewMode === 'globe'}
                  onClick={() => setViewMode('globe')}
                >
                  Globe
                </button>
              </div>
            </motion.div>

            {viewMode === 'list' && (
              <>
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
              </>
            )}

            {viewMode === 'globe' && (
              <motion.div
                variants={fadeUpVariants}
                key="globe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="countries-globe-section"
                role="region"
                aria-labelledby="countries-page-title"
              >
                <GlobeView countries={countries ?? []} />
              </motion.div>
            )}
          </motion.div>
        )}
      </DataLoader>
    </section>
  );
}
