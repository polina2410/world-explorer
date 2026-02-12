'use client';

import Alphabet from '@/components/Alphabet/Alphabet';
import MainTitle from '@/components/MainTitle/MainTitle';
import CountriesTable from '@/components/CountriesTable/CountriesTable';
import { useEffect, useState } from 'react';
import { CountryResponse } from '@/types/country';
import { API_ROUTES } from '@/routes/apiRoutes';
import Loading from '@/components/Loader/Loader';

export default function CountriesPage() {
  const [countries, setCountries] = useState<CountryResponse[] | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_ROUTES.countries)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(console.error);
  }, []);

  if (!countries) {
    return <Loading />;
  }

  const filteredCountries = [...countries]
    .filter((country) =>
      selectedLetter
        ? country.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <MainTitle>Alphabetical list of countries</MainTitle>
      <Alphabet onSelectAction={setSelectedLetter} />
      <CountriesTable
        countries={filteredCountries}
        selectedLetter={selectedLetter}
      />
    </>
  );
}
