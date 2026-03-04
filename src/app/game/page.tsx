'use client';

import { useState, useEffect } from 'react';
import { CountryResponse } from '@/types/country';
import { API_ROUTES } from '@/routes/apiRoutes';
import ContinentSelector from '@/components/Game/ContinentSelector/ContinentSelector';
import MainTitle from '@/components/MainTitle/MainTitle';

export default function GamePage() {
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  useEffect(() => {
    fetch(API_ROUTES.countries)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(console.error);
  }, []);

  const continents = Array.from(
    new Set(countries.flatMap((c) => c.continents))
  ).sort();
  console.log(countries);
  console.log(continents);

  // const filteredCountries =
  //   selectedContinent === 'All'
  //     ? countries
  //     : countries.filter((c) => c.continents.includes(selectedContinent));

  // if (loading) return <Loading />;

  return (
    <>
      <MainTitle>Capital Quiz Game</MainTitle>

      <ContinentSelector
        continents={continents}
        selectedContinent={selectedContinent}
        onSelect={setSelectedContinent}
      />
    </>
  );
}
