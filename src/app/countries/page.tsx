'use client';

import Alphabet from '@/components/Countries/Alphabet/Alphabet';
import MainTitle from '@/components/MainTitle/MainTitle';
import CountriesTable from '@/components/Countries/CountriesTable/CountriesTable';
import { useState } from 'react';
import Loading from '@/components/Loading/Loading';
import { useCountries } from '@/hooks/CountriesProvider';

export default function CountriesPage() {
  const { countries, loading, error } = useCountries();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!countries) return <p>No countries available</p>;

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
