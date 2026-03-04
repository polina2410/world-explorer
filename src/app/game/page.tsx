'use client';

import { useState } from 'react';
import ContinentSelector from '@/components/Game/ContinentSelector/ContinentSelector';
import MainTitle from '@/components/MainTitle/MainTitle';
import { useCountries } from '@/hooks/CountriesProvider';
import Loading from '@/components/Loading/Loading';

export default function GamePage() {
  const { countries, loading, error } = useCountries();
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!countries) return <p>No countries available</p>;

  const continents = Array.from(
    new Set(countries.flatMap((c) => c.continents))
  ).sort();

  // const filteredCountries =
  //   selectedContinent === 'All'
  //     ? countries
  //     : countries.filter((c) => c.continents.includes(selectedContinent));

  // if (loading) return <Loading />;

  return (
    <>
      <MainTitle>Guess The Capital</MainTitle>

      <ContinentSelector
        continents={continents}
        selectedContinent={selectedContinent}
        onSelect={setSelectedContinent}
      />
    </>
  );
}
