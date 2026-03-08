'use client';

import Alphabet from '@/components/pages/Alphabet/Alphabet';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import CountriesTable from '@/components/pages/CountriesTable/CountriesTable';
import { useState } from 'react';
import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';

export default function CountriesPage() {
  const { countries, loading, error } = useCountries();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredCountries =
    countries?.filter((country) =>
      selectedLetter
        ? country.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true
    ) ?? [];

  const sortedCountries = filteredCountries.sort((a, b) =>
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
          <>
            <MainTitle id="countries-page-title">
              Alphabetical list of countries
            </MainTitle>

            <div
              id="countries-alphabet-filter"
              role="region"
              aria-labelledby="countries-page-title"
            >
              <Alphabet
                onSelectAction={setSelectedLetter}
                aria-label="Filter countries by starting letter"
              />
            </div>

            <div
              id="countries-table-section"
              role="region"
              aria-labelledby="countries-page-title"
            >
              <CountriesTable
                countries={sortedCountries}
                selectedLetter={selectedLetter}
              />
            </div>
          </>
        )}
      </DataLoader>
    </section>
  );
}
