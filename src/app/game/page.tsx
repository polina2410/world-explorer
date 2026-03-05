'use client';

import { useState } from 'react';
import ContinentSelector from '@/components/Game/ContinentSelector/ContinentSelector';
import MainTitle from '@/components/MainTitle/MainTitle';
import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';

export default function GamePage() {
  const { countries, loading, error } = useCountries();
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  const continents = Array.from(
    new Set(countries?.flatMap((c) => c.continents) ?? [])
  ).sort();

  // const filteredCountries =
  //   selectedContinent === 'All'
  //     ? countries
  //     : countries.filter((c) => c.continents.includes(selectedContinent));

  return (
    <DataLoader
      data={countries}
      loading={loading}
      error={error}
      emptyMessage={EMPTY_COUNTRIES_MESSAGE}
    >
      {() => (
        <>
          <MainTitle>Guess The Capital</MainTitle>

          <ContinentSelector
            continents={continents}
            selectedContinent={selectedContinent}
            onSelect={setSelectedContinent}
          />
        </>
      )}
    </DataLoader>
  );
}
