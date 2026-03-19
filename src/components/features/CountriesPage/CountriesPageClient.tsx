'use client';

import { useState } from 'react';
import { useCountries } from '@/context/CountriesContext';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import CountriesContent from '@/components/features/CountriesPage/CountriesContent/CountriesContent';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';

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
          <CountriesContent
            countries={sortedCountries}
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
          />
        )}
      </DataLoader>
    </section>
  );
}
